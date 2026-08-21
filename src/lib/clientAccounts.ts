import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getClientByEmail, updateClient, type ClientRecord } from "@/lib/clients";
import type { Booking } from "@/lib/bookings";

function generateTempPassword() {
  // 16 random bytes, base64url-encoded — short enough to type, long enough
  // to be a safe one-time credential the client is expected to change.
  return crypto.randomBytes(16).toString("base64url");
}

/** Ensures a portal login exists for the client behind a just-paid booking.
 * Safe to call concurrently (webhook + confirm-page can both observe a
 * booking flip to "paid" at nearly the same time): claims the right to
 * provision via an optimistic-lock update on `clients.login_sent_at`, so
 * only one caller ever creates the Supabase auth user / sends the email. */
export async function ensureClientAccountForBooking(
  booking: Booking
): Promise<{ isNewAccount: boolean; tempPassword?: string; client: ClientRecord } | null> {
  const client = booking.client_id
    ? await supabaseAdmin()
        .from("clients")
        .select("*")
        .eq("id", booking.client_id)
        .single()
        .then((r) => r.data as ClientRecord | null)
    : await getClientByEmail(booking.client_email);

  if (!client) return null;
  if (client.auth_user_id) return { isNewAccount: false, client };

  const supabase = supabaseAdmin();

  // Optimistic lock: only the caller that flips login_sent_at from null
  // wins the right to actually create the account.
  const { data: claimed, error: claimError } = await supabase
    .from("clients")
    .update({ login_sent_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", client.id)
    .is("auth_user_id", null)
    .is("login_sent_at", null)
    .select()
    .single();

  if (claimError || !claimed) {
    // Another concurrent call already claimed it (or it's already sent).
    return { isNewAccount: false, client };
  }

  const tempPassword = generateTempPassword();

  const { data, error } = await supabase.auth.admin.createUser({
    email: client.email,
    password: tempPassword,
    email_confirm: true,
    app_metadata: { role: "client" },
  });

  if (error) {
    // Roll back the claim so a later booking/webhook retry can try again.
    await supabase
      .from("clients")
      .update({ login_sent_at: null })
      .eq("id", client.id)
      .is("auth_user_id", null);
    throw error;
  }

  const updated = await updateClient(client.id, { auth_user_id: data.user.id });

  return { isNewAccount: true, tempPassword, client: updated };
}
