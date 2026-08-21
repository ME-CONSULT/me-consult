"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import type { Duration } from "@/lib/durations";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

export default function SettingsDurationsManager({
  initialDurations,
}: {
  initialDurations: Duration[];
}) {
  const [durations, setDurations] = useState(initialDurations);
  const [minutes, setMinutes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/durations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ minutes: Number(minutes) }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not add duration");
      return;
    }

    const { duration } = await res.json();
    setDurations((prev) => [...prev, duration].sort((a, b) => a.minutes - b.minutes));
    setMinutes("");
  }

  async function handleRemove(id: string) {
    const ok = await confirm({
      title: "Remove this duration?",
      description: "Any rates and timeslots set for it will be removed too.",
      confirmLabel: "Remove",
    });
    if (!ok) return;

    const res = await fetch(`/api/admin/durations/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDurations((prev) => prev.filter((d) => d.id !== id));
    }
  }

  return (
    <div className="rounded-xl border border-[#222753]/10 bg-white p-4">
      <div className="flex flex-wrap gap-2">
        {durations.map((d) => (
          <span
            key={d.id}
            className="flex items-center gap-1.5 rounded-full bg-[#222753]/5 px-3 py-1.5 text-sm font-medium text-[#222753]"
          >
            {d.minutes} min
            <button onClick={() => handleRemove(d.id)} aria-label={`Remove ${d.minutes} min`}>
              <X className="h-3.5 w-3.5 text-[#222753]/40 hover:text-red-600" />
            </button>
          </span>
        ))}
      </div>

      <form onSubmit={handleAdd} className="mt-3 flex gap-2">
        <input
          type="number"
          min="1"
          max="480"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          required
          className="w-28 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-1 rounded-lg bg-[#222753]/5 px-3 py-1.5 text-xs font-medium text-[#222753] hover:bg-[#222753]/10 disabled:opacity-50"
        >
          <Plus className="h-3 w-3" />
          Add duration
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      {dialog}
    </div>
  );
}
