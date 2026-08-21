import { notFound } from "next/navigation";
import { getBooking } from "@/lib/bookings";
import { listLawyers } from "@/lib/lawyers";
import BookingDetailClient from "@/components/admin/BookingDetailClient";

export default async function AdminBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [booking, lawyers] = await Promise.all([getBooking(id), listLawyers()]);

  if (!booking) notFound();

  return <BookingDetailClient initialBooking={booking} lawyers={lawyers} />;
}
