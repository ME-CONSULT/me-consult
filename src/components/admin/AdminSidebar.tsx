"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, X } from "lucide-react";
import { adminNavItems } from "@/lib/adminNav";
import type { Role } from "@/lib/roles";

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const pathname = usePathname();
  const visibleNavItems = adminNavItems.filter((item) => !item.minRole || role === item.minRole);
  const [openHrefs, setOpenHrefs] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const item of visibleNavItems) {
      if (item.children && isActivePath(pathname, item.href)) initial.add(item.href);
    }
    return initial;
  });

  function toggleOpen(href: string) {
    setOpenHrefs((prev) => {
      const next = new Set(prev);
      if (next.has(href)) next.delete(href);
      else next.add(href);
      return next;
    });
  }

  return (
    <>
      <nav className="flex-1 space-y-1 px-3">
        {visibleNavItems.map((item) => {
          const active = isActivePath(pathname, item.href);
          const open = openHrefs.has(item.href);
          const Icon = item.icon;
          return (
            <div key={item.href}>
              <div
                className={`flex items-center rounded-lg text-sm font-medium transition ${
                  active ? "bg-[#ffda00] text-[#171b3d]" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Link
                  href={item.children ? item.children[0].href : item.href}
                  onClick={onNavigate}
                  className="flex flex-1 items-center gap-3 px-3 py-2.5"
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => toggleOpen(item.href)}
                    aria-label={open ? `Collapse ${item.label}` : `Expand ${item.label}`}
                    aria-expanded={open}
                    className="px-2.5 py-2.5"
                  >
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {item.children && open && (
                <div className="mt-1 space-y-0.5 border-l border-white/10 pl-6">
                  {item.children.map((child) => {
                    const childActive = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={onNavigate}
                        className={`block rounded-lg px-3 py-1.5 text-sm transition ${
                          childActive
                            ? "text-[#ffda00] font-medium"
                            : "text-white/50 hover:text-white"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-6 py-6">
        <p className="text-xs text-white/30">ME Consult Admin</p>
      </div>
    </>
  );
}

export default function AdminSidebar({
  role,
  mobileOpen,
  onClose,
}: {
  role: Role;
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col bg-[#171b3d] lg:flex">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <Image
            src="/White logo.png"
            alt="ME Consult"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg"
          />
          <span className="text-sm font-semibold text-white">ME Consult</span>
        </div>
        <SidebarContent role={role} />
      </aside>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 max-w-[80vw] flex-col bg-[#171b3d] transition-transform duration-200 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between gap-2.5 px-6 py-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/White logo.png"
              alt="ME Consult"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg"
            />
            <span className="text-sm font-semibold text-white">ME Consult</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/5 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <SidebarContent role={role} onNavigate={onClose} />
      </aside>
    </>
  );
}
