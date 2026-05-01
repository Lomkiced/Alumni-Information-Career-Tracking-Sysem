// lib/email/send.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "AICTS <noreply@pclu.edu.ph>";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string | string[];
  subject: string;
  html: string;
}) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
    });
    if (error) {
      console.error("Resend error:", error);
      return { success: false, error };
    }
    return { success: true, data };
  } catch (err) {
    console.error("Email send failed:", err);
    return { success: false, error: err };
  }
}

export async function sendBatchEmails({
  recipients,
  subject,
  html,
}: {
  recipients: string[];
  subject: string;
  html: string;
}) {
  // Resend batch API — max 100 per call
  const chunks: string[][] = [];
  for (let i = 0; i < recipients.length; i += 100) {
    chunks.push(recipients.slice(i, i + 100));
  }

  const results = [];
  for (const chunk of chunks) {
    const result = await sendEmail({ to: chunk, subject, html });
    results.push(result);
    // small delay to avoid rate limits
    if (chunks.length > 1) await new Promise(r => setTimeout(r, 500));
  }
  return results;
}
