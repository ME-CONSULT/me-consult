import { supabaseAdmin } from "@/lib/supabase/admin";

export async function addBookingLawyers(bookingId: string, lawyerIds: string[]) {
  if (lawyerIds.length === 0) return;
  const supabase = supabaseAdmin();
  const { error } = await supabase
    .from("booking_lawyers")
    .insert(lawyerIds.map((lawyer_id) => ({ booking_id: bookingId, lawyer_id })));
  if (error) throw error;
}

export async function listLawyerIdsForBooking(bookingId: string): Promise<string[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("booking_lawyers")
    .select("lawyer_id")
    .eq("booking_id", bookingId);
  if (error) throw error;
  return (data ?? []).map((r) => r.lawyer_id as string);
}

// Longest consultation we offer; bounds how far back we look for a booking
// that could still be running at the requested start time.
const MAX_LOOKBACK_MINUTES = 12 * 60;
const DEFAULT_DURATION_MINUTES = 60;

type BookingSpan = { id: string; scheduled_at: string | null; duration_minutes: number | null };

function overlaps(span: BookingSpan, start: number, end: number) {
  if (!span.scheduled_at) return false;
  const s = new Date(span.scheduled_at).getTime();
  const e = s + (span.duration_minutes ?? DEFAULT_DURATION_MINUTES) * 60_000;
  return s < end && start < e;
}

/** True if any of the given lawyers already has a pending/active booking
 * whose time range overlaps [scheduledAt, scheduledAt + duration), either
 * via the ordinary single-lawyer bookings.lawyer_id column or via the
 * booking_lawyers join table for multi-consultant sessions. Pass
 * excludeBookingId when rescheduling so a booking doesn't clash with itself. */
export async function isAnyLawyerBooked(
  lawyerIds: string[],
  scheduledAtISO: string,
  durationMinutes: number,
  excludeBookingId?: string
): Promise<boolean> {
  if (lawyerIds.length === 0) return false;
  const supabase = supabaseAdmin();

  const start = new Date(scheduledAtISO).getTime();
  const end = start + durationMinutes * 60_000;
  const windowStart = new Date(start - MAX_LOOKBACK_MINUTES * 60_000).toISOString();
  const windowEnd = new Date(end).toISOString();

  const [singleLawyer, multiLawyer] = await Promise.all([
    supabase
      .from("bookings")
      .select("id, scheduled_at, duration_minutes")
      .in("lawyer_id", lawyerIds)
      .gte("scheduled_at", windowStart)
      .lt("scheduled_at", windowEnd)
      .in("status", ["pending", "active"]),
    supabase
      .from("booking_lawyers")
      .select("bookings!inner(id, scheduled_at, duration_minutes, status)")
      .in("lawyer_id", lawyerIds)
      .gte("bookings.scheduled_at", windowStart)
      .lt("bookings.scheduled_at", windowEnd)
      .in("bookings.status", ["pending", "active"]),
  ]);

  if (singleLawyer.error) throw singleLawyer.error;
  if (multiLawyer.error) throw multiLawyer.error;

  const spans: BookingSpan[] = [
    ...((singleLawyer.data ?? []) as BookingSpan[]),
    ...(multiLawyer.data ?? []).map((r) => r.bookings as unknown as BookingSpan),
  ];

  return spans.some((b) => b.id !== excludeBookingId && overlaps(b, start, end));
}
