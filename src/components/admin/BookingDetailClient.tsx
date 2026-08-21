"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Booking, BookingStatus, PaymentStatus } from "@/lib/bookings";
import { TIER_LABELS, type Lawyer } from "@/lib/lawyers";
import { formatNaira } from "@/lib/pricing";
import { GENERIC_INTAKE_QUESTIONS, SERVICE_INTAKE_QUESTIONS } from "@/lib/intakeQuestions";

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

export default function BookingDetailClient({
  initialBooking,
  lawyers,
  multiLawyerIds = [],
}: {
  initialBooking: Booking;
  lawyers: Lawyer[];
  multiLawyerIds?: string[];
}) {
  const router = useRouter();
  const [booking, setBooking] = useState(initialBooking);
  const [notes, setNotes] = useState(booking.notes ?? "");
  const [title, setTitle] = useState(booking.title ?? "");
  const [meetingUrl, setMeetingUrl] = useState(booking.meeting_url ?? "");
  const [scheduledAt, setScheduledAt] = useState(toLocalInputValue(booking.scheduled_at));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/admin/bookings/pending");
    }
  }

  async function patch(fields: Record<string, unknown>) {
    setError(null);
    setSaving(true);

    const res = await fetch(`/api/admin/bookings/${booking.id}`, {
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
    setBooking(updated);
  }

  const lawyer = lawyers.find((l) => l.id === booking.lawyer_id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-sm text-[#222753]/60 hover:text-[#222753]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <div className="flex gap-2">
          {STATUS_TRANSITIONS[booking.status].map((t) => (
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
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-lg font-semibold text-[#222753]">
                  {booking.title || booking.client_name}
                </h1>
                {booking.title && (
                  <p className="text-sm text-[#222753]/50">{booking.client_name}</p>
                )}
                <p className="text-sm text-[#222753]/50">{booking.client_email}</p>
                {booking.client_phone && (
                  <p className="text-sm text-[#222753]/50">{booking.client_phone}</p>
                )}
              </div>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_BADGE[booking.status]}`}>
                {booking.status}
              </span>
            </div>

            {booking.service && (
              <p className="mt-4 text-sm text-[#222753]/70">
                <span className="text-[#222753]/40">Regarding: </span>
                {booking.service}
              </p>
            )}

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
                  {multiLawyerIds.length > 0 ? "Lawyers" : "Lawyer"}
                </label>
                {multiLawyerIds.length > 0 ? (
                  <p className="mt-1 rounded-lg bg-[#222753]/5 px-3 py-2 text-sm text-[#222753]/70">
                    {multiLawyerIds
                      .map((id) => lawyers.find((l) => l.id === id))
                      .filter((l): l is Lawyer => Boolean(l))
                      .map((l) => `${l.first_name} ${l.last_name}`)
                      .join(", ")}
                  </p>
                ) : (
                  <select
                    value={booking.lawyer_id ?? ""}
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
                )}
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
                  Duration
                </label>
                <p className="mt-1 rounded-lg bg-[#222753]/5 px-3 py-2 text-sm text-[#222753]/70">
                  {booking.duration_minutes ? `${booking.duration_minutes} minutes` : "—"}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-xs font-medium uppercase tracking-wide text-[#222753]/40">
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
          </div>

          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
            <label className="block text-sm font-medium text-[#222753]">Appointment title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Custom title (optional)"
              className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
            />
            <button
              onClick={() => patch({ title: title.trim() || null })}
              disabled={saving}
              className="mt-3 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5 disabled:opacity-50"
            >
              Save title
            </button>
          </div>

          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
            <label className="block text-sm font-medium text-[#222753]">Meeting link</label>
            <input
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              placeholder="https://..."
              className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
            />
            <button
              onClick={() => patch({ meeting_url: meetingUrl.trim() || null })}
              disabled={saving}
              className="mt-3 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5 disabled:opacity-50"
            >
              Save meeting link
            </button>
          </div>

          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
            <label className="block text-sm font-medium text-[#222753]">Notes</label>
            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-[#222753]/15 px-3 py-2 text-sm text-[#222753] outline-none focus:border-[#222753]/40"
            />
            <button
              onClick={() => patch({ notes })}
              disabled={saving}
              className="mt-3 rounded-lg border border-[#222753]/15 px-3 py-1.5 text-sm text-[#222753]/70 hover:bg-[#222753]/5 disabled:opacity-50"
            >
              Save notes
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {(() => {
            const questions = [
              ...GENERIC_INTAKE_QUESTIONS,
              ...(booking.service ? SERVICE_INTAKE_QUESTIONS[booking.service] ?? [] : []),
            ].filter((q) => booking.intake_answers?.[q.id]);

            if (questions.length === 0) return null;

            return (
              <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
                <h2 className="text-sm font-semibold text-[#222753]">Intake answers</h2>
                <div className="mt-3 space-y-2 text-sm">
                  {questions.map((q) => (
                    <div key={q.id} className="flex justify-between gap-4">
                      <span className="text-[#222753]/50">{q.label}</span>
                      <span className="text-right font-medium text-[#222753]">
                        {booking.intake_answers[q.id]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
            <h2 className="text-sm font-semibold text-[#222753]">Payment</h2>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#222753]/50">Fee</span>
                <span className="text-[#222753]">{formatNaira(booking.fee_kobo)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#222753]/50">VAT</span>
                <span className="text-[#222753]">{formatNaira(booking.vat_kobo)}</span>
              </div>
              <div className="flex justify-between border-t border-[#222753]/10 pt-2 font-medium">
                <span className="text-[#222753]/70">Total</span>
                <span className="text-[#222753]">{formatNaira(booking.amount_kobo)}</span>
              </div>
            </div>

            {booking.paystack_reference && (
              <p className="mt-3 text-xs text-[#222753]/40">Ref: {booking.paystack_reference}</p>
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
                    disabled={saving || booking.payment_status === status}
                    className={`rounded-full px-2.5 py-1 text-xs font-medium transition disabled:cursor-default ${
                      booking.payment_status === status
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

          <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6 text-sm">
            <h2 className="text-sm font-semibold text-[#222753]">Record</h2>
            <div className="mt-3 space-y-1.5 text-[#222753]/50">
              <p>Created {new Date(booking.created_at).toLocaleString()}</p>
              <p>Updated {new Date(booking.updated_at).toLocaleString()}</p>
              {booking.terms_accepted_at && (
                <p>T&amp;C accepted {new Date(booking.terms_accepted_at).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
