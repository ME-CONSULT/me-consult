import type { Metadata } from "next";
import { listLawyers } from "@/lib/lawyers";
import { listRates } from "@/lib/consultationRates";
import { listAvailability } from "@/lib/lawyerAvailability";
import { listDurations } from "@/lib/durations";
import { getSettings } from "@/lib/settings";
import { detectCurrency } from "@/lib/geolocation";
import BookingWizard from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Book a Consultation | ME Consult",
  description: "Book and pay for an online legal consultation with ME Consult.",
};

export default async function BookOtherServicesPage() {
  const [lawyers, rates, availability, durations, settings, defaultCurrency] = await Promise.all([
    listLawyers(true),
    listRates(),
    listAvailability(),
    listDurations(),
    getSettings(),
    detectCurrency(),
  ]);

  return (
    <BookingWizard
      lawyers={lawyers}
      rates={rates}
      availability={availability}
      durations={durations}
      vatRate={settings.vat_rate}
      noticeHours={settings.booking_notice_hours}
      businessDays={settings.business_days}
      defaultCurrency={defaultCurrency}
    />
  );
}
