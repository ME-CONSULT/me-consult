import { supabaseAdmin } from "@/lib/supabase/admin";

export type BookingStatus = "pending" | "active" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";

export type Booking = {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  service: string | null;
  notes: string | null;
  intake_answers: Record<string, string>;
  title: string | null;
  meeting_url: string | null;
  client_id: string | null;
  status: BookingStatus;
  scheduled_at: string | null;
  lawyer_id: string | null;
  duration_minutes: number | null;
  fee_kobo: number | null;
  vat_kobo: number | null;
  amount_kobo: number | null;
  payment_status: PaymentStatus;
  paystack_reference: string | null;
  terms_accepted_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type NewBookingInput = {
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  service?: string | null;
  notes?: string | null;
  intake_answers?: Record<string, string> | null;
  title?: string | null;
  meeting_url?: string | null;
  client_id?: string | null;
  scheduled_at?: string | null;
  lawyer_id?: string | null;
  duration_minutes?: number | null;
  fee_kobo?: number | null;
  vat_kobo?: number | null;
  amount_kobo?: number | null;
  terms_accepted_at?: string | null;
  created_by?: string | null;
};

export type BookingUpdateInput = Partial<{
  notes: string | null;
  title: string | null;
  meeting_url: string | null;
  lawyer_id: string | null;
  scheduled_at: string | null;
  status: BookingStatus;
  payment_status: PaymentStatus;
  paystack_reference: string | null;
}>;

export class SlotUnavailableError extends Error {
  constructor() {
    super("That slot is no longer available. Please choose another.");
    this.name = "SlotUnavailableError";
  }
}

export async function listBookings(status?: BookingStatus) {
  const supabase = supabaseAdmin();
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
  if (status) query = query.eq("status", status);

  const { data, error } = await query;
  if (error) throw error;
  return data as Booking[];
}

export async function listBookingsByClientId(clientId: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("client_id", clientId)
    .order("scheduled_at", { ascending: false });

  if (error) throw error;
  return data as Booking[];
}

export async function getBooking(id: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("bookings").select("*").eq("id", id).single();
  if (error) return null;
  return data as Booking;
}

export async function createBooking(input: NewBookingInput) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      client_name: input.client_name,
      client_email: input.client_email,
      client_phone: input.client_phone ?? null,
      service: input.service ?? null,
      notes: input.notes ?? null,
      intake_answers: input.intake_answers ?? {},
      title: input.title ?? null,
      meeting_url: input.meeting_url ?? null,
      client_id: input.client_id ?? null,
      scheduled_at: input.scheduled_at ?? null,
      lawyer_id: input.lawyer_id ?? null,
      duration_minutes: input.duration_minutes ?? null,
      fee_kobo: input.fee_kobo ?? null,
      vat_kobo: input.vat_kobo ?? null,
      amount_kobo: input.amount_kobo ?? null,
      terms_accepted_at: input.terms_accepted_at ?? null,
      created_by: input.created_by ?? null,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") throw new SlotUnavailableError();
    throw error;
  }
  return data as Booking;
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Booking;
}

export async function updateBooking(id: string, fields: BookingUpdateInput) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    if (error.code === "23505") throw new SlotUnavailableError();
    throw error;
  }
  return data as Booking;
}

export async function deleteBooking(id: string) {
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw error;
}

export async function listPayments() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .not("amount_kobo", "is", null)
    .order("updated_at", { ascending: false });

  if (error) throw error;
  return data as Booking[];
}

export async function searchBookings(q: string, limit = 8) {
  const supabase = supabaseAdmin();
  // Strip characters that carry meaning in a PostgREST filter string so the
  // search text can't add or alter filter clauses.
  const safe = q.replace(/[,()*%\\"]/g, " ").trim();
  if (!safe) return [];
  const pattern = `%${safe}%`;
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .or(
      `client_name.ilike.${pattern},client_email.ilike.${pattern},service.ilike.${pattern},notes.ilike.${pattern},title.ilike.${pattern}`
    )
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as Booking[];
}

export async function getBookingByReference(reference: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("paystack_reference", reference)
    .single();

  if (error) return null;
  return data as Booking;
}

export async function listBookingsBetween(startISO: string, endISO: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .gte("scheduled_at", startISO)
    .lt("scheduled_at", endISO)
    .order("scheduled_at", { ascending: true });

  if (error) throw error;
  return data as Booking[];
}

export async function isSlotTaken(lawyerId: string, scheduledAt: string) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("id")
    .eq("lawyer_id", lawyerId)
    .eq("scheduled_at", scheduledAt)
    .in("status", ["pending", "active"])
    .limit(1);

  if (error) throw error;
  return (data?.length ?? 0) > 0;
}
