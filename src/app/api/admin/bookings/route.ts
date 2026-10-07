import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/server";
import { getUserRole, isStaffRole } from "@/lib/roles";
import { listBookings, createBooking, SlotUnavailableError, type BookingStatus } from "@/lib/bookings";
import { upsertClientForBooking } from "@/lib/clients";

const VALID_STATUSES: BookingStatus[] = ["pending", "active", "completed", "cancelled"];

export async function GET(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  if (status && !VALID_STATUSES.includes(status as BookingStatus)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const bookings = await listBookings(status as BookingStatus | undefined);
  return NextResponse.json({ bookings });
}

export async function POST(request: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !isStaffRole(getUserRole(sessionUser))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { client_name, client_email } = body;

  if (typeof client_name !== "string" || !client_name.trim()) {
    return NextResponse.json({ error: "Client name is required" }, { status: 400 });
  }
  if (typeof client_email !== "string" || !client_email.includes("@")) {
    return NextResponse.json({ error: "A valid client email is required" }, { status: 400 });
  }

  const amountNaira = Number(body.amount_naira);

  const trimmedName = client_name.trim();
  const normalizedEmail = client_email.trim().toLowerCase();
  const trimmedPhone = body.client_phone?.trim() || null;
  const client = await upsertClientForBooking(normalizedEmail, trimmedName, trimmedPhone);

  try {
    const booking = await createBooking({
      client_name: trimmedName,
      client_email: normalizedEmail,
      client_phone: trimmedPhone,
      client_id: client.id,
      service: body.service || null,
      notes: body.notes?.trim() || null,
      title: typeof body.title === "string" ? body.title.trim() || null : null,
      scheduled_at: body.scheduled_at || null,
      lawyer_id: body.lawyer_id || null,
      duration_minutes: Number.isFinite(body.duration_minutes) ? body.duration_minutes : null,
      fee_kobo: Number.isFinite(body.fee_kobo) ? body.fee_kobo : null,
      vat_kobo: Number.isFinite(body.vat_kobo) ? body.vat_kobo : null,
      amount_kobo:
        Number.isFinite(amountNaira) && amountNaira > 0 ? Math.round(amountNaira * 100) : null,
      created_by: sessionUser.id,
    });

    return NextResponse.json({ booking });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }
}
