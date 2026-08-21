"use client";

import { useState } from "react";
import type { Settings } from "@/lib/settings";
import type { Lawyer } from "@/lib/lawyers";
import type { Duration } from "@/lib/durations";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";
const labelClass = "block text-sm font-medium text-[#222753]";

export default function SettingsDefaultBookingForm({
  initialSettings,
  lawyers,
  durations,
}: {
  initialSettings: Settings;
  lawyers: Lawyer[];
  durations: Duration[];
}) {
  const [lawyerId, setLawyerId] = useState(initialSettings.default_lawyer_id ?? "");
  const [durationMinutes, setDurationMinutes] = useState(
    initialSettings.default_duration_minutes?.toString() ?? ""
  );
  const [feeNaira, setFeeNaira] = useState(
    initialSettings.default_fee_kobo != null ? String(initialSettings.default_fee_kobo / 100) : ""
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        default_lawyer_id: lawyerId || null,
        default_duration_minutes: durationMinutes ? Number(durationMinutes) : null,
        default_fee_kobo: feeNaira ? Math.round(Number(feeNaira) * 100) : null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save");
      return;
    }

    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6"
    >
      <p className="text-sm text-[#222753]/50">
        The single consultant, duration, and flat price shown by default on the public booking
        page.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className={labelClass}>Consultant</label>
          <select value={lawyerId} onChange={(e) => setLawyerId(e.target.value)} className={inputClass}>
            <option value="">None selected</option>
            {lawyers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.first_name} {l.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Duration</label>
          <select
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            className={inputClass}
          >
            <option value="">None selected</option>
            {durations.map((d) => (
              <option key={d.id} value={d.minutes}>
                {d.minutes} minutes
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (₦, incl. VAT)</label>
          <input
            type="number"
            min="0"
            value={feeNaira}
            onChange={(e) => setFeeNaira(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save default booking page"}
      </button>
    </form>
  );
}
