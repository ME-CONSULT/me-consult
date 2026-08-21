"use client";

import { useState } from "react";
import { Copy, Check, X } from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";
import type { BookingLink } from "@/lib/bookingLinks";
import { useConfirmDialog } from "@/components/admin/useConfirmDialog";

const inputClass =
  "mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none placeholder:text-[#222753]/30 focus:border-[#222753]/40";
const labelClass = "block text-sm font-medium text-[#222753]";

const STATUS_BADGE: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  used: "bg-[#222753]/10 text-[#222753]/60",
  revoked: "bg-red-100 text-red-700",
};

function linkUrl(token: string) {
  if (typeof window === "undefined") return `/book/link/${token}`;
  return `${window.location.origin}/book/link/${token}`;
}

export default function CreateBookingLinkForm({
  lawyers,
  initialLinks,
}: {
  lawyers: Lawyer[];
  initialLinks: BookingLink[];
}) {
  const [links, setLinks] = useState(initialLinks);
  const [title, setTitle] = useState("");
  const [durationMinutes, setDurationMinutes] = useState("60");
  const [feeNaira, setFeeNaira] = useState("");
  const [lawyerIds, setLawyerIds] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const { confirm, dialog } = useConfirmDialog();

  function toggleLawyer(id: string) {
    setLawyerIds((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/admin/booking-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || null,
        duration_minutes: Number(durationMinutes),
        fee_kobo: Math.round(Number(feeNaira) * 100),
        lawyer_ids: lawyerIds,
      }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not create link");
      return;
    }

    const { link } = await res.json();
    setLinks((prev) => [link, ...prev]);
    setTitle("");
    setFeeNaira("");
    setLawyerIds([]);
  }

  async function handleCopy(token: string, id: string) {
    await navigator.clipboard.writeText(linkUrl(token));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  }

  async function handleRevoke(id: string) {
    const ok = await confirm({ title: "Revoke this booking link?", confirmLabel: "Revoke" });
    if (!ok) return;
    setRevokingId(id);

    const res = await fetch(`/api/admin/booking-links/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "revoked" }),
    });

    setRevokingId(null);
    if (!res.ok) return;

    const { link } = await res.json();
    setLinks((prev) => prev.map((l) => (l.id === id ? link : l)));
  }

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6"
      >
        <div>
          <label className={labelClass}>Title (optional)</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. M&A strategy session"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Duration (minutes)</label>
            <input
              type="number"
              min="1"
              required
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Price (₦, incl. VAT)</label>
            <input
              type="number"
              min="0"
              required
              value={feeNaira}
              onChange={(e) => setFeeNaira(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>
            Consultant(s) &mdash; select more than one for a combined session
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {lawyers.map((l) => {
              const selected = lawyerIds.includes(l.id);
              return (
                <button
                  type="button"
                  key={l.id}
                  onClick={() => toggleLawyer(l.id)}
                  className={`rounded-lg border px-3 py-1.5 text-sm transition ${
                    selected
                      ? "border-[#222753] bg-[#222753] text-white"
                      : "border-[#222753]/15 text-[#222753]/70 hover:border-[#222753]/40"
                  }`}
                >
                  {l.first_name} {l.last_name}
                </button>
              );
            })}
          </div>
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting || lawyerIds.length === 0 || !feeNaira || !durationMinutes}
          className="rounded-lg bg-[#ffda00] px-4 py-2 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
        >
          {submitting ? "Creating..." : "Create link"}
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Duration</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {links.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-[#222753]/40">
                  No booking links yet.
                </td>
              </tr>
            )}
            {links.map((l) => (
              <tr key={l.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5 font-medium text-[#222753]">{l.title || "Untitled"}</td>
                <td className="px-6 py-3.5 text-[#222753]/70">{l.duration_minutes} min</td>
                <td className="px-6 py-3.5 text-[#222753]/70">
                  ₦{(l.fee_kobo / 100).toLocaleString()}
                </td>
                <td className="px-6 py-3.5">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[l.status]}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    {l.status === "active" && (
                      <>
                        <button
                          onClick={() => handleCopy(l.token, l.id)}
                          className="flex items-center gap-1 rounded-lg border border-[#222753]/15 px-2.5 py-1.5 text-xs font-medium text-[#222753]/70 hover:bg-[#222753]/5"
                        >
                          {copiedId === l.id ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          {copiedId === l.id ? "Copied" : "Copy link"}
                        </button>
                        <button
                          onClick={() => handleRevoke(l.id)}
                          disabled={revokingId === l.id}
                          className="flex items-center gap-1 rounded-lg border border-[#222753]/15 px-2.5 py-1.5 text-xs font-medium text-[#222753]/60 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        >
                          <X className="h-3.5 w-3.5" />
                          Revoke
                        </button>
                      </>
                    )}
                  </div>
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
