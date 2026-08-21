import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/paystack";
import { confirmBookingPayment } from "@/lib/confirmBookingPayment";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const event = JSON.parse(rawBody);

  if (event.event !== "charge.success") {
    return NextResponse.json({ ok: true });
  }

  const reference = event.data?.reference as string | undefined;
  if (!reference) {
    return NextResponse.json({ ok: true });
  }

  await confirmBookingPayment(reference);
  return NextResponse.json({ ok: true });
}
