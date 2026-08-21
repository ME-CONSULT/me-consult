"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

type AdminUser = {
  id: string;
  email: string;
  createdAt: string;
  lastSignInAt: string | null;
};

export default function UserDetailClient({ user, isSelf }: { user: AdminUser; isSelf: boolean }) {
  const router = useRouter();
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function handleRemove() {
    const ok = await confirm({
      title: `Remove admin access for ${user.email}?`,
      confirmLabel: "Remove",
    });
    if (!ok) return;
    setError(null);
    setRemoving(true);

    const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });

    setRemoving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not remove admin");
      return;
    }

    router.push("/admin/users");
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users"
        className="flex items-center gap-1.5 text-sm text-[#222753]/60 hover:text-[#222753]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to users
      </Link>

      <div className="max-w-md rounded-xl border border-[#222753]/10 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#222753] text-lg font-semibold text-white">
            {user.email.charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-semibold text-[#222753]">{user.email}</h1>
            {isSelf && <p className="text-xs text-[#222753]/40">This is you</p>}
          </div>
        </div>

        <div className="mt-5 space-y-2 border-t border-[#222753]/5 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-[#222753]/50">Admin since</span>
            <span className="text-[#222753]">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#222753]/50">Last sign in</span>
            <span className="text-[#222753]">
              {user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : "Never"}
            </span>
          </div>
        </div>

        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

        {!isSelf && (
          <button
            onClick={handleRemove}
            disabled={removing}
            className="mt-5 flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            {removing ? "Removing..." : "Remove admin access"}
          </button>
        )}
      </div>
      {dialog}
    </div>
  );
}
