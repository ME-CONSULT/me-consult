import { redirect } from "next/navigation";
import { supabaseServerAuth } from "@/lib/supabase/server";
import { adminDisplayName } from "@/lib/adminDisplayName";
import { getUserRole } from "@/lib/roles";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <AdminShell email={user.email ?? ""} displayName={adminDisplayName(user)} role={getUserRole(user)}>
      {children}
    </AdminShell>
  );
}
