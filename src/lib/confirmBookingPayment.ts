import { getBookingByReference, updateBooking, type Booking } from "@/lib/bookings";
import { getLawyer } from "@/lib/lawyers";
import { verifyTransaction } from "@/lib/paystack";
import { sendBookingConfirmationEmail, sendNewBookingNotificationEmail } from "@/lib/email/booking";
import { sendClientWelcomeEmail, sendInvoiceReadyEmail } from "@/lib/email/client";
import { ensureClientAccountForBooking } from "@/lib/clientAccounts";
import { createInvoiceForBooking } from "@/lib/invoices";

export async function confirmBookingPayment(
  reference: string
): Promise<{ booking: Booking | null; error?: string }> {
  let booking = await getBookingByReference(reference);
  if (!booking) {
    return { booking: null, error: "Booking not found" };
  }

  // Idempotent no-op if the webhook (or a previous call) already processed it.
  if (booking.payment_status === "paid") {
    return { booking };
  }

  try {
    const result = await verifyTransaction(reference);
    if (!result.success) {
      return { booking, error: "Payment was not successful" };
    }

    const lawyer = booking.lawyer_id ? await getLawyer(booking.lawyer_id) : null;
    booking = await updateBooking(booking.id, { payment_status: "paid", status: "active" });

    const accountResult = await ensureClientAccountForBooking(booking).catch((e) => {
      console.error("ensureClientAccountForBooking failed:", e);
      return null;
    });

    const invoice = booking.amount_kobo
      ? await createInvoiceForBooking(booking.id, booking.client_id, booking.amount_kobo).catch((e) => {
          console.error("createInvoiceForBooking failed:", e);
          return null;
        })
      : null;

    await Promise.all([
      sendBookingConfirmationEmail(booking, lawyer).catch((e) =>
        console.error("sendBookingConfirmationEmail failed:", e)
      ),
      sendNewBookingNotificationEmail(booking, lawyer).catch((e) =>
        console.error("sendNewBookingNotificationEmail failed:", e)
      ),
      ...(accountResult?.isNewAccount && accountResult.tempPassword
        ? [
            sendClientWelcomeEmail(booking, accountResult.client.email, accountResult.tempPassword).catch(
              (e) => console.error("sendClientWelcomeEmail failed:", e)
            ),
          ]
        : []),
      ...(invoice
        ? [
            sendInvoiceReadyEmail(booking, invoice.invoice_number).catch((e) =>
              console.error("sendInvoiceReadyEmail failed:", e)
            ),
          ]
        : []),
    ]);

    return { booking };
  } catch (err) {
    console.error("verifyTransaction failed:", err);
    return { booking, error: "Could not verify payment yet" };
  }
}
