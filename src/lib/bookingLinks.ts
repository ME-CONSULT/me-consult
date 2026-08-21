import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type BookingLinkStatus = "active" | "used" | "revoked";

export type BookingLink = {
  id: string;
  token: string;
  title: string | null;
  duration_minutes: number;
  fee_kobo: number;
  status: BookingLinkStatus;
  expires_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type NewBookingLinkInput = {
  title?: string | null;
  duration_minutes: number;
  fee_kobo: number;
  lawyer_ids: string[]; // 1..N
  expires_at?: string | null;
  created_by: string;
};

function generateToken() {
  return crypto.randomBytes(12).toString("base64url");
}

export async function createBookingLink(input: NewBookingLinkInput): Promise<BookingLink> {
  const supabase = supabaseAdmin();
  const token = generateToken();

  const { data: link, error } = await supabase
    .from("booking_links")
    .insert({
      token,
      title: input.title ?? null,
      duration_minutes: input.duration_minutes,
      fee_kobo: input.fee_kobo,
      expires_at: input.expires_at ?? null,
      created_by: input.created_by,
    })
    .select()
    .single();

  if (error) throw error;

  const { error: joinError } = await supabase
    .from("booking_link_lawyers")
    .insert(input.lawyer_ids.map((lawyer_id) => ({ booking_link_id: link.id, lawyer_id })));

  if (joinError) throw joinError;

  return link as BookingLink;
}

export async function listBookingLinks(): Promise<BookingLink[]> {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("booking_links")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as BookingLink[];
}

export async function getBookingLinkByToken(
  token: string
): Promise<{ link: BookingLink; lawyerIds: string[] } | null> {
  const supabase = supabaseAdmin();
  const { data: link, error } = await supabase
    .from("booking_links")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !link) return null;

  const { data: joins, error: joinError } = await supabase
    .from("booking_link_lawyers")
    .select("lawyer_id")
    .eq("booking_link_id", link.id);

  if (joinError) throw joinError;

  return {
    link: link as BookingLink,
    lawyerIds: (joins ?? []).map((j) => j.lawyer_id as string),
  };
}

export async function updateBookingLinkStatus(id: string, status: BookingLinkStatus) {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("booking_links")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as BookingLink;
}

export function isBookingLinkUsable(link: BookingLink): { ok: true } | { ok: false; reason: string } {
  if (link.status === "revoked") return { ok: false, reason: "This link has been revoked." };
  if (link.status === "used") return { ok: false, reason: "This link has already been used." };
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    return { ok: false, reason: "This link has expired." };
  }
  return { ok: true };
}
