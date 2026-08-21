import { listBookings } from "@/lib/bookings";
import BookingsTable from "@/components/admin/BookingsTable";

export default async function AdminPendingBookingsPage() {
  const bookings = await listBookings("pending");

  return (
    <BookingsTable
      initialBookings={bookings}
      advanceTo="active"
      advanceLabel="Mark active"
      emptyLabel="No pending bookings."
    />
  );
}
