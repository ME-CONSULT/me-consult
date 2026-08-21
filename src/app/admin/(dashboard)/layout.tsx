import { redirect } from "next/navigation";
import { supabaseServerAuth } from "@/lib/supabase/server";
import { adminDisplayName } from "@/lib/adminDisplayName";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

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
    <div className="min-h-screen bg-[#f5f6fa]">
      <AdminSidebar />
      <div className="lg:pl-60">
        <AdminHeader email={user.email ?? ""} displayName={adminDisplayName(user)} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
