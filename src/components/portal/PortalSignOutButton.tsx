"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function PortalSignOutButton({ email }: { email: string }) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-[#222753]/60 sm:inline">{email}</span>
      <button
        onClick={handleSignOut}
        className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[#222753]/60 hover:bg-[#222753]/5 hover:text-[#222753]"
      >
        <LogOut className="h-4 w-4" />
        Sign out
      </button>
    </div>
  );
}
