import Link from "next/link";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { confirmBookingPayment } from "@/lib/confirmBookingPayment";
import { getLawyer } from "@/lib/lawyers";
import { formatNaira } from "@/lib/pricing";

export default async function BookConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference } = await searchParams;

  if (!reference) {
    return (
      <Result
        icon={<XCircle className="h-10 w-10 text-red-500" />}
        title="Missing payment reference"
        message="We couldn't find a payment reference in the URL. If you completed a payment, check your email for confirmation."
      />
    );
  }

  const { booking, error } = await confirmBookingPayment(reference);

  if (!booking) {
    return (
      <Result
        icon={<XCircle className="h-10 w-10 text-red-500" />}
        title="Booking not found"
        message="We couldn't find a booking for this payment reference."
      />
    );
  }

  const lawyer = booking.lawyer_id ? await getLawyer(booking.lawyer_id) : null;

  if (booking.payment_status !== "paid") {
    return (
      <Result
        icon={<Clock className="h-10 w-10 text-amber-500" />}
        title="Payment pending"
        message={error ?? "We haven't received confirmation of your payment yet. If you completed the payment, this should update shortly — check your email."}
      />
    );
  }

  return (
    <Result
      icon={<CheckCircle2 className="h-10 w-10 text-green-600" />}
      title="Your consultation is confirmed"
      message={`Thank you, ${booking.client_name}. A confirmation has been sent to ${booking.client_email}.`}
    >
      <div className="mt-6 w-full max-w-sm rounded-xl border border-[#222753]/10 bg-white p-5 text-left text-sm">
        {lawyer && (
          <Row label="Lawyer" value={`${lawyer.first_name} ${lawyer.last_name}`} />
        )}
        {booking.duration_minutes && <Row label="Duration" value={`${booking.duration_minutes} minutes`} />}
        {booking.scheduled_at && (
          <Row
            label="Scheduled for"
            value={new Date(booking.scheduled_at).toLocaleString("en-NG", {
              timeZone: "Africa/Lagos",
              dateStyle: "full",
              timeStyle: "short",
            })}
          />
        )}
        <Row label="Total paid" value={formatNaira(booking.amount_kobo)} />
      </div>
      {booking.meeting_url && (
        <a
          href={booking.meeting_url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 rounded-full bg-[#ffda00] px-6 py-3 text-sm font-semibold text-[#222753] hover:brightness-95"
        >
          Join video call
        </a>
      )}
    </Result>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-[#222753]/5 py-2 last:border-0">
      <span className="text-[#222753]/50">{label}</span>
      <span className="font-medium text-[#222753]">{value}</span>
    </div>
  );
}

function Result({
  icon,
  title,
  message,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
      {icon}
      <h1 className="mt-4 text-2xl font-semibold text-[#222753]">{title}</h1>
      <p className="mt-2 max-w-md text-sm text-[#222753]/60">{message}</p>
      {children}
      <Link
        href="/"
        className="mt-8 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white hover:bg-[#222753]/90"
      >
        Return home
      </Link>
    </div>
  );
}
