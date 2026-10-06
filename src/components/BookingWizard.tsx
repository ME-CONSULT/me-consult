"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { TIER_LABELS, type Lawyer } from "@/lib/lawyers";
import type { ConsultationRate } from "@/lib/consultationRates";
import type { LawyerAvailability } from "@/lib/lawyerAvailability";
import { slotsForLawyerDay } from "@/lib/lawyerAvailability";
import type { Duration } from "@/lib/durations";
import {
  computeMoneyTotal,
  formatMoney,
  CURRENCY_RATE_FIELD,
  type Currency,
} from "@/lib/pricing";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";
import { ADVISORY_SERVICES } from "@/lib/advisoryServices";
import {
  GENERIC_INTAKE_QUESTIONS,
  SERVICE_INTAKE_QUESTIONS,
  type IntakeQuestion,
} from "@/lib/intakeQuestions";

const CURRENCIES: Currency[] = ["NGN", "USD", "GBP"];
type Step = "lawyer" | "duration" | "schedule" | "details" | "review" | "done";
const STEP_ORDER: Step[] = ["lawyer", "duration", "schedule", "details", "review"];

function minSelectableDate(noticeHours: number) {
  const d = new Date(Date.now() + noticeHours * 60 * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

/** Price in the requested currency, falling back to NGN (always set) if
 * that currency hasn't been priced for this lawyer/duration yet. */
function priceFor(rate: ConsultationRate | undefined, currency: Currency, vatRate: number) {
  if (!rate) return null;

  const field = CURRENCY_RATE_FIELD[currency];
  const minor = rate[field];
  const effectiveCurrency = minor != null ? currency : "NGN";
  const effectiveMinor = minor ?? rate.fee_kobo;
  if (effectiveMinor == null) return null;

  return { currency: effectiveCurrency, ...computeMoneyTotal(effectiveMinor, vatRate) };
}

export default function BookingWizard({
  lawyers,
  rates,
  availability,
  durations,
  vatRate,
  noticeHours,
  businessDays,
  defaultCurrency,
}: {
  lawyers: Lawyer[];
  rates: ConsultationRate[];
  availability: LawyerAvailability[];
  durations: Duration[];
  vatRate: number;
  noticeHours: number;
  businessDays: number[];
  defaultCurrency: Currency;
}) {
  const [step, setStep] = useState<Step>("lawyer");
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [lawyerId, setLawyerId] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");
  const [intakeAnswers, setIntakeAnswers] = useState<Record<string, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stubbed, setStubbed] = useState(false);

  const lawyer = lawyers.find((l) => l.id === lawyerId) ?? null;
  const rate =
    lawyer && duration
      ? rates.find((r) => r.lawyer_id === lawyer.id && r.duration_minutes === duration)
      : undefined;
  const pricing = priceFor(rate, currency, vatRate);
  const pricedDurations = lawyer
    ? durations.filter(({ minutes }) =>
        priceFor(
          rates.find((r) => r.lawyer_id === lawyer.id && r.duration_minutes === minutes),
          currency,
          vatRate,
        ),
      )
    : [];
  const availableTimes =
    lawyer && duration && date
      ? slotsForLawyerDay(availability, lawyer.id, weekdayOf(date), duration)
      : [];

  const dateIsValid = date ? isBusinessDay(date, businessDays) : true;

  function setAnswer(id: string, value: string) {
    setIntakeAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function goTo(next: Step) {
    setError(null);
    setStep(next);
  }

  function stepIndex(s: Step) {
    return STEP_ORDER.indexOf(s);
  }

  function back() {
    const idx = stepIndex(step);
    if (idx > 0) goTo(STEP_ORDER[idx - 1]);
  }

  async function handleSubmit() {
    if (!lawyer || !duration || !date || !time) return;

    setError(null);
    setSubmitting(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        service: service || null,
        notes,
        intake_answers: intakeAnswers,
        lawyer_id: lawyer.id,
        duration_minutes: duration,
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
            ? "We've received your request. Online payment isn't available on the site just yet, so our team will reach out shortly to arrange payment and confirm your slot."
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
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#c9a600]">
            Online Consultation
          </p>
          <h1 className="mt-2 text-3xl font-bold text-[#222753]">Book a Consultation</h1>
        </div>
        <div className="flex gap-1 pt-1">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`rounded-lg px-2 py-1 text-xs font-medium transition ${
                currency === c
                  ? "bg-[#222753] text-white"
                  : "text-[#222753]/40 hover:text-[#222753]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm text-[#222753]/60">
        Step {stepIndex(step) + 1} of {STEP_ORDER.length}
      </p>

      {step !== "lawyer" && (
        <button
          onClick={back}
          className="mt-6 flex items-center gap-1 text-sm text-[#222753]/60 hover:text-[#222753]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {step === "lawyer" && (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {lawyers.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLawyerId(l.id);
                goTo("duration");
              }}
              className="overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-[#222753]/10 transition hover:shadow-md"
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
          ))}
        </div>
      )}

      {step === "duration" && lawyer && pricedDurations.length === 0 && (
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/10">
          <p className="font-semibold text-[#222753]">
            {`Online booking with ${lawyer.first_name} isn't open yet`}
          </p>
          <p className="mt-2 text-sm leading-6 text-[#222753]/60">
            Get in touch and our team will arrange a consultation with {lawyer.first_name} for
            you, or go back and choose another member of our team.
          </p>
          <Link
            href="/contact"
            className="hover-glow mt-5 inline-block rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90"
          >
            Contact us
          </Link>
        </div>
      )}

      {step === "duration" && lawyer && pricedDurations.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {durations.map(({ minutes: d }) => {
            const r = rates.find((r) => r.lawyer_id === lawyer.id && r.duration_minutes === d);
            const price = priceFor(r, currency, vatRate);
            if (!price) return null;
            return (
              <button
                key={d}
                onClick={() => {
                  setDuration(d);
                  goTo("schedule");
                }}
                className="rounded-xl border border-[#222753]/10 bg-white p-5 text-left transition hover:border-[#222753]/30"
              >
                <p className="font-semibold text-[#222753]">{d} minutes</p>
                <p className="mt-1 text-sm text-[#222753]/60">
                  {formatMoney(price.totalMinor, price.currency)} incl. VAT
                </p>
              </button>
            );
          })}
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
              {lawyer?.first_name} isn&apos;t available on that day &mdash; try another date.
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
            onClick={() => goTo("details")}
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
            <label className="block text-sm font-medium text-[#222753]">
              What would you like to discuss? (optional)
            </label>
            <select
              value={service}
              onChange={(e) => {
                const next = e.target.value;
                const prevQuestions = SERVICE_INTAKE_QUESTIONS[service] ?? [];
                setIntakeAnswers((cur) => {
                  const copy = { ...cur };
                  for (const q of prevQuestions) delete copy[q.id];
                  return copy;
                });
                setService(next);
              }}
              className="mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]"
            >
              <option value="">Select a topic</option>
              {ADVISORY_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {GENERIC_INTAKE_QUESTIONS.map((q) => (
            <IntakeField
              key={q.id}
              question={q}
              value={intakeAnswers[q.id] ?? ""}
              onChange={(v) => setAnswer(q.id, v)}
            />
          ))}

          {service &&
            SERVICE_INTAKE_QUESTIONS[service]?.map((q) => (
              <IntakeField
                key={q.id}
                question={q}
                value={intakeAnswers[q.id] ?? ""}
                onChange={(v) => setAnswer(q.id, v)}
              />
            ))}

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
            onClick={() => goTo("review")}
            className="hover-glow rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#222753]/90 disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === "review" && lawyer && duration && pricing && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-[#222753]/10">
            <Row label="Lawyer" value={`${lawyer.first_name} ${lawyer.last_name}`} />
            <Row label="Duration" value={`${duration} minutes`} />
            <Row label="Date" value={`${date} at ${time} WAT`} />
            {service && <Row label="Regarding" value={service} />}
            <Row label="Fee (excl. VAT)" value={formatMoney(pricing.feeMinor, pricing.currency)} />
            <Row label={`VAT (${vatRate}%)`} value={formatMoney(pricing.vatMinor, pricing.currency)} />
            <div className="mt-2 flex justify-between border-t border-[#222753]/10 pt-3 text-base font-semibold text-[#222753]">
              <span>Total</span>
              <span>{formatMoney(pricing.totalMinor, pricing.currency)}</span>
            </div>
            {pricing.currency !== "NGN" && (
              <p className="mt-3 text-xs text-[#222753]/40">
                Shown in {pricing.currency} for reference &mdash; you&apos;ll be charged in
                Nigerian Naira (NGN) at checkout.
              </p>
            )}
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

function IntakeField({
  question,
  value,
  onChange,
}: {
  question: IntakeQuestion;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputClass =
    "mt-1.5 w-full rounded-lg border border-[#222753]/20 px-4 py-2.5 text-sm text-[#222753] outline-none focus:border-[#222753]";

  return (
    <div>
      <label className="block text-sm font-medium text-[#222753]">{question.label}</label>
      {question.type === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="">Select an option</option>
          {question.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : question.type === "textarea" ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} />
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
