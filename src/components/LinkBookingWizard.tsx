"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Loader2, XCircle } from "lucide-react";
import { TIER_LABELS, type Lawyer } from "@/lib/lawyers";
import type { LawyerAvailability } from "@/lib/lawyerAvailability";
import { slotsForLawyersDay } from "@/lib/lawyerAvailability";
import { computeMoneyTotal, formatMoney } from "@/lib/pricing";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";
import type { BookingLink } from "@/lib/bookingLinks";

type Step = "lawyers" | "schedule" | "details" | "review" | "done";

function minSelectableDate(noticeHours: number) {
  const d = new Date(Date.now() + noticeHours * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export default function LinkBookingWizard({
  link,
  linkUsable,
  lawyers,
  availability,
  vatRate,
  noticeHours,
  businessDays,
}: {
  link: BookingLink;
  linkUsable: { ok: true } | { ok: false; reason: string };
  lawyers: Lawyer[];
  availability: LawyerAvailability[];
  vatRate: number;
  noticeHours: number;
  businessDays: number[];
}) {
  const needsLawyerPicker = lawyers.length > 1;
  const [step, setStep] = useState<Step>(needsLawyerPicker ? "lawyers" : "schedule");
  const [selectedLawyerIds, setSelectedLawyerIds] = useState<string[]>(
    needsLawyerPicker ? [] : lawyers.map((l) => l.id)
  );
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stubbed, setStubbed] = useState(false);

  const pricing = computeMoneyTotal(link.fee_kobo, vatRate);
  const dateIsValid = date ? isBusinessDay(date, businessDays) : true;
  const availableTimes =
    date && dateIsValid && selectedLawyerIds.length > 0
      ? slotsForLawyersDay(availability, selectedLawyerIds, weekdayOf(date), link.duration_minutes)
      : [];

  function toggleLawyer(id: string) {
    setSelectedLawyerIds((prev) => (prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]));
  }

  async function handleSubmit() {
    if (!date || !time) return;
    setError(null);
    setSubmitting(true);

    const res = await fetch(`/api/bookings/link/${link.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        notes,
        lawyer_ids: selectedLawyerIds,
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

  if (!linkUsable.ok) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <XCircle className="h-10 w-10 text-red-500" />
        <h1 className="mt-4 text-2xl font-semibold text-[#222753]">This link isn&apos;t available</h1>
        <p className="mt-2 max-w-md text-sm text-[#222753]/60">{linkUsable.reason}</p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white hover:bg-[#222753]/90"
        >
          Return home
        </Link>
      </div>
    );
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
    <div className="mx-auto max-w-2xl px-6 py-16 lg:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-[#c9a600]">
        Online Consultation
      </p>
      <h1 className="mt-2 text-3xl font-bold text-[#222753]">{link.title || "Book a Consultation"}</h1>
      <p className="mt-2 text-sm text-[#222753]/60">
        {link.duration_minutes} minutes &middot; {formatMoney(pricing.totalMinor, "NGN")} incl. VAT
      </p>

      {step !== "lawyers" && (
        <button
          onClick={() => {
            setError(null);
            if (step === "schedule" && needsLawyerPicker) setStep("lawyers");
            else if (step === "details") setStep("schedule");
            else if (step === "review") setStep("details");
          }}
          className="mt-6 flex items-center gap-1 text-sm text-[#222753]/60 hover:text-[#222753]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {step === "lawyers" && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-[#222753]/60">
            Select which consultant(s) you&apos;d like in this session.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {lawyers.map((l) => {
              const selected = selectedLawyerIds.includes(l.id);
              return (
                <button
                  key={l.id}
                  onClick={() => toggleLawyer(l.id)}
                  className={`overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 transition ${
                    selected ? "ring-2 ring-[#222753]" : "ring-[#222753]/10 hover:shadow-md"
                  }`}
                >
                  {l.photo_url && (
                    <div className="relative aspect-[4/5] bg-[#222753]/5">
                      <Image src={l.photo_url} alt={l.first_name} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="font-semibold text-[#222753]">
                      {l.first_name} {l.last_name}
                    </p>
                    <p className="text-xs text-[#c9a600]">{TIER_LABELS[l.tier]}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <button
            disabled={selectedLawyerIds.length === 0}
            onClick={() => setStep("schedule")}
            className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === "schedule" && (
        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-[#222753]">Date</label>
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
              No time works for everyone selected on that day &mdash; try another date.
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

          <button
            disabled={!date || !dateIsValid || !time}
            onClick={() => setStep("details")}
            className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === "details" && (
        <div className="mt-6 space-y-4">
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
          <button
            disabled={!clientName || !clientEmail}
            onClick={() => setStep("review")}
            className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === "review" && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/10">
            <Row
              label="Consultant(s)"
              value={lawyers
                .filter((l) => selectedLawyerIds.includes(l.id))
                .map((l) => `${l.first_name} ${l.last_name}`)
                .join(", ")}
            />
            <Row label="Duration" value={`${link.duration_minutes} minutes`} />
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

          <button
            disabled={!termsAccepted || submitting}
            onClick={handleSubmit}
            className="hover-glow flex items-center gap-2 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Submitting..." : "Proceed to payment"}
          </button>
        </div>
      )}
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
