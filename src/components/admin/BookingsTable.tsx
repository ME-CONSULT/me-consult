"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import type { Booking, BookingStatus } from "@/lib/bookings";

function formatNaira(kobo: number | null) {
  if (kobo === null) return "—";
  return `₦${(kobo / 100).toLocaleString()}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function BookingsTable({
  initialBookings,
  advanceTo,
  advanceLabel,
  emptyLabel,
}: {
  initialBookings: Booking[];
  advanceTo: BookingStatus;
  advanceLabel: string;
  emptyLabel: string;
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(id: string, status: BookingStatus) {
    setError(null);
    setUpdatingId(id);

    const res = await fetch(`/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setUpdatingId(null);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not update booking");
      return;
    }

    setBookings((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="space-y-3">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="overflow-hidden rounded-xl border border-[#222753]/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#222753]/10 text-left text-xs uppercase tracking-wide text-[#222753]/40">
              <th className="px-6 py-3 font-medium">Client</th>
              <th className="px-6 py-3 font-medium">Service</th>
              <th className="px-6 py-3 font-medium">Scheduled</th>
              <th className="px-6 py-3 font-medium">Payment</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-6 text-center text-[#222753]/40">
                  {emptyLabel}
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-[#222753]/5 last:border-0">
                <td className="px-6 py-3.5">
                  <Link
                    href={`/admin/bookings/${b.id}`}
                    className="font-medium text-[#222753] hover:underline"
                  >
                    {b.client_name}
                  </Link>
                  <p className="text-xs text-[#222753]/50">{b.client_email}</p>
                </td>
                <td className="px-6 py-3.5 text-[#222753]/70">{b.service ?? "—"}</td>
                <td className="px-6 py-3.5 text-[#222753]/70">{formatDate(b.scheduled_at)}</td>
                <td className="px-6 py-3.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      b.payment_status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-[#222753]/5 text-[#222753]/60"
                    }`}
                  >
                    {formatNaira(b.amount_kobo)} · {b.payment_status}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button
                      onClick={() => updateStatus(b.id, advanceTo)}
                      disabled={updatingId === b.id}
                      className="flex items-center gap-1 rounded-lg bg-[#ffda00] px-2.5 py-1.5 text-xs font-medium text-[#222753] transition hover:brightness-95 disabled:opacity-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      {advanceLabel}
                    </button>
                    <button
                      onClick={() => updateStatus(b.id, "cancelled")}
                      disabled={updatingId === b.id}
                      className="flex items-center gap-1 rounded-lg border border-[#222753]/15 px-2.5 py-1.5 text-xs font-medium text-[#222753]/60 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
