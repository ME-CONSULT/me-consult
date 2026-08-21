"use client";

import { useState } from "react";
import { X } from "lucide-react";
import type { Booking, BookingStatus, PaymentStatus } from "@/lib/bookings";
import { TIER_LABELS, type Lawyer } from "@/lib/lawyers";
import { formatNaira } from "@/lib/pricing";

const STATUS_TRANSITIONS: Record<BookingStatus, { to: BookingStatus; label: string }[]> = {
  pending: [
    { to: "active", label: "Mark active" },
    { to: "cancelled", label: "Cancel" },
  ],
  active: [
    { to: "completed", label: "Mark completed" },
    { to: "cancelled", label: "Cancel" },
  ],
  completed: [],
  cancelled: [],
};

const STATUS_BADGE: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  active: "bg-green-100 text-green-700",
  completed: "bg-[#222753]/10 text-[#222753]/60",
  cancelled: "bg-red-100 text-red-700",
};

const PAYMENT_OPTIONS: PaymentStatus[] = ["unpaid", "paid", "refunded"];

function toLocalInputValue(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function BookingDrawer({
  booking,
  lawyers,
  onClose,
  onUpdated,
}: {
  booking: Booking | null;
  lawyers: Lawyer[];
  onClose: () => void;
  onUpdated: (booking: Booking) => void;
}) {
  const open = booking !== null;

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity ${
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-[#171b3d]/40" onClick={onClose} />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col overflow-y-auto bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {booking && (
          <BookingDrawerContent
            key={booking.id}
            booking={booking}
            lawyers={lawyers}
            onClose={onClose}
            onUpdated={onUpdated}
          />
        )}
      </div>
    </div>
  );
}

function BookingDrawerContent({
  booking,
  lawyers,
  onClose,
  onUpdated,
}: {
  booking: Booking;
  lawyers: Lawyer[];
  onClose: () => void;
  onUpdated: (booking: Booking) => void;
}) {
  const [notes, setNotes] = useState(booking.notes ?? "");
  const [scheduledAt, setScheduledAt] = useState(toLocalInputValue(booking.scheduled_at));
  const [current, setCurrent] = useState(booking);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function patch(fields: Record<string, unknown>) {
    setError(null);
    setSaving(true);

    const res = await fetch(`/api/admin/bookings/${current.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not update booking");
      return;
    }

    const { booking: updated } = await res.json();
    setCurrent(updated);
    onUpdated(updated);
  }

  const lawyer = lawyers.find((l) => l.id === current.lawyer_id);

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#222753]/10 px-4 py-4 sm:px-6">
        <h2 className="text-sm font-semibold text-[#222753]">Booking details</h2>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-[#222753]/40 hover:bg-[#222753]/5"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 space-y-5 p-4 sm:p-6">
        {error && <p className="text-sm text-red-600">{error}</p>}

        <div>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-[#222753]">{current.client_name}</p>
              <p className="text-sm text-[#222753]/50">{current.client_email}</p>
              {current.client_phone && (
                <p className="text-sm text-[#222753]/50">{current.client_phone}</p>
              )}
            </div>
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[current.status]}`}>
              {current.status}
            </span>
          </div>

          {current.service && (
            <p className="mt-3 text-sm text-[#222753]/70">
              <span className="text-[#222753]/40">Regarding: </span>
              {current.service}
            </p>
          )}

          {STATUS_TRANSITIONS[current.status].length > 0 && (
            <div className="mt-4 flex gap-2">
              {STATUS_TRANSITIONS[current.status].map((t) => (
                <button
                  key={t.to}
                  onClick={() => patch({ status: t.to })}
                  disabled={saving}
                  className="rounded-lg bg-[#ffda00] px-3 py-1.5 text-sm font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-[#222753]/10 pt-5">
          <label className="block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
            Lawyer
          </label>
          <select
            value={current.lawyer_id ?? ""}
            onChange={(e) => patch({ lawyer_id: e.target.value || null })}
            disabled={saving}
            className="mt-1 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
          >
            <option value="">Unassigned</option>
            {lawyers.map((l) => (
              <option key={l.id} value={l.id}>
                {l.first_name} {l.last_name} ({TIER_LABELS[l.tier]})
              </option>
            ))}
          </select>

          <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
            Duration
          </label>
          <p className="mt-1 rounded-lg bg-[#222753]/5 px-3 py-2 text-sm text-[#222753]/70">
            {current.duration_minutes ? `${current.duration_minutes} minutes` : "—"}
          </p>

          <label className="mt-4 block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
            Scheduled for
          </label>
          <div className="mt-1 flex gap-2">
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="flex-1 rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
            />
            <button
              onClick={() =>
                patch({ scheduled_at: scheduledAt ? new Date(scheduledAt).toISOString() : null })
              }
              disabled={saving}
              className="rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753]/70 hover:bg-[#222753]/5 disabled:opacity-50"
            >
              Save
            </button>
          </div>
          {lawyer && (
            <p className="mt-1 text-xs text-[#222753]/40">
              Changing this checks {lawyer.first_name}&apos;s calendar for conflicts.
            </p>
          )}
        </div>

        <div className="border-t border-[#222753]/10 pt-5">
          <label className="block text-sm font-medium text-[#222753]">Notes</label>
          <textarea
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
          />
          <button
            onClick={() => patch({ notes })}
            disabled={saving}
            className="mt-2 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5 disabled:opacity-50"
          >
            Save notes
          </button>
        </div>

        <div className="border-t border-[#222753]/10 pt-5">
          <h3 className="text-sm font-semibold text-[#222753]">Payment</h3>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#222753]/50">Fee</span>
              <span className="text-[#222753]">{formatNaira(current.fee_kobo)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#222753]/50">VAT</span>
              <span className="text-[#222753]">{formatNaira(current.vat_kobo)}</span>
            </div>
            <div className="flex justify-between border-t border-[#222753]/10 pt-2 font-medium">
              <span className="text-[#222753]/70">Total</span>
              <span className="text-[#222753]">{formatNaira(current.amount_kobo)}</span>
            </div>
          </div>

          {current.paystack_reference && (
            <p className="mt-3 text-xs text-[#222753]/40">Ref: {current.paystack_reference}</p>
          )}

          <div className="mt-4">
            <label className="block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
              Status
            </label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {PAYMENT_OPTIONS.map((status) => (
                <button
                  key={status}
                  onClick={() => patch({ payment_status: status })}
                  disabled={saving || current.payment_status === status}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition disabled:cursor-default ${
                    current.payment_status === status
                      ? "bg-[#222753] text-white"
                      : "bg-[#222753]/5 text-[#222753]/60 hover:bg-[#222753]/10"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#222753]/10 pt-5 text-sm">
          <h3 className="text-sm font-semibold text-[#222753]">Record</h3>
          <div className="mt-3 space-y-1.5 text-[#222753]/50">
            <p>Created {new Date(current.created_at).toLocaleString()}</p>
            <p>Updated {new Date(current.updated_at).toLocaleString()}</p>
            {current.terms_accepted_at && (
              <p>T&amp;C accepted {new Date(current.terms_accepted_at).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
