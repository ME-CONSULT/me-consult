import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getClientByAuthUserId } from "@/lib/clients";
import { getBooking, updateBooking, isSlotTaken } from "@/lib/bookings";
import { getLawyer } from "@/lib/lawyers";
import { getSettings } from "@/lib/settings";
import { listAvailability, slotsForLawyerDay } from "@/lib/lawyerAvailability";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";
import { sendRescheduleConfirmationEmail } from "@/lib/email/client";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await getClientByAuthUserId(sessionUser.id);
  if (!client) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking || booking.client_id !== client.id) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }
  if (booking.status !== "pending" && booking.status !== "active") {
    return NextResponse.json({ error: "This booking can't be rescheduled" }, { status: 400 });
  }
  if (!booking.lawyer_id || !booking.duration_minutes) {
    return NextResponse.json({ error: "This booking can't be rescheduled online" }, { status: 400 });
  }

  const { date, start_time } = await request.json();
  if (typeof date !== "string" || typeof start_time !== "string") {
    return NextResponse.json({ error: "Date and time are required" }, { status: 400 });
  }

  const lawyer = await getLawyer(booking.lawyer_id);
  if (!lawyer || !lawyer.active) {
    return NextResponse.json({ error: "This consultant is no longer available" }, { status: 400 });
  }

  const settings = await getSettings();
  if (!isBusinessDay(date, settings.business_days)) {
    return NextResponse.json({ error: "That day isn't available for booking" }, { status: 400 });
  }

  const availability = await listAvailability();
  const validSlots = slotsForLawyerDay(availability, lawyer.id, weekdayOf(date), booking.duration_minutes);
  if (!validSlots.includes(start_time)) {
    return NextResponse.json({ error: "That time isn't bookable for this duration" }, { status: 400 });
  }

  const scheduledAt = combineLagosDateTime(date, start_time);
  if (!meetsNotice(scheduledAt, settings.booking_notice_hours)) {
    return NextResponse.json(
      { error: `Rescheduling needs at least ${settings.booking_notice_hours} hours' notice` },
      { status: 400 }
    );
  }

  if (await isSlotTaken(lawyer.id, scheduledAt.toISOString())) {
    return NextResponse.json({ error: "That slot is no longer available" }, { status: 409 });
  }

  const updated = await updateBooking(booking.id, { scheduled_at: scheduledAt.toISOString() });

  sendRescheduleConfirmationEmail(updated).catch((e) =>
    console.error("sendRescheduleConfirmationEmail failed:", e)
  );

  return NextResponse.json({ booking: updated });
}
