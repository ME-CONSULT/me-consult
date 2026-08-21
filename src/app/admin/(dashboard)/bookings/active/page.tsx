import { listBookings } from "@/lib/bookings";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminActiveBookingsPage() {
  const bookings = await listBookings("active");

  return (
    <BookingsTable
      initialBookings={bookings}
      advanceTo="completed"
      advanceLabel="Mark completed"
      emptyLabel="No active bookings."
    />
  );
}
