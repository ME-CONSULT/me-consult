import { supabaseServerAuth } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import AdminUsersClient from "@/components/admin/AdminUsersClient";

export default async function AdminUsersPage() {
  const supabase = await supabaseServerAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const admin = supabaseAdmin();
  const { data } = await admin.auth.admin.listUsers({ perPage: 200 });

  const users = (data?.users ?? [])
    .map((u) => ({
      id: u.id,
      email: u.email ?? "",
      createdAt: u.created_at,
      lastSignInAt: u.last_sign_in_at ?? null,
    }))
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));

  return <AdminUsersClient currentUserId={user?.id ?? ""} initialUsers={users} />;
}
