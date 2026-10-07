import { NextResponse } from "next/server";
import { confirmBookingPayment } from "@/lib/confirmBookingPayment";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ error: "Missing reference" }, { status: 400 });
  }

  const { booking, error } = await confirmBookingPayment(reference);
  if (!booking) {
    return NextResponse.json({ error }, { status: 404 });
  }

  // Anyone holding a reference can hit this, so return status only, never
  // the client's details or intake answers.
  return NextResponse.json({
    booking: { status: booking.status, payment_status: booking.payment_status },
    error,
  });
}
