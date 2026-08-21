import type { Booking } from "@/lib/bookings";
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

export async function sendInvoiceReadyEmail(booking: Booking, invoiceNumber: number) {
  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: booking.client_email,
    subject: `Invoice #${invoiceNumber} from ME Consult`,
    html: shellWithButton(
      "Your invoice is ready",
      `Hi ${booking.client_name}, the invoice for your consultation is ready to view or download.`,
      "View invoice",
      `${SITE_URL}/portal/invoices/${invoiceNumber}`,
      "Sign in to your account to view all your invoices."
    ),
  });

  if (error) throw new Error(error.message);
}
