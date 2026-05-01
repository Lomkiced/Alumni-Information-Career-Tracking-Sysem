// lib/email/templates.ts
// All AICTS email templates as HTML strings

const BASE_STYLE = `
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background: #f8fafc;
  color: #1e293b;
`;

const HEADER = (title: string) => `
  <div style="background: linear-gradient(135deg, #0d2b5a 0%, #1e4080 100%); padding: 32px 40px; border-radius: 12px 12px 0 0; text-align: center;">
    <div style="width: 48px; height: 48px; background: rgba(255,255,255,0.15); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
      <span style="color: white; font-size: 24px;">🎓</span>
    </div>
    <h1 style="color: white; font-size: 22px; font-weight: 700; margin: 0 0 4px; letter-spacing: -0.3px;">AICTS</h1>
    <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0;">Polytechnic College of La Union</p>
    <h2 style="color: white; font-size: 18px; font-weight: 600; margin: 20px 0 0;">${title}</h2>
  </div>
`;

const FOOTER = `
  <div style="padding: 24px 40px; background: #f1f5f9; border-radius: 0 0 12px 12px; text-align: center; border-top: 1px solid #e2e8f0;">
    <p style="font-size: 12px; color: #64748b; margin: 0 0 4px;">Alumni Information Career Tracking System</p>
    <p style="font-size: 12px; color: #94a3b8; margin: 0;">Polytechnic College of La Union · La Union, Philippines</p>
    <p style="font-size: 11px; color: #cbd5e1; margin: 12px 0 0;">This is an automated message. Please do not reply.</p>
  </div>
`;

const BODY = (content: string) => `
  <div style="padding: 32px 40px; background: #ffffff; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
    ${content}
  </div>
`;

const BTN = (href: string, label: string) => `
  <a href="${href}" style="display: inline-block; background: linear-gradient(135deg, #0d2b5a, #1e4080); color: white; font-size: 14px; font-weight: 600; padding: 12px 28px; border-radius: 8px; text-decoration: none; margin-top: 20px;">${label}</a>
`;

const wrap = (header: string, body: string) => `
  <!DOCTYPE html>
  <html><head><meta charset="utf-8"/></head>
  <body style="margin:0;padding:20px;background:#f8fafc;">
    <div style="${BASE_STYLE}">
      ${header}
      ${BODY(body)}
      ${FOOTER}
    </div>
  </body>
  </html>
`;

// ── Templates ─────────────────────────────────────────────────────────────────

export function welcomeAlumniEmail(fullName: string, loginUrl: string) {
  return wrap(
    HEADER("Welcome to AICTS! 🎉"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${fullName}!</p>
    <p style="color: #475569; line-height: 1.6;">Welcome to the <strong>Alumni Information Career Tracking System</strong> of Polytechnic College of La Union. We're thrilled to have you on board.</p>
    <p style="color: #475569; line-height: 1.6;">Through AICTS, you can:</p>
    <ul style="color: #475569; line-height: 2; padding-left: 20px;">
      <li>Update your professional profile and career history</li>
      <li>Browse and apply to job opportunities from verified employers</li>
      <li>Stay informed with institutional announcements</li>
    </ul>
    <p style="color: #475569;">Click below to log in and complete your profile.</p>
    ${BTN(loginUrl, "Go to My Dashboard →")}
    `
  );
}

export function welcomeEmployerEmail(companyName: string, contactName: string) {
  return wrap(
    HEADER("Registration Received"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${contactName}!</p>
    <p style="color: #475569; line-height: 1.6;">Thank you for registering <strong>${companyName}</strong> on the AICTS employer portal.</p>
    <p style="color: #475569; line-height: 1.6;">Your account is currently <span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:20px;font-size:13px;font-weight:600;">Pending Approval</span>. Our admin team will review your application and notify you within 1–2 business days.</p>
    <div style="background:#f0f9ff;border-left:4px solid #0ea5e9;padding:16px;border-radius:0 8px 8px 0;margin-top:20px;">
      <p style="margin:0;font-size:13px;color:#0369a1;"><strong>📋 What happens next?</strong><br/>You'll receive another email once your account is approved. After approval, you can log in, post job openings, and connect with PCLU alumni.</p>
    </div>
    `
  );
}

export function employerApprovedEmail(companyName: string, contactName: string, loginUrl: string) {
  return wrap(
    HEADER("Account Approved! ✅"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Congratulations, ${contactName}!</p>
    <p style="color: #475569; line-height: 1.6;">Your employer account for <strong>${companyName}</strong> has been <span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:20px;font-size:13px;font-weight:600;">Approved</span> by the PCLU administration.</p>
    <p style="color: #475569; line-height: 1.6;">You can now log in and start posting job opportunities to connect with qualified PCLU alumni.</p>
    ${BTN(loginUrl, "Go to Employer Dashboard →")}
    `
  );
}

export function employerRejectedEmail(companyName: string, contactName: string, reason: string) {
  return wrap(
    HEADER("Account Registration Update"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${contactName}.</p>
    <p style="color: #475569; line-height: 1.6;">After review, we regret to inform you that the employer registration for <strong>${companyName}</strong> has been <span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:20px;font-size:13px;font-weight:600;">Rejected</span>.</p>
    <div style="background:#fff1f2;border-left:4px solid #f43f5e;padding:16px;border-radius:0 8px 8px 0;margin-top:16px;">
      <p style="margin:0;font-size:13px;color:#9f1239;"><strong>Reason:</strong></p>
      <p style="margin:8px 0 0;font-size:14px;color:#be123c;">${reason}</p>
    </div>
    <p style="color: #475569; line-height: 1.6; margin-top: 16px;">If you believe this is a mistake, please contact the PCLU administration directly.</p>
    `
  );
}

export function jobApprovedEmail(companyName: string, jobTitle: string, loginUrl: string) {
  return wrap(
    HEADER("Job Posting Approved! ✅"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${companyName}!</p>
    <p style="color: #475569; line-height: 1.6;">Your job posting for <strong>"${jobTitle}"</strong> has been <span style="background:#dcfce7;color:#166534;padding:2px 8px;border-radius:20px;font-size:13px;font-weight:600;">Approved</span> and is now live on the AICTS job board.</p>
    <p style="color: #475569; line-height: 1.6;">Qualified PCLU alumni can now view and apply to this position. You'll receive a notification when someone applies.</p>
    ${BTN(loginUrl, "View Applicants →")}
    `
  );
}

export function jobRejectedEmail(companyName: string, jobTitle: string, reason: string) {
  return wrap(
    HEADER("Job Posting Update"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${companyName}.</p>
    <p style="color: #475569; line-height: 1.6;">Your job posting for <strong>"${jobTitle}"</strong> was not approved.</p>
    <div style="background:#fff1f2;border-left:4px solid #f43f5e;padding:16px;border-radius:0 8px 8px 0;margin-top:16px;">
      <p style="margin:0;font-size:13px;color:#9f1239;"><strong>Reason:</strong></p>
      <p style="margin:8px 0 0;font-size:14px;color:#be123c;">${reason}</p>
    </div>
    <p style="color: #475569; line-height: 1.6; margin-top: 16px;">You may revise and re-submit the posting after addressing the concerns above.</p>
    `
  );
}

export function jobApplicationReceivedEmail(
  companyName: string,
  applicantName: string,
  jobTitle: string,
  course: string,
  loginUrl: string
) {
  return wrap(
    HEADER("New Job Application Received 📩"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${companyName}!</p>
    <p style="color: #475569; line-height: 1.6;">You have received a new application for <strong>"${jobTitle}"</strong>.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin-top:16px;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748b;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;">Applicant Details</p>
      <p style="margin:0 0 4px;font-size:14px;color:#1e293b;"><strong>Name:</strong> ${applicantName}</p>
      <p style="margin:0;font-size:14px;color:#1e293b;"><strong>Course:</strong> ${course}</p>
    </div>
    ${BTN(loginUrl, "Review Application →")}
    `
  );
}

export function applicationStatusUpdateEmail(
  alumniName: string,
  jobTitle: string,
  companyName: string,
  newStatus: string,
  loginUrl: string
) {
  const statusColors: Record<string, string> = {
    viewed: "#dbeafe;color:#1e40af",
    shortlisted: "#fef9c3;color:#854d0e",
    for_interview: "#f3e8ff;color:#6b21a8",
    hired: "#dcfce7;color:#166534",
    rejected: "#fee2e2;color:#991b1b",
  };
  const statusLabel = newStatus.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const style = statusColors[newStatus] ?? "#f1f5f9;color:#334155";

  return wrap(
    HEADER("Application Status Update"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${alumniName}!</p>
    <p style="color: #475569; line-height: 1.6;">Your application for <strong>"${jobTitle}"</strong> at <strong>${companyName}</strong> has been updated.</p>
    <div style="text-align:center;margin:24px 0;">
      <span style="background:${style};padding:8px 24px;border-radius:24px;font-size:16px;font-weight:700;">${statusLabel}</span>
    </div>
    ${BTN(loginUrl, "View My Applications →")}
    `
  );
}

export function newAnnouncementEmail(
  alumniName: string,
  title: string,
  category: string,
  preview: string,
  loginUrl: string
) {
  return wrap(
    HEADER(`📢 New Announcement: ${category}`),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${alumniName}!</p>
    <p style="color: #475569; line-height: 1.6;">PCLU has posted a new announcement for alumni.</p>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:20px;margin:16px 0;">
      <p style="font-size:16px;font-weight:700;color:#0d2b5a;margin:0 0 8px;">${title}</p>
      <p style="font-size:14px;color:#64748b;margin:0;line-height:1.6;">${preview}...</p>
    </div>
    ${BTN(loginUrl, "Read Full Announcement →")}
    `
  );
}

export function jobExpiredEmail(companyName: string, jobTitle: string, loginUrl: string) {
  return wrap(
    HEADER("Job Posting Expired"),
    `
    <p style="font-size: 16px; font-weight: 600; color: #0d2b5a;">Hello, ${companyName}!</p>
    <p style="color: #475569; line-height: 1.6;">Your job posting for <strong>"${jobTitle}"</strong> has <span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:20px;font-size:13px;font-weight:600;">Expired</span> and is no longer visible to alumni.</p>
    <p style="color: #475569; line-height: 1.6;">If you'd like to continue hiring for this position, you can log in and post a new job listing.</p>
    ${BTN(loginUrl, "Post a New Job →")}
    `
  );
}
