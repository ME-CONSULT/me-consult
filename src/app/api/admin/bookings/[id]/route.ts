import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import {
  getBooking,
  updateBooking,
  deleteBooking,
  SlotUnavailableError,
  type BookingStatus,
  type PaymentStatus,
} from "@/lib/bookings";
import { sendMeetingLinkEmail } from "@/lib/email/client";
import { cancelMeetForBooking, rescheduleMeetForBooking } from "@/lib/googleMeet";

const VALID_STATUSES: BookingStatus[] = ["pending", "active", "completed", "cancelled"];
const VALID_PAYMENT_STATUSES: PaymentStatus[] = ["unpaid", "paid", "refunded"];

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const booking = await getBooking(id);
  if (!booking) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ booking });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const fields: Record<string, unknown> = {};

  const existing = await getBooking(id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const meetingUrlNewlySet =
    typeof body.meeting_url === "string" &&
    body.meeting_url.trim() &&
    body.meeting_url.trim() !== existing.meeting_url;
  // "Resend to client" re-emails an unchanged link.
  const sendMeetingEmail =
    meetingUrlNewlySet ||
    (body.resend_meeting_email === true && typeof body.meeting_url === "string" && body.meeting_url.trim());

  if (body.status !== undefined) {
    if (!VALID_STATUSES.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    fields.status = body.status;
  }

  if (body.payment_status !== undefined) {
    if (!VALID_PAYMENT_STATUSES.includes(body.payment_status)) {
      return NextResponse.json({ error: "Invalid payment status" }, { status: 400 });
    }
    fields.payment_status = body.payment_status;
  }

  if (body.notes !== undefined) fields.notes = body.notes;
  if (body.title !== undefined) fields.title = body.title;
  if (body.meeting_url !== undefined) fields.meeting_url = body.meeting_url;
  if (body.lawyer_id !== undefined) fields.lawyer_id = body.lawyer_id;
  if (body.scheduled_at !== undefined) fields.scheduled_at = body.scheduled_at;

  try {
    const booking = await updateBooking(id, fields);

    if (fields.status === "cancelled" && existing.status !== "cancelled") {
      await cancelMeetForBooking(id).catch((e) => console.error("cancelMeetForBooking failed:", e));
    } else if (
      fields.scheduled_at !== undefined &&
      booking.scheduled_at !== existing.scheduled_at
    ) {
      await rescheduleMeetForBooking(booking).catch((e) =>
        console.error("rescheduleMeetForBooking failed:", e)
      );
    }

    if (sendMeetingEmail) {
      sendMeetingLinkEmail(booking).catch((e) => console.error("sendMeetingLinkEmail failed:", e));
    }

    return NextResponse.json({ booking });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await deleteBooking(id);
  await cancelMeetForBooking(id).catch((e) => console.error("cancelMeetForBooking failed:", e));
  return NextResponse.json({ ok: true });
}
