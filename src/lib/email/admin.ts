import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminOtpEmail(to: string, code: string) {
  const { error } = await resend.emails.send({
    from: "ME Consult Admin <admin@me-consult.org>",
    to,
    subject: `${code} is your ME Consult admin sign-in code`,
    html: renderOtpEmail(code),
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendAdminInviteEmail(to: string, invitedBy: string) {
  const { error } = await resend.emails.send({
    from: "ME Consult Admin <admin@me-consult.org>",
    to,
    subject: "You've been added as a ME Consult admin",
    html: renderInviteEmail(to, invitedBy),
  });

  if (error) {
    throw new Error(error.message);
  }
}

function renderInviteEmail(email: string, invitedBy: string) {
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
                <span style="color:#ffffff;font-size:16px;font-weight:600;">ME Consult Admin</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 8px;color:#222753;font-size:20px;font-weight:600;">You've been added as an admin</p>
                <p style="margin:0 0 24px;color:#22275399;font-size:14px;line-height:1.5;">
                  ${invitedBy} added <strong>${email}</strong> as an admin on the ME Consult dashboard. Sign in any time with this email address &mdash; no password needed, just a one-time code sent to your inbox.
                </p>
                <a href="https://me-consult.org/admin/login" style="display:inline-block;background:#ffda00;color:#222753;font-weight:600;font-size:14px;padding:12px 20px;border-radius:8px;text-decoration:none;">
                  Sign in to admin
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderOtpEmail(code: string) {
  const digits = code
    .split("")
    .map(
      (d) =>
        `<td style="width:40px;height:48px;border:1px solid #22275326;border-radius:8px;font-size:20px;font-weight:600;color:#222753;text-align:center;vertical-align:middle;">${d}</td>`
    )
    .join(`<td style="width:8px;"></td>`);

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
                <span style="color:#ffffff;font-size:16px;font-weight:600;">ME Consult Admin</span>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px;">
                <p style="margin:0 0 8px;color:#222753;font-size:20px;font-weight:600;">Your sign-in code</p>
                <p style="margin:0 0 28px;color:#22275399;font-size:14px;line-height:1.5;">
                  Enter this code to sign in to the ME Consult admin dashboard. It expires shortly and can only be used once.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>${digits}</tr>
                </table>
                <p style="margin:28px 0 0;color:#22275366;font-size:12px;line-height:1.5;">
                  Didn&rsquo;t request this? You can safely ignore this email.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
