// lib/email/resend.ts
import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Use onboarding@resend.dev as default if they haven't verified a custom domain yet.
// If they have a custom domain configured in env, use that instead.
export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "AICTS <onboarding@resend.dev>";

export async function sendMailWithResend({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is missing.");
  }

  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: [to],
    subject,
    html,
  });

  if (error) {
    throw new Error(`Resend Error: ${error.message}`);
  }

  return data;
}
