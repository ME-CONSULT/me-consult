import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { getLawyer } from "@/lib/lawyers";
import { listAvailability } from "@/lib/lawyerAvailability";
import DefaultBookingWizard from "@/components/DefaultBookingWizard";

export const metadata: Metadata = {
  title: "Book a Consultation | ME Consult",
  description: "Book and pay for an online legal consultation with ME Consult.",
};

// Depends on admin-configurable settings (default consultant/duration/price)
// that can change at any time — must not be statically cached at build time.
export const dynamic = "force-dynamic";

export default async function BookPage() {
  const settings = await getSettings();

  const lawyer =
    settings.default_lawyer_id && settings.default_duration_minutes && settings.default_fee_kobo != null
      ? await getLawyer(settings.default_lawyer_id)
      : null;

  if (!lawyer || !settings.default_duration_minutes || settings.default_fee_kobo == null) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold text-[#222753]">Book a consultation</h1>
        <p className="mt-2 max-w-md text-sm text-[#222753]/60">
          Choose from our full range of consultants and services.
        </p>
        <Link
          href="/book/other-services"
          className="mt-8 rounded-full bg-[#222753] px-6 py-3 text-sm font-semibold text-white hover:bg-[#222753]/90"
        >
          See all services
        </Link>
      </div>
    );
  }

  const availability = await listAvailability();

  return (
    <DefaultBookingWizard
      lawyer={lawyer}
      durationMinutes={settings.default_duration_minutes}
      feeKobo={settings.default_fee_kobo}
      vatRate={settings.vat_rate}
      noticeHours={settings.booking_notice_hours}
      businessDays={settings.business_days}
      availability={availability}
    />
  );
}
