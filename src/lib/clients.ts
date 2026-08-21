import { supabaseAdmin } from "@/lib/supabase/admin";
import { listBookings, type Booking } from "@/lib/bookings";

export type ClientSummary = {
  email: string;
  name: string;
  phone: string | null;
  bookingsCount: number;
  lastBookingAt: string;
  totalPaidKobo: number;
};

export async function listClients(): Promise<ClientSummary[]> {
  const bookings = await listBookings();
  const byEmail = new Map<string, ClientSummary>();

  for (const booking of bookings) {
    const key = booking.client_email.toLowerCase();
    const paidKobo = booking.payment_status === "paid" ? booking.amount_kobo ?? 0 : 0;
    const existing = byEmail.get(key);

    if (!existing) {
      byEmail.set(key, {
        email: booking.client_email,
        name: booking.client_name,
        phone: booking.client_phone,
        bookingsCount: 1,
        lastBookingAt: booking.created_at,
        totalPaidKobo: paidKobo,
      });
      continue;
    }

    existing.bookingsCount += 1;
    existing.totalPaidKobo += paidKobo;
    if (booking.created_at > existing.lastBookingAt) {
      existing.lastBookingAt = booking.created_at;
      existing.name = booking.client_name;
      existing.phone = booking.client_phone;
    }
  }

  return Array.from(byEmail.values()).sort((a, b) =>
    a.lastBookingAt < b.lastBookingAt ? 1 : -1
  );
}

export async function getClient(email: string): Promise<{
  summary: ClientSummary;
  bookings: Booking[];
} | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .ilike("client_email", email)
    .order("created_at", { ascending: false });

  if (error) throw error;
  const bookings = data as Booking[];
  if (bookings.length === 0) return null;

  const latest = bookings[0];
  const totalPaidKobo = bookings
    .filter((b) => b.payment_status === "paid")
    .reduce((sum, b) => sum + (b.amount_kobo ?? 0), 0);

  return {
    summary: {
      email: latest.client_email,
      name: latest.client_name,
      phone: latest.client_phone,
      bookingsCount: bookings.length,
      lastBookingAt: latest.created_at,
      totalPaidKobo,
    },
    bookings,
  };
}
