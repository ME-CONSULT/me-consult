import { supabaseAdmin } from "@/lib/supabase/admin";
import { listBookings, type Booking } from "@/lib/bookings";

export type ClientRecord = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  auth_user_id: string | null;
  login_sent_at: string | null;
  first_login_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ClientStatus = "not_sent" | "login_sent" | "active";

export type ClientSummary = ClientRecord & {
  status: ClientStatus;
  bookingsCount: number;
  lastBookingAt: string;
  totalPaidKobo: number;
};

function statusOf(client: Pick<ClientRecord, "login_sent_at" | "first_login_at">): ClientStatus {
  if (client.first_login_at) return "active";
  if (client.login_sent_at) return "login_sent";
  return "not_sent";
}

/** Ensures a `clients` row exists for this email, updating name/phone to the
 * latest values seen. Called at booking-creation time from every
 * booking-creation path so `bookings.client_id` can always be set. */
export async function upsertClientForBooking(
  email: string,
  name: string,
  phone: string | null
): Promise<ClientRecord> {
  const supabase = supabaseAdmin();
  const normalizedEmail = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("clients")
    .upsert(
      { email: normalizedEmail, name, phone, updated_at: new Date().toISOString() },
      { onConflict: "email" }
    )
    .select()
    .single();

  if (error) throw error;
  return data as ClientRecord;
}

export async function getClientById(id: string): Promise<ClientRecord | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).single();
  if (error) return null;
  return data as ClientRecord;
}

export async function getClientByAuthUserId(authUserId: string): Promise<ClientRecord | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();
  if (error) return null;
  return data as ClientRecord;
}

export async function getClientByEmail(email: string): Promise<ClientRecord | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .ilike("email", email)
    .single();
  if (error) return null;
  return data as ClientRecord;
}

export async function updateClient(id: string, fields: Partial<ClientRecord>): Promise<ClientRecord> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("clients")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ClientRecord;
}

export async function listClients(): Promise<ClientSummary[]> {
  const supabase = supabaseAdmin();
  const [{ data: clients, error }, bookings] = await Promise.all([
    supabase.from("clients").select("*"),
    listBookings(),
  ]);
  if (error) throw error;

  const statsByEmail = new Map<
    string,
    { bookingsCount: number; lastBookingAt: string; totalPaidKobo: number }
  >();

  for (const booking of bookings) {
    const key = booking.client_email.toLowerCase();
    const paidKobo = booking.payment_status === "paid" ? booking.amount_kobo ?? 0 : 0;
    const existing = statsByEmail.get(key);

    if (!existing) {
      statsByEmail.set(key, {
        bookingsCount: 1,
        lastBookingAt: booking.created_at,
        totalPaidKobo: paidKobo,
      });
      continue;
    }

    existing.bookingsCount += 1;
    existing.totalPaidKobo += paidKobo;
    if (booking.created_at > existing.lastBookingAt) existing.lastBookingAt = booking.created_at;
  }

  return (clients as ClientRecord[])
    .map((client) => {
      const stats = statsByEmail.get(client.email.toLowerCase());
      return {
        ...client,
        status: statusOf(client),
        bookingsCount: stats?.bookingsCount ?? 0,
        lastBookingAt: stats?.lastBookingAt ?? client.created_at,
        totalPaidKobo: stats?.totalPaidKobo ?? 0,
      };
    })
    .sort((a, b) => (a.lastBookingAt < b.lastBookingAt ? 1 : -1));
}

export async function getClient(email: string): Promise<{
  summary: ClientSummary;
  bookings: Booking[];
} | null> {
  const client = await getClientByEmail(email);
  if (!client) return null;

  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });

  if (error) throw error;
  const bookings = data as Booking[];

  const totalPaidKobo = bookings
    .filter((b) => b.payment_status === "paid")
    .reduce((sum, b) => sum + (b.amount_kobo ?? 0), 0);

  return {
    summary: {
      ...client,
      status: statusOf(client),
      bookingsCount: bookings.length,
      lastBookingAt: bookings[0]?.created_at ?? client.created_at,
      totalPaidKobo,
    },
    bookings,
  };
}
