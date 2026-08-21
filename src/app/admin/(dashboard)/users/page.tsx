import { supabaseServerAuth } from "@/lib/supabase/server";
import { listStaffUsers } from "@/lib/supabase/admin";
import { getUserRole } from "@/lib/roles";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
  const supabase = await supabaseServerAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const staff = await listStaffUsers();

  const users = staff
    .map((u) => ({
      id: u.id,
      email: u.email ?? "",
      role: getUserRole(u),
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

  return (
    <AdminUsersClient
      currentUserId={user?.id ?? ""}
      currentUserRole={getUserRole(user)}
      initialUsers={users}
    />
  );
}
