import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { getUserRole } from "@/lib/roles";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendClientPasswordResetEmail } from "@/lib/email/client";

export async function POST(request: Request) {
  const limited = await rateLimit(request, "portal-forgot", { limit: 5, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  const { email } = await request.json();

  if (typeof email !== "string" || !email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const admin = supabaseAdmin();

  // Always return a generic response so this endpoint can't be used to
  // discover which emails have a client account (same anti-enumeration
  // pattern as the admin OTP send route).
  const { data: linkData, error: linkError } = await admin.auth.admin.generateLink({
    type: "recovery",
    email: normalizedEmail,
  });

  if (linkError || !linkData.properties?.hashed_token) {
    return NextResponse.json({ ok: true });
  }

  // Portal password resets are for client accounts only; staff sign in
  // through the admin email-code flow.
  if (getUserRole(linkData.user) !== "client") {
    return NextResponse.json({ ok: true });
  }

  try {
    await sendClientPasswordResetEmail(normalizedEmail, linkData.properties.hashed_token);
  } catch (err) {
    console.error("sendClientPasswordResetEmail failed:", err);
  }

  return NextResponse.json({ ok: true });
}
