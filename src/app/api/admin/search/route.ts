import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { searchBookings } from "@/lib/bookings";
import { searchAdminUsers } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();

  if (q.length < 2) {
    return NextResponse.json({ bookings: [], admins: [] });
  }

  const [bookings, admins] = await Promise.all([searchBookings(q), searchAdminUsers(q)]);

  return NextResponse.json({
    bookings: bookings.map((b) => ({
      id: b.id,
      clientName: b.client_name,
      clientEmail: b.client_email,
      status: b.status,
    })),
    admins,
  });
}
