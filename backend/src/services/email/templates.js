const shell = (title, bodyHtml) => `
<!DOCTYPE html>
<html>
  <body style="margin:0;background:#F7F8FB;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
      <tr>
        <td align="center">
          <table width="480" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,#3557F0,#1F359E);padding:24px 32px;">
                <span style="color:#fff;font-size:20px;font-weight:700;">AI Placement Coach</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;color:#1E2534;font-size:15px;line-height:1.6;">
                <h2 style="margin-top:0;color:#0B0F19;">${title}</h2>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px;color:#8A93A6;font-size:12px;">
                If you didn't request this, you can safely ignore this email.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

const button = (url, label) => `
  <a href="${url}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#3557F0;color:#fff;text-decoration:none;border-radius:10px;font-weight:600;">
    ${label}
  </a>
`;

export const verificationEmailTemplate = (name, verifyUrl) =>
  shell(
    `Welcome, ${name} 👋`,
    `<p>You're one step away from starting your placement prep. Verify your email to activate your account.</p>
     ${button(verifyUrl, 'Verify Email')}
     <p style="font-size:13px;color:#4A5468;">This link expires in 24 hours.</p>`
  );

export const passwordResetEmailTemplate = (name, resetUrl) =>
  shell(
    `Reset your password`,
    `<p>Hi ${name}, we received a request to reset your password.</p>
     ${button(resetUrl, 'Reset Password')}
     <p style="font-size:13px;color:#4A5468;">This link expires in 1 hour. If you didn't request this, please ignore this email.</p>`
  );
