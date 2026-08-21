import { supabaseAdmin } from "@/lib/supabase/admin";

export type Invoice = {
  id: string;
  invoice_number: number;
  booking_id: string;
  client_id: string | null;
  amount_kobo: number;
  issued_at: string;
  created_at: string;
};

export async function createInvoiceForBooking(
  bookingId: string,
  clientId: string | null,
  amountKobo: number
): Promise<Invoice> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("invoices")
    .insert({ booking_id: bookingId, client_id: clientId, amount_kobo: amountKobo })
    .select()
    .single();

  if (error) throw error;
  return data as Invoice;
}

export async function getInvoiceByNumber(invoiceNumber: number): Promise<Invoice | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("invoice_number", invoiceNumber)
    .single();

  if (error) return null;
  return data as Invoice;
}

export async function getInvoiceForBooking(bookingId: string): Promise<Invoice | null> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("booking_id", bookingId)
    .single();

  if (error) return null;
  return data as Invoice;
}

export async function listInvoicesForClient(clientId: string): Promise<Invoice[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", clientId)
    .order("issued_at", { ascending: false });

  if (error) throw error;
  return data as Invoice[];
}
