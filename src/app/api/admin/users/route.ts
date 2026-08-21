import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { supabaseAdmin, getAdminUserByEmail } from "@/lib/supabase/admin";
import { sendAdminInviteEmail } from "@/lib/email/admin";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = supabaseAdmin();
  const { data, error } = await admin.auth.admin.listUsers({ perPage: 200 });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const users = data.users
    .map((u) => ({
      id: u.id,
      email: u.email,
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at,
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { email } = await request.json();
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await getAdminUserByEmail(normalizedEmail);
  if (existing) {
    return NextResponse.json({ error: "This email is already an admin" }, { status: 409 });
  }

  const admin = supabaseAdmin();
  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    await sendAdminInviteEmail(normalizedEmail, sessionUser.email ?? "An admin");
  } catch (err) {
    console.error("sendAdminInviteEmail failed:", err);
  }

  return NextResponse.json({
    user: { id: data.user.id, email: data.user.email, createdAt: data.user.created_at },
  });
}
