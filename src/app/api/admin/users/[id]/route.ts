import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getUserRole, isStaffRole } from "@/lib/roles";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (getUserRole(sessionUser) !== "admin") {
    return NextResponse.json({ error: "Only admins can remove dashboard access" }, { status: 403 });
  }

  const { id } = await params;

  if (id === sessionUser.id) {
    return NextResponse.json(
      { error: "You can't remove your own admin access" },
      { status: 400 }
    );
  }

  const admin = supabaseAdmin();
  const { error } = await admin.auth.admin.deleteUser(id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
