import { sendMailWithGmail } from "./gmail";

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
    const toArray = Array.isArray(to) ? to : [to];
    const results = [];
    for (const email of toArray) {
       const info = await sendMailWithGmail({
         to: email,
         subject,
         html,
       });
       results.push(info);
    }
    return { success: true, data: results };
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
