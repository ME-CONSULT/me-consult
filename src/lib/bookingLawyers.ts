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

/** True if any of the given lawyers already has a pending/active booking at
 * this exact time — either via the ordinary single-lawyer bookings.lawyer_id
 * column, or via the booking_lawyers join table for multi-consultant
 * sessions. Needed because the existing bookings_lawyer_slot_idx unique
 * index only guards bookings.lawyer_id, not the join table. */
export async function isAnyLawyerBooked(lawyerIds: string[], scheduledAtISO: string): Promise<boolean> {
  const supabase = supabaseAdmin();

  const [singleLawyer, multiLawyer] = await Promise.all([
    supabase
      .from("bookings")
      .select("id")
      .in("lawyer_id", lawyerIds)
      .eq("scheduled_at", scheduledAtISO)
      .in("status", ["pending", "active"])
      .limit(1),
    supabase
      .from("booking_lawyers")
      .select("booking_id, bookings!inner(scheduled_at, status)")
      .in("lawyer_id", lawyerIds)
      .eq("bookings.scheduled_at", scheduledAtISO)
      .in("bookings.status", ["pending", "active"])
      .limit(1),
  ]);

  if (singleLawyer.error) throw singleLawyer.error;
  if (multiLawyer.error) throw multiLawyer.error;

  return (singleLawyer.data?.length ?? 0) > 0 || (multiLawyer.data?.length ?? 0) > 0;
}
