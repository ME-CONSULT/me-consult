import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { supabaseAdmin, listStaffUsers, getAdminUserByEmail } from "@/lib/supabase/admin";
import { getUserRole, type Role } from "@/lib/roles";
import { sendAdminInviteEmail } from "@/lib/email/admin";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const staff = await listStaffUsers();

  const users = staff
    .map((u) => ({
      id: u.id,
      email: u.email,
      role: getUserRole(u),
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
  if (getUserRole(sessionUser) !== "admin") {
    return NextResponse.json({ error: "Only admins can add staff or admin accounts" }, { status: 403 });
  }

  const { email, role } = await request.json();
  if (typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  const inviteRole: Role = role === "staff" ? "staff" : "admin";

  const normalizedEmail = email.trim().toLowerCase();

  const existing = await getAdminUserByEmail(normalizedEmail);
  if (existing) {
    return NextResponse.json({ error: "This email already has dashboard access" }, { status: 409 });
  }

  const admin = supabaseAdmin();
  const { data, error } = await admin.auth.admin.createUser({
    email: normalizedEmail,
    email_confirm: true,
    app_metadata: { role: inviteRole },
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
    user: { id: data.user.id, email: data.user.email, role: inviteRole, createdAt: data.user.created_at },
  });
}
