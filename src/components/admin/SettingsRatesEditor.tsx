"use client";

import { useState } from "react";
import { Trash2, Save, Plus, X } from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";
import type { ConsultationRate } from "@/lib/consultationRates";
import type { Duration } from "@/lib/durations";
import { formatMoney } from "@/lib/pricing";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

const inputClass =
  "w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";
const labelClass = "block text-xs font-medium text-[#222753]/50";

function toMajor(minor: number | null | undefined) {
  return minor == null ? "" : String(minor / 100);
}

export default function SettingsRatesEditor({
  initialRates,
  lawyers,
  durations,
}: {
  initialRates: ConsultationRate[];
  lawyers: Lawyer[];
  durations: Duration[];
}) {
  const [rates, setRates] = useState(initialRates);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingRateId, setEditingRateId] = useState<string | null>(null);
  const [lawyerId, setLawyerId] = useState("");
  const [duration, setDuration] = useState("");
  const [ngn, setNgn] = useState("");
  const [usd, setUsd] = useState("");
  const [gbp, setGbp] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  const sortedRates = rates
    .slice()
    .sort((a, b) =>
      a.duration_minutes === b.duration_minutes
        ? lawyerName(a.lawyer_id).localeCompare(lawyerName(b.lawyer_id))
        : a.duration_minutes - b.duration_minutes
    );
  const allSelected = sortedRates.length > 0 && selectedIds.size === sortedRates.length;

  function toggleOne(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelectedIds(allSelected ? new Set() : new Set(sortedRates.map((r) => r.id)));
  }

  async function handleBulkDelete() {
    const ok = await confirm({
      title: `Delete ${selectedIds.size} rate${selectedIds.size === 1 ? "" : "s"}?`,
      confirmLabel: "Delete",
    });
    if (!ok) return;

    setBulkDeleting(true);
    const ids = Array.from(selectedIds);

    const res = await fetch("/api/admin/rates", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });

    setBulkDeleting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not delete rates");
      return;
    }

    setRates((prev) => prev.filter((r) => !ids.includes(r.id)));
    setSelectedIds(new Set());
  }

  function lawyerName(id: string) {
    const l = lawyers.find((l) => l.id === id);
    return l ? `${l.first_name} ${l.last_name}` : "Unknown";
  }

  function openForNew() {
    setEditingRateId(null);
    setLawyerId("");
    setDuration("");
    setNgn("");
    setUsd("");
    setGbp("");
    setError(null);
    setPanelOpen(true);
  }

  function openForEdit(rate: ConsultationRate) {
    setEditingRateId(rate.id);
    setLawyerId(rate.lawyer_id);
    setDuration(String(rate.duration_minutes));
    setNgn(toMajor(rate.fee_kobo));
    setUsd(toMajor(rate.fee_usd_cents));
    setGbp(toMajor(rate.fee_gbp_pence));
    setError(null);
    setPanelOpen(true);
  }

  function closePanel() {
    setPanelOpen(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!lawyerId || !duration) return;

    setError(null);
    setSaving(true);

    const res = await fetch("/api/admin/rates", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lawyer_id: lawyerId,
        duration_minutes: Number(duration),
        fee_kobo: ngn === "" ? null : Math.round(Number(ngn) * 100),
        fee_usd_cents: usd === "" ? null : Math.round(Number(usd) * 100),
        fee_gbp_pence: gbp === "" ? null : Math.round(Number(gbp) * 100),
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not save rate");
      return;
    }

    const { rate } = await res.json();
    setRates((prev) => {
      const exists = prev.some((r) => r.id === rate.id);
      return exists ? prev.map((r) => (r.id === rate.id ? rate : r)) : [...prev, rate];
    });
    setPanelOpen(false);
  }

  async function handleDelete(id: string) {
    const ok = await confirm({ title: "Delete this rate?", confirmLabel: "Delete" });
    if (!ok) return;
    setDeletingId(id);

    const res = await fetch(`/api/admin/rates?id=${id}`, { method: "DELETE" });

    setDeletingId(null);

    if (res.ok) {
      setRates((prev) => prev.filter((r) => r.id !== id));
      if (editingRateId === id) setPanelOpen(false);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-2">
        {selectedIds.size > 0 && (
          <>
            <span className="text-sm text-[#222753]/50">{selectedIds.size} selected</span>
            <button
              onClick={handleBulkDelete}
              disabled={bulkDeleting}
              className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {bulkDeleting ? "Deleting..." : "Delete selected"}
            </button>
          </>
        )}
        <button
          onClick={openForNew}
          className="flex items-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95"
        >
          <Plus className="h-4 w-4" />
          Add rate
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="w-10 px-6 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all rates"
                  className="h-4 w-4 rounded border-[#222753]/30"
                />
              </th>
              <th className="px-6 py-3 font-medium">Lawyer</th>
              <th className="px-6 py-3 font-medium">Duration</th>
              <th className="px-6 py-3 font-medium">NGN</th>
              <th className="px-6 py-3 font-medium">USD</th>
              <th className="px-6 py-3 font-medium">GBP</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {rates.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-6 text-center text-[#222753]/40">
                  No rates set yet.
                </td>
              </tr>
            )}
            {sortedRates.map((r) => (
                <tr
                  key={r.id}
                  className={`border-b border-[#222753]/5 last:border-0 ${
                    selectedIds.has(r.id) ? "bg-[#ffda00]/10" : ""
                  }`}
                >
                  <td className="px-6 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(r.id)}
                      onChange={() => toggleOne(r.id)}
                      aria-label={`Select rate for ${lawyerName(r.lawyer_id)}, ${r.duration_minutes} min`}
                      className="h-4 w-4 rounded border-[#222753]/30"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-[#222753]">{lawyerName(r.lawyer_id)}</td>
                  <td className="px-6 py-3 text-[#222753]/70">{r.duration_minutes} min</td>
                  <td className="px-6 py-3 text-[#222753]/70">{formatMoney(r.fee_kobo, "NGN")}</td>
                  <td className="px-6 py-3 text-[#222753]/70">{formatMoney(r.fee_usd_cents, "USD")}</td>
                  <td className="px-6 py-3 text-[#222753]/70">{formatMoney(r.fee_gbp_pence, "GBP")}</td>
                  <td className="px-6 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => openForEdit(r)}
                        className="rounded-lg border border-[#222753]/15 px-2.5 py-1 text-xs font-medium text-[#222753]/70 hover:bg-[#222753]/5"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        disabled={deletingId === r.id}
                        className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        aria-label="Delete rate"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <p className="border-t border-[#222753]/5 px-6 py-3 text-xs text-[#222753]/40">
          Rates are excl. VAT. Leave a currency blank if it isn&apos;t offered &mdash; NGN is
          always used as the fallback.
        </p>
      </div>

      {/* Right-side edit/create panel */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${
          panelOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[#171b3d]/40" onClick={closePanel} />
        <div
          className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ${
            panelOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-[#222753]/10 px-6 py-4">
            <h2 className="text-sm font-semibold text-[#222753]">
              {editingRateId ? "Edit rate" : "Add rate"}
            </h2>
            <button
              onClick={closePanel}
              className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-[#222753]/5"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
            <div>
              <label className={labelClass}>Lawyer</label>
              <select
                value={lawyerId}
                onChange={(e) => setLawyerId(e.target.value)}
                required
                className={`${inputClass} mt-1`}
              >
                <option value="">Select lawyer</option>
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
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
                className={`${inputClass} mt-1`}
              >
                <option value="">Select duration</option>
                {durations.map((d) => (
                  <option key={d.id} value={d.minutes}>
                    {d.minutes} min
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>NGN</label>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[#222753]/40">₦</span>
                <input
                  type="number"
                  min="0"
                  value={ngn}
                  onChange={(e) => setNgn(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>USD</label>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[#222753]/40">$</span>
                <input
                  type="number"
                  min="0"
                  value={usd}
                  onChange={(e) => setUsd(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>GBP</label>
              <div className="mt-1 flex items-center gap-1.5">
                <span className="text-[#222753]/40">£</span>
                <input
                  type="number"
                  min="0"
                  value={gbp}
                  onChange={(e) => setGbp(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="mt-auto flex gap-2 border-t border-[#222753]/10 pt-4">
              <button
                type="submit"
                disabled={saving || !lawyerId || !duration}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save rate"}
              </button>
              {editingRateId && (
                <button
                  type="button"
                  onClick={() => handleDelete(editingRateId)}
                  disabled={deletingId === editingRateId}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {dialog}
    </div>
  );
}
