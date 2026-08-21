"use client";

import { useState } from "react";
import type { Settings } from "@/lib/settings";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";
const labelClass = "block text-sm font-medium text-[#222753]";

export default function SettingsBusinessForm({ initialSettings }: { initialSettings: Settings }) {
  const [form, setForm] = useState({
    business_email: initialSettings.business_email,
    business_phone: initialSettings.business_phone ?? "",
    booking_notice_hours: initialSettings.booking_notice_hours,
    vat_rate: initialSettings.vat_rate,
    business_days: initialSettings.business_days,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggleDay(day: number) {
    setForm((prev) => ({
      ...prev,
      business_days: prev.business_days.includes(day)
        ? prev.business_days.filter((d) => d !== day)
        : [...prev.business_days, day].sort(),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    setSaving(true);

    const res = await fetch("/api/admin/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save settings");
      return;
    }

    setSaved(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-[#222753]/10 bg-white p-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Business email</label>
          <input
            type="email"
            required
            value={form.business_email}
            onChange={(e) => setForm({ ...form, business_email: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Business phone</label>
          <input
            value={form.business_phone}
            onChange={(e) => setForm({ ...form, business_phone: e.target.value })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Minimum booking notice (hours)</label>
          <input
            type="number"
            min="0"
            value={form.booking_notice_hours}
            onChange={(e) => setForm({ ...form, booking_notice_hours: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>VAT rate (%)</label>
          <input
            type="number"
            min="0"
            step="0.1"
            value={form.vat_rate}
            onChange={(e) => setForm({ ...form, vat_rate: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Bookable days</label>
        <div className="mt-2 flex gap-2">
          {DAY_LABELS.map((label, day) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(day)}
              className={`h-9 w-9 rounded-lg text-xs font-medium transition ${
                form.business_days.includes(day)
                  ? "bg-[#ffda00] text-[#222753]"
                  : "bg-[#222753]/5 text-[#222753]/40"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Saved.</p>}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save business settings"}
      </button>
    </form>
  );
}
