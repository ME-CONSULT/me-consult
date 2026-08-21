"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Video, Clock, Wallet, ChevronLeft, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import type { Lawyer } from "@/lib/lawyers";
import type { LawyerAvailability } from "@/lib/lawyerAvailability";
import { slotsForLawyerDay } from "@/lib/lawyerAvailability";
import { computeMoneyTotal, formatMoney } from "@/lib/pricing";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";

type Step = "schedule" | "details" | "review" | "done";

const WEEKDAY_LABELS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function toDateStr(d: Date) {
  return d.toISOString().slice(0, 10);
}

function monthGrid(year: number, month: number) {
  const first = new Date(Date.UTC(year, month, 1));
  const firstWeekday = (first.getUTCDay() + 6) % 7; // 0 = Monday
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(Date.UTC(year, month, d)));
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export default function DefaultBookingWizard({
  lawyer,
  durationMinutes,
  feeKobo,
  vatRate,
  noticeHours,
  businessDays,
  availability,
}: {
  lawyer: Lawyer;
  durationMinutes: number;
  feeKobo: number;
  vatRate: number;
  noticeHours: number;
  businessDays: number[];
  availability: LawyerAvailability[];
}) {
  const today = new Date();
  const [step, setStep] = useState<Step>("schedule");
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stubbed, setStubbed] = useState(false);

  const pricing = computeMoneyTotal(feeKobo, vatRate);
  const minDate = toDateStr(new Date(Date.now() + noticeHours * 60 * 60 * 1000));
  const weeks = monthGrid(viewYear, viewMonth);
  const availableTimes = date ? slotsForLawyerDay(availability, lawyer.id, weekdayOf(date), durationMinutes) : [];

  function isSelectable(d: Date) {
    const dStr = toDateStr(d);
    if (dStr < minDate) return false;
    return isBusinessDay(dStr, businessDays);
  }

  function selectDate(d: Date) {
    setDate(toDateStr(d));
    setTime(null);
  }

  async function handleSubmit() {
    if (!date || !time) return;
    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/bookings/default", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        notes,
        date,
        start_time: time,
        terms_accepted: termsAccepted,
      }),
    });

    const data = await res.json().catch(() => ({}));
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error ?? "Could not submit booking. Please try again.");
      return;
    }

    if (data.redirectUrl) {
      window.location.assign(data.redirectUrl);
      return;
    }

    setStubbed(Boolean(data.stubbed));
    setStep("done");
  }

  if (step === "done") {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-600" />
        <h1 className="mt-4 text-2xl font-semibold text-[#222753]">
          {stubbed ? "Request received" : "Booking submitted"}
        </h1>
        <p className="mt-2 max-w-md text-sm text-[#222753]/60">
          {stubbed
            ? "We've received your request. Our team will reach out shortly to arrange payment and confirm your slot."
            : "Check your email for confirmation."}
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white hover:bg-[#222753]/90"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid gap-8 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-[#222753]/10 sm:p-8 lg:grid-cols-[minmax(0,320px)_1fr]">
        {/* Left panel: consultant info, persistent across steps */}
        <div>
          {step !== "schedule" && (
            <button
              onClick={() => setStep(step === "details" ? "schedule" : "details")}
              className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#222753]/15 text-[#222753]/60 hover:bg-[#222753]/5"
              aria-label="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}

          {lawyer.photo_url && (
            <div className="relative h-20 w-20 overflow-hidden rounded-full">
              <Image src={lawyer.photo_url} alt={lawyer.first_name} fill className="object-cover" />
            </div>
          )}

          <div className="mt-4 space-y-3 text-sm text-[#222753]/70">
            <p className="flex items-center gap-2 font-medium text-[#222753]">
              {lawyer.first_name} {lawyer.last_name}
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#222753]/40" />
              {durationMinutes} mins
            </p>
            <p className="flex items-start gap-2">
              <Video className="mt-0.5 h-4 w-4 shrink-0 text-[#222753]/40" />
              Video call details provided upon successful confirmation
            </p>
            <p className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-[#222753]/40" />
              Fee: {formatMoney(pricing.totalMinor, "NGN")}
            </p>
          </div>
        </div>

        {/* Right panel: schedule / details / review */}
        <div>
          {step === "schedule" && (
            <div>
              <h2 className="text-lg font-semibold text-[#222753]">Select Date and Time</h2>

              <div className="mt-4 rounded-2xl border border-[#222753]/10 p-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      const m = viewMonth === 0 ? 11 : viewMonth - 1;
                      setViewYear(viewMonth === 0 ? viewYear - 1 : viewYear);
                      setViewMonth(m);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222753]/15 text-[#222753]/60 hover:bg-[#222753]/5"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="text-sm font-semibold text-[#222753]">
                    {new Date(Date.UTC(viewYear, viewMonth, 1)).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                  <button
                    onClick={() => {
                      const m = viewMonth === 11 ? 0 : viewMonth + 1;
                      setViewYear(viewMonth === 11 ? viewYear + 1 : viewYear);
                      setViewMonth(m);
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#222753]/15 text-[#222753]/60 hover:bg-[#222753]/5"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1 text-center text-xs font-medium text-[#222753]/40">
                  {WEEKDAY_LABELS.map((w) => (
                    <div key={w}>{w}</div>
                  ))}
                </div>

                <div className="mt-1 space-y-1">
                  {weeks.map((week, wi) => (
                    <div key={wi} className="grid grid-cols-7 gap-1">
                      {week.map((d, di) => {
                        if (!d) return <div key={di} />;
                        const dStr = toDateStr(d);
                        const selectable = isSelectable(d);
                        const selected = dStr === date;
                        return (
                          <button
                            key={di}
                            disabled={!selectable}
                            onClick={() => selectDate(d)}
                            className={`aspect-square rounded-full text-sm transition disabled:cursor-not-allowed disabled:text-[#222753]/20 ${
                              selected
                                ? "bg-[#222753] font-semibold text-white"
                                : selectable
                                  ? "text-[#222753] hover:bg-[#222753]/5"
                                  : "text-[#222753]/30"
                            }`}
                          >
                            {d.getUTCDate()}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {date && (
                <div className="mt-5">
                  <p className="text-sm font-medium text-[#222753]">
                    {new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      timeZone: "UTC",
                    })}
                  </p>
                  {availableTimes.length === 0 ? (
                    <p className="mt-2 text-sm text-[#222753]/60">
                      Not available on this day &mdash; try another date.
                    </p>
                  ) : (
                    <div className="mt-2 flex flex-wrap gap-2">
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
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  disabled={!date || !time}
                  onClick={() => setStep("details")}
                  className="rounded-full bg-[#222753] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[#222753]">Your details</h2>
              <div>
                <label className="block text-sm font-medium text-[#222753]">Full name</label>
                <input
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222753]">Email</label>
                <input
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222753]">Phone</label>
                <input
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#222753]">Notes (optional)</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!clientName || !clientEmail}
                  onClick={() => setStep("review")}
                  className="rounded-full bg-[#222753] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === "review" && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-[#222753]">Review &amp; pay</h2>
              <div className="rounded-2xl bg-[#f5f6fa] p-5">
                <Row label="Date" value={`${date} at ${time} WAT`} />
                <Row label="Fee (excl. VAT)" value={formatMoney(pricing.feeMinor, "NGN")} />
                <Row label={`VAT (${vatRate}%)`} value={formatMoney(pricing.vatMinor, "NGN")} />
                <div className="mt-2 flex justify-between border-t border-[#222753]/10 pt-3 text-base font-semibold text-[#222753]">
                  <span>Total</span>
                  <span>{formatMoney(pricing.totalMinor, "NGN")}</span>
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-sm text-[#222753]/70">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5"
                />
                <span>
                  I agree to ME Consult&apos;s{" "}
                  <Link
                    href="/online-consultation-terms"
                    target="_blank"
                    className="underline decoration-[#c9a600] underline-offset-2 hover:text-[#222753]"
                  >
                    Online Consultation Terms &amp; Conditions
                  </Link>
                  , including that booking is confirmed only upon full payment.
                </span>
              </label>

              {error && <p className="text-sm text-red-600">{error}</p>}

              <div className="flex justify-end">
                <button
                  disabled={!termsAccepted || submitting}
                  onClick={handleSubmit}
                  className="flex items-center gap-2 rounded-full bg-[#222753] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
                >
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                  {submitting ? "Submitting..." : "Proceed to payment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-sm text-[#222753]/50">
        Looking for a different consultant or duration?{" "}
        <Link href="/book/other-services" className="underline decoration-[#c9a600] underline-offset-2">
          See other services
        </Link>
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5 text-sm">
      <span className="text-[#222753]/50">{label}</span>
      <span className="font-medium text-[#222753]">{value}</span>
    </div>
  );
}
