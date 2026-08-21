import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseServerAuth } from "@/lib/supabase/server";
import { getUserRole } from "@/lib/roles";
import PortalSignOutButton from "@/components/portal/PortalSignOutButton";

export default async function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await supabaseServerAuth();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || getUserRole(user) !== "client") {
    redirect("/portal/login");
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-[#222753]/10 bg-white px-4 py-4 sm:px-6">
        <Link href="/portal" className="flex items-center gap-2.5">
          <Image
            src="/me-consult-logo.jpg"
            alt="ME Consult"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-sm font-semibold text-[#222753]">ME Consult</span>
        </Link>
        <PortalSignOutButton email={user.email ?? ""} />
      </header>
      <main className="mx-auto max-w-3xl p-4 sm:p-6">{children}</main>
    </div>
  );
}
