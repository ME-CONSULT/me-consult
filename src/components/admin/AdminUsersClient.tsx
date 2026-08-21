"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, UserPlus } from "lucide-react";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

type AdminUser = {
  id: string;
  email: string;
  createdAt: string;
  lastSignInAt: string | null;
};

export default function AdminUsersClient({
  currentUserId,
  initialUsers,
}: {
  currentUserId: string;
  initialUsers: AdminUser[];
}) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [email, setEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function loadUsers() {
    const res = await fetch("/api/admin/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInviting(true);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setInviting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not add admin");
      return;
    }

    setEmail("");
    loadUsers();
  }

  async function handleRemove(id: string) {
    const ok = await confirm({ title: "Remove this admin's access?", confirmLabel: "Remove" });
    if (!ok) return;
    setRemovingId(id);

    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });

    setRemovingId(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not remove admin");
      return;
    }

    loadUsers();
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#222753]/10 bg-white p-6">
        <h2 className="text-sm font-semibold text-[#222753]">Add an admin</h2>
        <p className="mt-1 text-sm text-[#222753]/50">
          They&apos;ll get an email and can sign in immediately with a one-time code &mdash; no
          password needed.
        </p>

        <form onSubmit={handleInvite} className="mt-4 flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="flex-1 rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
          />
          <button
            type="submit"
            disabled={inviting || !email}
            className="flex items-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
          >
            <UserPlus className="h-4 w-4" />
            {inviting ? "Adding..." : "Add admin"}
          </button>
        </form>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Added</th>
              <th className="px-6 py-3 font-medium">Last sign in</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-center text-[#222753]/40">
                  No admins yet.
                </td>
              </tr>
            )}
            {users.map((u) => (
              <tr key={u.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5 font-medium text-[#222753]">
                  <Link href={`/admin/users/${u.id}`} className="hover:underline">
                    {u.email}
                  </Link>
                  {u.id === currentUserId && (
                    <span className="ml-2 rounded-full bg-[#ffda00]/30 px-2 py-0.5 text-xs font-normal text-[#222753]">
                      You
                    </span>
                  )}
                </td>
                <td className="px-6 py-3.5 text-[#222753]/60">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3.5 text-[#222753]/60">
                  {u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleDateString() : "Never"}
                </td>
                <td className="px-6 py-3.5 text-right">
                  {u.id !== currentUserId && (
                    <button
                      onClick={() => handleRemove(u.id)}
                      disabled={removingId === u.id}
                      className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                      aria-label={`Remove ${u.email}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {dialog}
    </div>
  );
}
