import nodemailer from "nodemailer";

export const FROM_EMAIL = process.env.SMTP_EMAIL || "admin@example.com";
export const FROM_NAME = "AICTS";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMailWithGmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    throw new Error("SMTP_EMAIL or SMTP_PASSWORD environment variables are missing.");
  }

  const info = await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  return info;
}
