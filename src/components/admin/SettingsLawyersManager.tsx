"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { TIER_LABELS, type Lawyer, type LawyerTier } from "@/lib/lawyers";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

const inputClass =
  "rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";

const EMPTY_FORM = { first_name: "", last_name: "", title: "", tier: "consultant_associate" as LawyerTier };

export default function SettingsLawyersManager({ initialLawyers }: { initialLawyers: Lawyer[] }) {
  const [lawyers, setLawyers] = useState(initialLawyers);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function refresh() {
    const res = await fetch("/api/admin/lawyers");
    if (res.ok) setLawyers((await res.json()).lawyers);
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/lawyers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not add lawyer");
      return;
    }

    setForm(EMPTY_FORM);
    refresh();
  }

  async function toggleActive(lawyer: Lawyer) {
    setTogglingId(lawyer.id);
    const nextActive = !lawyer.active;

    const res = await fetch(`/api/admin/lawyers/${lawyer.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: nextActive }),
    });

    setTogglingId(null);

    if (res.ok) {
      setLawyers((prev) =>
        prev.map((l) => (l.id === lawyer.id ? { ...l, active: nextActive } : l))
      );
    }
  }

  async function handleRemove(id: string) {
    const ok = await confirm({
      title: "Remove this lawyer?",
      description: "Existing bookings will keep their record.",
      confirmLabel: "Remove",
    });
    if (!ok) return;
    const res = await fetch(`/api/admin/lawyers/${id}`, { method: "DELETE" });
    if (res.ok) refresh();
  }

  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Tier</th>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Active</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {lawyers.map((l) => (
              <tr key={l.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5 font-medium text-[#222753]">
                  {l.first_name} {l.last_name}
                </td>
                <td className="px-6 py-3.5 text-[#222753]/70">{TIER_LABELS[l.tier]}</td>
                <td className="px-6 py-3.5 text-[#222753]/60">{l.title}</td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-2">
                    <button
                      role="switch"
                      aria-checked={l.active}
                      aria-label={`${l.active ? "Deactivate" : "Activate"} ${l.first_name}`}
                      onClick={() => toggleActive(l)}
                      disabled={togglingId === l.id}
                      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${
                        l.active ? "bg-[#ffda00]" : "bg-[#222753]/15"
                      }`}
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                          l.active ? "translate-x-4" : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="text-xs text-[#222753]/50">
                      {l.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-right">
                  <button
                    onClick={() => handleRemove(l.id)}
                    className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-red-50 hover:text-red-600"
                    aria-label={`Remove ${l.first_name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleAdd} className="flex flex-wrap items-end gap-2 rounded-xl border border-[#222753]/10 bg-white p-4">
        <input
          placeholder="First name"
          required
          value={form.first_name}
          onChange={(e) => setForm({ ...form, first_name: e.target.value })}
          className={`${inputClass} w-32`}
        />
        <input
          placeholder="Last name"
          required
          value={form.last_name}
          onChange={(e) => setForm({ ...form, last_name: e.target.value })}
          className={`${inputClass} w-32`}
        />
        <select
          value={form.tier}
          onChange={(e) => setForm({ ...form, tier: e.target.value as LawyerTier })}
          className={inputClass}
        >
          {Object.entries(TIER_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <input
          placeholder="Title (public display)"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className={`${inputClass} flex-1`}
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {dialog}
    </div>
  );
}
