import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { full_name } = await request.json();
  if (typeof full_name !== "string") {
    return NextResponse.json({ error: "full_name is required" }, { status: 400 });
  }

  const admin = supabaseAdmin();
  const { error } = await admin.auth.admin.updateUserById(sessionUser.id, {
    user_metadata: { ...sessionUser.user_metadata, full_name: full_name.trim() },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
