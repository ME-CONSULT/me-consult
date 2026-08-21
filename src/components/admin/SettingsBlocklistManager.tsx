"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { BlockedEmail } from "@/lib/blockedEmails";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

export default function SettingsBlocklistManager({
  initialEntries,
}: {
  initialEntries: BlockedEmail[];
}) {
  const [entries, setEntries] = useState(initialEntries);
  const [pattern, setPattern] = useState("");
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/blocked-emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pattern, reason }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not add entry");
      return;
    }

    const { entry } = await res.json();
    setEntries((prev) => [entry, ...prev]);
    setPattern("");
    setReason("");
  }

  async function handleRemove(id: string) {
    const ok = await confirm({ title: "Remove this block?", confirmLabel: "Remove" });
    if (!ok) return;

    const res = await fetch(`/api/admin/blocked-emails/${id}`, { method: "DELETE" });
    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  }

  return (
    <div className="rounded-xl border border-[#222753]/10 bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {entries.map((e) => (
          <span
            key={e.id}
            className="flex items-center gap-1.5 rounded-full bg-[#222753]/5 px-3 py-1.5 text-sm font-medium text-[#222753]"
            title={e.reason ?? undefined}
          >
            {e.pattern}
            <button onClick={() => handleRemove(e.id)} aria-label={`Remove ${e.pattern}`}>
              <X className="h-3.5 w-3.5 text-[#222753]/40 hover:text-red-600" />
            </button>
          </span>
        ))}
        {entries.length === 0 && <p className="text-sm text-[#222753]/40">No blocked emails yet.</p>}
      </div>

      <form onSubmit={handleAdd} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          placeholder="name@example.com or @example.com"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          required
          className="flex-1 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
        />
        <input
          type="text"
          placeholder="Reason (optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="flex-1 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-1 rounded-lg bg-[#222753]/5 px-3 py-1.5 text-xs font-medium text-[#222753] hover:bg-[#222753]/10 disabled:opacity-50"
        >
          <Plus className="h-3 w-3" />
          Block
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {dialog}
    </div>
  );
}
