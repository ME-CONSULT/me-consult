import type { Booking } from "@/lib/bookings";
import { formatNaira } from "@/lib/pricing";
import { resend, shellWithButton, shell, formatSchedule, SITE_URL } from "@/lib/email/core";

export async function sendClientWelcomeEmail(
  booking: Booking,
  email: string,
  tempPassword: string
) {
  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: email,
    subject: "Your ME Consult client account",
    html: shellWithButton(
      "Your client account is ready",
      `Thanks for booking with ME Consult, ${booking.client_name}. We've created you an account to manage your bookings, payments, and invoices. Sign in with:<br/><br/><strong>Email:</strong> ${email}<br/><strong>Temporary password:</strong> ${tempPassword}`,
      "Sign in to your account",
      `${SITE_URL}/portal/login`,
      "For your security, please sign in and change this password as soon as possible."
    ),
  });

  if (error) throw new Error(error.message);
}

export async function sendClientPasswordResetEmail(email: string, tokenHash: string) {
  const resetUrl = `${SITE_URL}/portal/reset-password?token_hash=${encodeURIComponent(tokenHash)}&type=recovery`;

  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: email,
    subject: "Reset your ME Consult password",
    html: shellWithButton(
      "Reset your password",
      "We received a request to reset the password for your ME Consult client account.",
      "Reset password",
      resetUrl,
      "Didn't request this? You can safely ignore this email — your password won't change."
    ),
  });

  if (error) throw new Error(error.message);
}

export async function sendRescheduleConfirmationEmail(booking: Booking) {
  const rows: [string, string][] = [
    ["Scheduled for", formatSchedule(booking.scheduled_at)],
  ];
  if (booking.title) rows.push(["Title", booking.title]);

  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: booking.client_email,
    subject: "Your consultation has been rescheduled",
    html: shell(
      "Your consultation has been rescheduled",
      `Hi ${booking.client_name}, your booking has been moved to a new time.`,
      rows,
      "If you didn't request this change, please contact us right away."
    ),
  });

  if (error) throw new Error(error.message);
}

export async function sendMeetingLinkEmail(booking: Booking) {
  if (!booking.meeting_url) return;

  const rows: [string, string][] = [["Scheduled for", formatSchedule(booking.scheduled_at)]];
  if (booking.title) rows.push(["Title", booking.title]);

  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: booking.client_email,
    subject: "Your ME Consult video call link",
    html: shellWithButton(
      "Your video call link is ready",
      `Hi ${booking.client_name}, here's the link to join your consultation.`,
      "Join video call",
      booking.meeting_url,
      "Save this email — you'll need the link at your scheduled time."
    ),
  });

  if (error) throw new Error(error.message);
}

/** Full itemized receipt as an inline HTML table (so nothing requires
 * leaving the email), with the same invoice attached as a PDF for
 * printing/records. `pdfBuffer` is optional so this still degrades
 * gracefully to an inline-only receipt if PDF generation fails. */
export async function sendInvoiceReadyEmail(
  booking: Booking,
  invoiceNumber: number,
  pdfBuffer?: Buffer
) {
  const rows: [string, string][] = [
    [booking.title || booking.service || "Consultation", formatNaira(booking.fee_kobo)],
  ];
  if (booking.vat_kobo != null) rows.push(["VAT", formatNaira(booking.vat_kobo)]);
  rows.push(["Total paid", formatNaira(booking.amount_kobo)]);

  const paddedNumber = String(invoiceNumber).padStart(6, "0");

  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: booking.client_email,
    subject: `Receipt — Invoice #${paddedNumber} from ME Consult`,
    html: shell(
      "Your payment receipt",
      `Hi ${booking.client_name}, thank you for your payment. Invoice #${paddedNumber} is below${pdfBuffer ? " and attached as a PDF" : ""}.`,
      rows,
      "Sign in to your account any time to view all your invoices."
    ),
    attachments: pdfBuffer
      ? [{ filename: `invoice-${paddedNumber}.pdf`, content: pdfBuffer }]
      : undefined,
  });

  if (error) throw new Error(error.message);
}
