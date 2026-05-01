// lib/email/templates/welcome-employer.tsx
export function welcomeEmployerHtml({
  full_name,
  company_name,
}: {
  full_name: string;
  company_name: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>AICTS Employer Registration</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2d5a27 100%);padding:40px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">Polytechnic College of La Union</h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">Alumni Information Career Tracking System</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;color:#1e3a5f;font-size:20px;">Registration Received, ${full_name}!</h2>
            <p style="margin:0 0 16px;color:#4a5568;font-size:15px;line-height:1.7;">
              Thank you for registering <strong>${company_name}</strong> on the AICTS Employer Portal.
            </p>
            <div style="background:#fffbeb;border:1px solid #f6d860;border-radius:8px;padding:20px;margin:0 0 24px;">
              <p style="margin:0;color:#92400e;font-weight:600;font-size:14px;">⏳ Pending Admin Approval</p>
              <p style="margin:8px 0 0;color:#78350f;font-size:14px;line-height:1.6;">
                Your employer account is currently under review by the PCLU Alumni Affairs Office. 
                You will receive an email notification once your account has been approved.
              </p>
            </div>
            <h3 style="margin:0 0 12px;color:#1e3a5f;font-size:16px;">Once approved, you will be able to:</h3>
            <ul style="margin:0 0 24px;padding:0 0 0 20px;color:#4a5568;font-size:15px;line-height:2;">
              <li>Post job opportunities for PCLU graduates</li>
              <li>Browse the alumni directory</li>
              <li>Manage applications and track candidates</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td style="background:#f7fafc;padding:24px 40px;border-top:1px solid #e2e8f0;text-align:center;">
            <p style="margin:0;color:#718096;font-size:13px;">
              © ${new Date().getFullYear()} Polytechnic College of La Union · Alumni Affairs Office
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
