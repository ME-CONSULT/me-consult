"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ADVISORY_SERVICES } from "@/lib/advisoryServices";
import { TIER_LABELS, type Lawyer } from "@/lib/lawyers";
import type { ConsultationRate } from "@/lib/consultationRates";
import type { Duration } from "@/lib/durations";
import { computeTotal, formatNaira } from "@/lib/pricing";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";
const labelClass = "block text-sm font-medium text-[#222753]";

export default function CreateBookingForm({
  lawyers,
  rates,
  durations,
  vatRate,
}: {
  lawyers: Lawyer[];
  rates: ConsultationRate[];
  durations: Duration[];
  vatRate: number;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    service: "",
    title: "",
    scheduled_at: "",
    lawyer_id: "",
    duration_minutes: "",
    notes: "",
  });
  const [totalNaira, setTotalNaira] = useState("");
  const [totalTouched, setTotalTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set(field: keyof typeof form, value: string) {
    const next = { ...form, [field]: value };
    setForm(next);

    if (!totalTouched && next.lawyer_id && next.duration_minutes) {
      const rate = rates.find(
        (r) => r.lawyer_id === next.lawyer_id && r.duration_minutes === Number(next.duration_minutes)
      );
      if (rate?.fee_kobo != null) {
        const { totalKobo } = computeTotal(rate.fee_kobo, vatRate);
        setTotalNaira(String(totalKobo / 100));
      }
    }
  }

  const selectedRate = form.lawyer_id
    ? rates.find(
        (r) => r.lawyer_id === form.lawyer_id && r.duration_minutes === Number(form.duration_minutes)
      )
    : undefined;
  const preview = selectedRate?.fee_kobo != null ? computeTotal(selectedRate.fee_kobo, vatRate) : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/admin/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        duration_minutes: form.duration_minutes ? Number(form.duration_minutes) : null,
        lawyer_id: form.lawyer_id || null,
        fee_kobo: preview?.feeKobo ?? null,
        vat_kobo: preview?.vatKobo ?? null,
        amount_naira: totalNaira,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not create booking");
      return;
    }

    router.push("/admin/bookings/pending");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Client name</label>
          <input
            required
            value={form.client_name}
            onChange={(e) => set("client_name", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Client email</label>
          <input
            type="email"
            required
            value={form.client_email}
            onChange={(e) => set("client_email", e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Phone</label>
          <input
            value={form.client_phone}
            onChange={(e) => set("client_phone", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Regarding</label>
          <select
            value={form.service}
            onChange={(e) => set("service", e.target.value)}
            className={inputClass}
          >
            <option value="">Select a service</option>
            {ADVISORY_SERVICES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Lawyer</label>
          <select
            value={form.lawyer_id}
            onChange={(e) => set("lawyer_id", e.target.value)}
            className={inputClass}
          >
            <option value="">Select a lawyer</option>
            {lawyers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.first_name} {l.last_name} ({TIER_LABELS[l.tier]})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Duration</label>
          <select
            value={form.duration_minutes}
            onChange={(e) => set("duration_minutes", e.target.value)}
            className={inputClass}
          >
            <option value="">Select duration</option>
            {durations.map((d) => (
              <option key={d.id} value={d.minutes}>
                {d.minutes} minutes
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Scheduled for</label>
          <input
            type="datetime-local"
            value={form.scheduled_at}
            onChange={(e) => set("scheduled_at", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Total (₦, incl. VAT)</label>
          <input
            type="number"
            min="0"
            value={totalNaira}
            onChange={(e) => {
              setTotalTouched(true);
              setTotalNaira(e.target.value);
            }}
            className={inputClass}
          />
          {preview && (
            <p className="mt-1 text-xs text-[#222753]/40">
              Fee {formatNaira(preview.feeKobo)} + VAT {formatNaira(preview.vatKobo)}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass}>Appointment title (optional)</label>
        <input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="Custom title for this appointment"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Notes</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          className={inputClass}
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create booking"}
      </button>
    </form>
  );
}
