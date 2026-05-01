// lib/email/resend.ts
// Resend email client setup

import { Resend } from "resend";

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY environment variable is not set");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender — update domain once Resend domain is verified
export const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ?? "AICTS PCLU <noreply@pclu.edu.ph>";

// Batch send helper with rate limiting (Resend free tier: 2 emails/second)
export async function sendBatchEmails(
  emails: Array<{
    to: string;
    subject: string;
    html: string;
  }>,
  delayMs = 600 // ~1.7 emails/sec to stay under 2/sec limit
): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await resend.emails.send({
        from: FROM_EMAIL,
        to: email.to,
        subject: email.subject,
        html: email.html,
      });
      sent++;
    } catch (error) {
      console.error(`[Resend] Failed to send to ${email.to}:`, error);
      failed++;
    }

    // Rate limit delay
    if (delayMs > 0) {
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  return { sent, failed };
}
