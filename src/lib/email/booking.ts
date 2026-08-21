import { Resend } from "resend";
import type { Booking } from "@/lib/bookings";
import type { Lawyer } from "@/lib/lawyers";
import { formatNaira } from "@/lib/pricing";
import { supabaseAdmin } from "@/lib/supabase/admin";

const resend = new Resend(process.env.RESEND_API_KEY);

function formatSchedule(booking: Booking) {
  if (!booking.scheduled_at) return "To be arranged";
  return new Date(booking.scheduled_at).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });
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
  if (booking.service) rows.push(["Regarding", booking.service]);
  if (booking.fee_kobo) rows.push(["Consultation fee", formatNaira(booking.fee_kobo)]);
  if (booking.vat_kobo) rows.push(["VAT", formatNaira(booking.vat_kobo)]);
  if (booking.amount_kobo) rows.push(["Total", formatNaira(booking.amount_kobo)]);
  return rows;
}

function renderRows(rows: [string, string][]) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:6px 0;color:#22275399;font-size:13px;">${label}</td>
          <td style="padding:6px 0;color:#222753;font-size:13px;font-weight:600;text-align:right;">${value}</td>
        </tr>`
    )
    .join("");
}

function shell(headline: string, intro: string, rows: [string, string][], footer: string) {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f4f6;font-family:Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f6;padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:#171b3d;padding:28px 32px;">
                <span style="color:#ffffff;font-size:16px;font-weight:600;">ME Consult</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 8px;color:#222753;font-size:20px;font-weight:600;">${headline}</p>
                <p style="margin:0 0 24px;color:#22275399;font-size:14px;line-height:1.5;">${intro}</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #22275314;padding-top:4px;">
                  ${renderRows(rows)}
                </table>
                <p style="margin:28px 0 0;color:#22275366;font-size:12px;line-height:1.5;">${footer}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
  const admin = supabaseAdmin();
  const { data, error: listError } = await admin.auth.admin.listUsers({ perPage: 200 });
  if (listError) throw listError;

  const recipients = data.users.map((u) => u.email).filter((e): e is string => Boolean(e));
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
