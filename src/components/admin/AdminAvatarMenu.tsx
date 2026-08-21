"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, LogOut, ChevronDown } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function AdminAvatarMenu({
  email,
  displayName,
}: {
  email: string;
  displayName: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const initial = (displayName || email).charAt(0).toUpperCase();

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-[#222753]/5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#222753] text-sm font-semibold text-white">
          {initial}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-[#222753]/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-xl border border-[#222753]/10 bg-white shadow-lg">
          <div className="border-b border-[#222753]/5 px-4 py-3">
            <p className="truncate text-sm font-medium text-[#222753]">{displayName}</p>
            <p className="truncate text-xs text-[#222753]/50">{email}</p>
          </div>
          <div className="py-1">
            <Link
              href="/admin/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#222753] hover:bg-[#222753]/5"
            >
              <User className="h-4 w-4 text-[#222753]/50" />
              Profile
            </Link>
          </div>
          <div className="border-t border-[#222753]/5 py-1">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
