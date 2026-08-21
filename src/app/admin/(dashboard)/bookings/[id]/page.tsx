import { notFound } from "next/navigation";
import { getBooking } from "@/lib/bookings";
import { listLawyers } from "@/lib/lawyers";
import { listLawyerIdsForBooking } from "@/lib/bookingLawyers";
import BookingDetailClient from "@/components/admin/BookingDetailClient";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [booking, lawyers] = await Promise.all([getBooking(id), listLawyers()]);

  if (!booking) notFound();

  const extraLawyerIds = booking.lawyer_id ? [] : await listLawyerIdsForBooking(booking.id);

  return (
    <BookingDetailClient initialBooking={booking} lawyers={lawyers} multiLawyerIds={extraLawyerIds} />
  );
}
