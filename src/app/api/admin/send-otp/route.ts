import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";
import { supabaseAdmin, getAdminUserByEmail } from "@/lib/supabase/admin";
import { sendAdminOtpEmail } from "@/lib/email/admin";
import { generateOtpCode, createChallenge, sentRecently, type AdminOtpChallenge } from "@/lib/adminOtpChallenge";

export async function POST(request: Request) {
  const limited = await rateLimit(request, "admin-otp-send", { limit: 5, windowMs: 15 * 60 * 1000 });
  if (limited) return limited;

  const { email } = await request.json();

  if (typeof email !== "string" || !email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Always return a generic response so the endpoint can't be used to
  // discover which emails have admin access. Any email that exists as a
  // Supabase auth user in this project is an admin — there is no other
  // account type in this system.
  const user = await getAdminUserByEmail(normalizedEmail);
  if (!user) {
    return NextResponse.json({ ok: true });
  }

  // Don't issue a fresh code (and reset the attempt counter) more than once
  // a minute; the code already sent is still valid.
  if (sentRecently(user.app_metadata?.admin_otp as AdminOtpChallenge | undefined)) {
    return NextResponse.json({ ok: true });
  }

  const supabase = supabaseAdmin();
  const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: normalizedEmail,
  });

  if (linkError || !linkData.properties?.hashed_token) {
    console.error("generateLink failed:", linkError?.message);
    return NextResponse.json({ ok: true });
  }

  const code = generateOtpCode();
  const challenge = createChallenge(code, linkData.properties.hashed_token);

  const { error: updateError } = await supabase.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, admin_otp: challenge },
  });

  if (updateError) {
    console.error("updateUserById failed:", updateError.message);
    return NextResponse.json({ ok: true });
  }

  try {
    await sendAdminOtpEmail(normalizedEmail, code);
  } catch (err) {
    console.error("sendAdminOtpEmail failed:", err);
    return NextResponse.json({ error: "Could not send code" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
