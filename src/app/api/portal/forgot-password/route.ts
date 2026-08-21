import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendClientPasswordResetEmail } from "@/lib/email/client";

export async function POST(request: Request) {
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

  try {
    await sendClientPasswordResetEmail(normalizedEmail, linkData.properties.hashed_token);
  } catch (err) {
    console.error("sendClientPasswordResetEmail failed:", err);
  }

  return NextResponse.json({ ok: true });
}
