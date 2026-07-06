// lib/email/brevo.ts

export const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || "admin@example.com";
export const FROM_NAME = "AICTS";

export async function sendMailWithBrevo({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY environment variable is missing.");
  }

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "accept": "application/json",
      "api-key": process.env.BREVO_API_KEY,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: FROM_NAME,
        email: FROM_EMAIL,
      },
      to: [
        { email: to }
      ],
      subject,
      htmlContent: html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Brevo Error: ${data.message || response.statusText}`);
  }

  return data;
}
