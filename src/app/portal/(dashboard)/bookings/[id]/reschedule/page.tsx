import { notFound } from "next/navigation";
import { getSessionUser } from "@/lib/supabase/server";
import { getClientByAuthUserId } from "@/lib/clients";
import { getBooking } from "@/lib/bookings";
import { getLawyer } from "@/lib/lawyers";
import { getSettings } from "@/lib/settings";
import { listAvailability } from "@/lib/lawyerAvailability";
import RescheduleForm from "@/components/portal/RescheduleForm";

export default async function PortalRescheduleBookingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sessionUser = await getSessionUser();
  const client = sessionUser ? await getClientByAuthUserId(sessionUser.id) : null;
  if (!client) notFound();

  const booking = await getBooking(id);
  if (!booking || booking.client_id !== client.id) notFound();
  if (!booking.lawyer_id || !booking.duration_minutes) notFound();

  const [lawyer, settings, availability] = await Promise.all([
    getLawyer(booking.lawyer_id),
    getSettings(),
    listAvailability(),
  ]);

  if (!lawyer) notFound();

  return (
    <RescheduleForm
      booking={booking}
      lawyer={lawyer}
      availability={availability}
      noticeHours={settings.booking_notice_hours}
      businessDays={settings.business_days}
    />
  );
}
