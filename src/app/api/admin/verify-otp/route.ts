import { NextResponse } from "next/server";
import { supabaseAdmin, getAdminUserByEmail } from "@/lib/supabase/admin";
import { supabaseServerAuth } from "@/lib/supabase/server";
import { checkChallenge, type AdminOtpChallenge } from "@/lib/adminOtpChallenge";

const INVALID_CODE_MESSAGE = "That code is invalid or has expired. Request a new one.";

export async function POST(request: Request) {
  const { email, code } = await request.json();

  if (typeof email !== "string" || typeof code !== "string") {
    return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = await getAdminUserByEmail(normalizedEmail);
  if (!user) {
    return NextResponse.json({ error: INVALID_CODE_MESSAGE }, { status: 401 });
  }

  const challenge = user.app_metadata?.admin_otp as AdminOtpChallenge | undefined;
  const result = checkChallenge(challenge, code);
  const admin = supabaseAdmin();

  if (!result.ok) {
    if (result.reason === "mismatch" && challenge) {
      await admin.auth.admin.updateUserById(user.id, {
        app_metadata: {
          ...user.app_metadata,
          admin_otp: { ...challenge, attempts: challenge.attempts + 1 },
        },
      });
    }
    return NextResponse.json({ error: INVALID_CODE_MESSAGE }, { status: 401 });
  }

  // Consume the challenge so it can't be reused.
  await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, admin_otp: null },
  });

  const supabase = await supabaseServerAuth();
  const { error } = await supabase.auth.verifyOtp({
    token_hash: challenge!.tokenHash,
    type: "magiclink",
  });

  if (error) {
    console.error("verifyOtp failed:", error.message);
    return NextResponse.json({ error: INVALID_CODE_MESSAGE }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
