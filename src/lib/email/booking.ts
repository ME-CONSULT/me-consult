import type { Booking } from "@/lib/bookings";
import type { Lawyer } from "@/lib/lawyers";
import { formatNaira } from "@/lib/pricing";
import { listStaffUsers } from "@/lib/supabase/admin";
import { getSettings } from "@/lib/settings";
import { resend, shell, formatSchedule as formatScheduleAt } from "@/lib/email/core";

function formatSchedule(booking: Booking) {
  return formatScheduleAt(booking.scheduled_at);
}

function lawyerName(lawyer: Lawyer | null) {
  return lawyer ? `${lawyer.first_name} ${lawyer.last_name}` : "To be assigned";
}

function detailRows(booking: Booking, lawyer: Lawyer | null) {
  const rows: [string, string][] = [
    ["Lawyer", lawyerName(lawyer)],
    ["Duration", booking.duration_minutes ? `${booking.duration_minutes} minutes` : "—"],
    ["Scheduled for", formatSchedule(booking)],
  ];
  if (booking.title) rows.push(["Title", booking.title]);
  if (booking.service) rows.push(["Regarding", booking.service]);
  if (booking.fee_kobo) rows.push(["Consultation fee", formatNaira(booking.fee_kobo)]);
  if (booking.vat_kobo) rows.push(["VAT", formatNaira(booking.vat_kobo)]);
  if (booking.amount_kobo) rows.push(["Total", formatNaira(booking.amount_kobo)]);
  if (booking.meeting_url) rows.push(["Meeting link", booking.meeting_url]);
  return rows;
}

export async function sendBookingConfirmationEmail(booking: Booking, lawyer: Lawyer | null) {
  const paid = booking.payment_status === "paid";
  const headline = paid ? "Your consultation is confirmed" : "We've received your booking request";
  const intro = paid
    ? `Thank you, ${booking.client_name}. Your payment was received and your consultation is confirmed.`
    : `Thank you, ${booking.client_name}. We've received your request. Online payment isn't available on the site just yet, so our team will be in touch shortly to arrange payment and confirm your slot.`;
  const footer = paid
    ? "A member of our team will send a call link ahead of your consultation."
    : `Questions in the meantime? Reply to this email or reach us directly.`;

  const { error } = await resend.emails.send({
    from: "ME Consult <admin@me-consult.org>",
    to: booking.client_email,
    subject: paid ? "Your ME Consult consultation is confirmed" : "We've received your booking request",
    html: shell(headline, intro, detailRows(booking, lawyer), footer),
  });

  if (error) throw new Error(error.message);
}

export async function sendNewBookingNotificationEmail(booking: Booking, lawyer: Lawyer | null) {
  const [staff, settings] = await Promise.all([listStaffUsers(), getSettings()]);
  const staffEmails = staff.map((u) => u.email).filter((e): e is string => Boolean(e));
  // Always include the official business inbox alongside every staff member's
  // own email, so bookings are never missed even if an individual account's
  // notifications get buried.
  const recipients = Array.from(new Set([...staffEmails, settings.business_email].filter(Boolean)));
  if (recipients.length === 0) return;

  const paid = booking.payment_status === "paid";
  const headline = paid ? "New paid booking" : "New booking — payment not yet arranged";
  const intro = paid
    ? `${booking.client_name} (${booking.client_email}) just booked and paid online.`
    : `${booking.client_name} (${booking.client_email}) submitted a booking request, but online payment isn't set up yet — reach out to arrange payment and confirm.`;

  const { error } = await resend.emails.send({
    from: "ME Consult Admin <admin@me-consult.org>",
    to: recipients,
    subject: `${headline}: ${booking.client_name}`,
    html: shell(headline, intro, detailRows(booking, lawyer), "View it in the admin dashboard."),
  });

  if (error) throw new Error(error.message);
}
