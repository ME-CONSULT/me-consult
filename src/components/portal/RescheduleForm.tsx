"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { Booking } from "@/lib/bookings";
import type { Lawyer } from "@/lib/lawyers";
import type { LawyerAvailability } from "@/lib/lawyerAvailability";
import { slotsForLawyerDay } from "@/lib/lawyerAvailability";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";

function minSelectableDate(noticeHours: number) {
  const d = new Date(Date.now() + noticeHours * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export default function RescheduleForm({
  booking,
  lawyer,
  availability,
  noticeHours,
  businessDays,
}: {
  booking: Booking;
  lawyer: Lawyer;
  availability: LawyerAvailability[];
  noticeHours: number;
  businessDays: number[];
}) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const dateIsValid = date ? isBusinessDay(date, businessDays) : true;
  const availableTimes =
    date && dateIsValid && booking.duration_minutes
      ? slotsForLawyerDay(availability, lawyer.id, weekdayOf(date), booking.duration_minutes)
      : [];

  async function handleSubmit() {
    if (!date || !time) return;
    setSubmitting(true);
    setError(null);

    const res = await fetch(`/api/portal/bookings/${booking.id}/reschedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, start_time: time }),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: null }));
      setError(data.error ?? "Could not reschedule. Please try again.");
      return;
    }

    setDone(true);
    setTimeout(() => {
      router.push("/portal");
      router.refresh();
    }, 1200);
  }

  if (done) {
    return (
      <div className="rounded-xl border border-[#222753]/10 bg-white p-8 text-center">
        <p className="text-sm font-medium text-green-600">Your booking has been rescheduled.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/portal"
        className="flex items-center gap-1.5 text-sm text-[#222753]/60 hover:text-[#222753]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to bookings
      </Link>

      <div className="rounded-xl border border-[#222753]/10 bg-white p-4 sm:p-6">
        <h1 className="text-lg font-semibold text-[#222753]">Reschedule your consultation</h1>
        <p className="mt-1 text-sm text-[#222753]/50">
          {lawyer.first_name} {lawyer.last_name} · {booking.duration_minutes} minutes
        </p>

        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#222753]">New date</label>
            <input
              type="date"
              min={minSelectableDate(noticeHours)}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setTime(null);
              }}
              className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
            />
            {date && !dateIsValid && (
              <p className="mt-1.5 text-sm text-red-600">That day isn&apos;t available for booking.</p>
            )}
          </div>

          {date && dateIsValid && availableTimes.length === 0 && (
            <p className="text-sm text-[#222753]/60">
              {lawyer.first_name} isn&apos;t available on that day &mdash; try another date.
            </p>
          )}

          {date && dateIsValid && availableTimes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-[#222753]">Time (WAT)</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {availableTimes.map((t) => {
                  const scheduled = combineLagosDateTime(date, t);
                  const ok = meetsNotice(scheduled, noticeHours);
                  return (
                    <button
                      key={t}
                      disabled={!ok}
                      onClick={() => setTime(t)}
                      className={`rounded-lg border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-30 ${
                        time === t
                          ? "border-[#222753] bg-[#222753] text-white"
                          : "border-[#222753]/15 text-[#222753] hover:border-[#222753]/40"
                      }`}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            disabled={!date || !dateIsValid || !time || submitting}
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Saving..." : "Confirm new time"}
          </button>
        </div>
      </div>
    </div>
  );
}
