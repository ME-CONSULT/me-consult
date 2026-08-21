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

  return NextResponse.json({ booking, error });
}
