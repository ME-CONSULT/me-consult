import { NextResponse } from "next/server";
import { createBooking, updateBooking, isSlotTaken, SlotUnavailableError } from "@/lib/bookings";
import { upsertClientForBooking } from "@/lib/clients";
import { isEmailBlocked } from "@/lib/blockedEmails";
import { getSettings } from "@/lib/settings";
import { getLawyer } from "@/lib/lawyers";
import { listAvailability, slotsForLawyerDay } from "@/lib/lawyerAvailability";
import { computeTotal } from "@/lib/pricing";
import { combineLagosDateTime, isBusinessDay, meetsNotice, weekdayOf } from "@/lib/availability";
import { initializeTransaction, PaystackNotConfiguredError } from "@/lib/paystack";
import { sendBookingConfirmationEmail, sendNewBookingNotificationEmail } from "@/lib/email/booking";

export async function POST(request: Request) {
  const settings = await getSettings();
  if (!settings.default_lawyer_id || !settings.default_duration_minutes || settings.default_fee_kobo == null) {
    return NextResponse.json({ error: "The default booking page isn't configured yet" }, { status: 400 });
  }

  const body = await request.json();
  const { client_name, client_email, client_phone, notes, date, start_time, terms_accepted } = body;

  if (typeof client_name !== "string" || !client_name.trim()) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (typeof client_email !== "string" || !client_email.includes("@")) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }
  if (await isEmailBlocked(client_email)) {
    return NextResponse.json({ error: "We couldn't process this booking. Please contact us directly." }, { status: 400 });
  }
  if (terms_accepted !== true) {
    return NextResponse.json({ error: "You must accept the terms and conditions" }, { status: 400 });
  }
  if (typeof date !== "string" || typeof start_time !== "string") {
    return NextResponse.json({ error: "Date and time are required" }, { status: 400 });
  }

  const lawyer = await getLawyer(settings.default_lawyer_id);
  if (!lawyer || !lawyer.active) {
    return NextResponse.json({ error: "This consultant isn't available right now" }, { status: 400 });
  }

  if (!isBusinessDay(date, settings.business_days)) {
    return NextResponse.json({ error: "That day isn't available for booking" }, { status: 400 });
  }

  const availability = await listAvailability();
  const validSlots = slotsForLawyerDay(availability, lawyer.id, weekdayOf(date), settings.default_duration_minutes);
  if (!validSlots.includes(start_time)) {
    return NextResponse.json({ error: "That time isn't bookable" }, { status: 400 });
  }

  const scheduledAt = combineLagosDateTime(date, start_time);
  if (!meetsNotice(scheduledAt, settings.booking_notice_hours)) {
    return NextResponse.json(
      { error: `Bookings need at least ${settings.booking_notice_hours} hours' notice` },
      { status: 400 }
    );
  }

  if (await isSlotTaken(lawyer.id, scheduledAt.toISOString())) {
    return NextResponse.json({ error: "That slot is no longer available. Please choose another." }, { status: 409 });
  }

  const { feeKobo, vatKobo, totalKobo } = computeTotal(settings.default_fee_kobo, settings.vat_rate);

  const trimmedName = client_name.trim();
  const normalizedEmail = client_email.trim().toLowerCase();
  const trimmedPhone = typeof client_phone === "string" ? client_phone.trim() || null : null;
  const client = await upsertClientForBooking(normalizedEmail, trimmedName, trimmedPhone);

  let booking;
  try {
    booking = await createBooking({
      client_name: trimmedName,
      client_email: normalizedEmail,
      client_phone: trimmedPhone,
      client_id: client.id,
      notes: typeof notes === "string" ? notes.trim() || null : null,
      scheduled_at: scheduledAt.toISOString(),
      lawyer_id: lawyer.id,
      duration_minutes: settings.default_duration_minutes,
      fee_kobo: feeKobo,
      vat_kobo: vatKobo,
      amount_kobo: totalKobo,
      terms_accepted_at: new Date().toISOString(),
    });
  } catch (err) {
    if (err instanceof SlotUnavailableError) {
      return NextResponse.json({ error: err.message }, { status: 409 });
    }
    throw err;
  }

  const origin = new URL(request.url).origin;
  const reference = `mc_${booking.id}`;

  try {
    const { authorizationUrl } = await initializeTransaction({
      email: booking.client_email,
      amountKobo: totalKobo,
      reference,
      callbackUrl: `${origin}/book/confirm?reference=${reference}`,
    });

    await updateBooking(booking.id, { paystack_reference: reference });

    return NextResponse.json({ ok: true, redirectUrl: authorizationUrl });
  } catch (err) {
    if (!(err instanceof PaystackNotConfiguredError)) {
      console.error("Paystack initialization failed:", err);
    }

    await Promise.all([
      sendBookingConfirmationEmail(booking, lawyer).catch((e) =>
        console.error("sendBookingConfirmationEmail failed:", e)
      ),
      sendNewBookingNotificationEmail(booking, lawyer).catch((e) =>
        console.error("sendNewBookingNotificationEmail failed:", e)
      ),
    ]);

    return NextResponse.json({ ok: true, stubbed: true, bookingId: booking.id });
  }
}
