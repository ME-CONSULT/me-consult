"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import type { Role } from "@/lib/roles";

export default function AdminShell({
  email,
  displayName,
  role,
  children,
}: {
  email: string;
  displayName: string;
  role: Role;
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f6fa]">
      <AdminSidebar role={role} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-60">
        <AdminHeader
          email={email}
          displayName={displayName}
          onMenuClick={() => setMobileOpen(true)}
        />
        <main className="p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
