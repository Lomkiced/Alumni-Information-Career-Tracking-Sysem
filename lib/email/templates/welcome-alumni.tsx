// lib/email/templates/welcome-alumni.tsx
export function welcomeAlumniHtml({
  full_name,
  email,
  action_link,
}: {
  full_name: string;
  email: string;
  action_link: string;
}): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Welcome to AICTS</title></head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2d5a27 100%);padding:40px 40px 32px;text-align:center;">
            <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
              Polytechnic College of La Union
            </h1>
            <p style="margin:8px 0 0;color:rgba(255,255,255,0.8);font-size:14px;">
              Alumni Information Career Tracking System
            </p>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:40px;">
            <h2 style="margin:0 0 16px;color:#1e3a5f;font-size:20px;">Welcome, ${full_name}! 🎓</h2>
            <p style="margin:0 0 16px;color:#4a5568;font-size:15px;line-height:1.7;">
              Thank you for registering with the AICTS. Your account has been created successfully.
            </p>
            <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.7;">
              Please verify your email address to activate your account and start using the system.
            </p>
            <div style="text-align:center;margin:0 0 32px;">
              <a href="${action_link}" style="display:inline-block;background:#2d7d32;color:#fff;font-weight:600;font-size:16px;text-decoration:none;padding:12px 24px;border-radius:6px;box-shadow:0 2px 8px rgba(45,125,50,0.3);">
                Verify Email Address
              </a>
            </div>
            <div style="background:#f7fafc;border-radius:8px;padding:20px;margin:0 0 24px;border-left:4px solid #2d7d32;">
              <p style="margin:0;color:#2d7d32;font-weight:600;font-size:14px;">📧 Registered Email</p>
              <p style="margin:4px 0 0;color:#1e3a5f;font-size:15px;">${email}</p>
            </div>
            <h3 style="margin:0 0 12px;color:#1e3a5f;font-size:16px;">What you can do with AICTS:</h3>
            <ul style="margin:0 0 24px;padding:0 0 0 20px;color:#4a5568;font-size:15px;line-height:2;">
              <li>Track and showcase your career history</li>
              <li>Browse and apply to exclusive job listings</li>
              <li>Stay updated with PCLU announcements and events</li>
              <li>Connect with employers looking for PCLU graduates</li>
            </ul>
          </td>
        </tr>
        <!-- Footer -->
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
