// lib/email/nodemailer.ts
import nodemailer from "nodemailer";

if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
  console.warn("SMTP_EMAIL or SMTP_PASSWORD is not set. Email sending will fail.");
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const FROM_EMAIL = `AICTS <${process.env.SMTP_EMAIL}>`;

// Keep the same helper function name and signature to minimize refactoring elsewhere
export async function sendBatchEmails(
  emails: Array<{
    to: string;
    subject: string;
    html: string;
  }>,
  delayMs = 600
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await transporter.sendMail({
        from: FROM_EMAIL,
        to: email.to,
        subject: email.subject,
        html: email.html,
      });
      sent++;
    } catch (error) {
      console.error(`[Nodemailer] Failed to send to ${email.to}:`, error);
      failed++;
    }

    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return { sent, failed };
}
