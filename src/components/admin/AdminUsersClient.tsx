"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, UserPlus } from "lucide-react";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";
import type { Role } from "@/lib/roles";

type AdminUser = {
  id: string;
  email: string;
  role: Role;
  createdAt: string;
  lastSignInAt: string | null;
};

const ROLE_BADGE: Record<Role, string> = {
  admin: "bg-[#ffda00]/30 text-[#222753]",
  staff: "bg-[#222753]/5 text-[#222753]/60",
  client: "bg-[#222753]/5 text-[#222753]/60",
};

export default function AdminUsersClient({
  currentUserId,
  initialUsers,
  currentUserRole,
}: {
  currentUserId: string;
  initialUsers: AdminUser[];
  currentUserRole: Role;
}) {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "staff">("staff");
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();
  const canManageUsers = currentUserRole === "admin";

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
      body: JSON.stringify({ email, role }),
    });

    setInviting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not add user");
      return;
    }

    setEmail("");
    setRole("staff");
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
      {canManageUsers && (
        <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
          <h2 className="text-sm font-semibold text-[#222753]">Add a dashboard user</h2>
          <p className="mt-1 text-sm text-[#222753]/50">
            They&apos;ll get an email and can sign in immediately with a one-time code &mdash; no
            password needed. Staff see everything except earnings, payments, and payment settings.
          </p>

          <form onSubmit={handleInvite} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="flex-1 rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "admin" | "staff")}
              className="rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
            >
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
            <button
              type="submit"
              disabled={inviting || !email}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              {inviting ? "Adding..." : "Add user"}
            </button>
          </form>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Role</th>
              <th className="px-6 py-3 font-medium">Added</th>
              <th className="px-6 py-3 font-medium">Last sign in</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-[#222753]/40">
                  No dashboard users yet.
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
                <td className="px-6 py-3.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${ROLE_BADGE[u.role]}`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-3.5 text-[#222753]/60">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-3.5 text-[#222753]/60">
                  {u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleDateString() : "Never"}
                </td>
                <td className="px-6 py-3.5 text-right">
                  {canManageUsers && u.id !== currentUserId && (
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
