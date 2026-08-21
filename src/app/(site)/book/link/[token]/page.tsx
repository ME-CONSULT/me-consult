import { notFound } from "next/navigation";
import { getBookingLinkByToken, isBookingLinkUsable } from "@/lib/bookingLinks";
import { listLawyers } from "@/lib/lawyers";
import { listAvailability } from "@/lib/lawyerAvailability";
import { getSettings } from "@/lib/settings";
import LinkBookingWizard from "@/components/LinkBookingWizard";

export default async function BookLinkPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const result = await getBookingLinkByToken(token);

  if (!result) notFound();

  const { link, lawyerIds } = result;
  const usable = isBookingLinkUsable(link);

  const [allLawyers, availability, settings] = await Promise.all([
    listLawyers(true),
    listAvailability(),
    getSettings(),
  ]);

  const lawyers = allLawyers.filter((l) => lawyerIds.includes(l.id));

  return (
    <LinkBookingWizard
      link={link}
      linkUsable={usable}
      lawyers={lawyers}
      availability={availability}
      vatRate={settings.vat_rate}
      noticeHours={settings.booking_notice_hours}
      businessDays={settings.business_days}
    />
  );
}
