import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export function renderRows(rows: [string, string][]) {
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

export function shell(headline: string, intro: string, rows: [string, string][], footer: string) {
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

/** Same shell, but with a prominent call-to-action button instead of a
 * detail-rows table (used for account/auth emails: welcome, password reset). */
export function shellWithButton(
  headline: string,
  intro: string,
  buttonLabel: string,
  buttonHref: string,
  footer: string
) {
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
                <a href="${buttonHref}" style="display:inline-block;background:#ffda00;color:#222753;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;text-decoration:none;">
                  ${buttonLabel}
                </a>
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

export function formatSchedule(scheduledAt: string | null) {
  if (!scheduledAt) return "To be arranged";
  return new Date(scheduledAt).toLocaleString("en-NG", {
    timeZone: "Africa/Lagos",
    dateStyle: "full",
    timeStyle: "short",
  });
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://me-consult.org";
