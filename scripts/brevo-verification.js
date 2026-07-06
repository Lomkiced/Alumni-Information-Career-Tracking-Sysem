// scripts/brevo-verification.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const FROM_EMAIL = process.env.BREVO_SENDER_EMAIL || "admin@example.com";
const FROM_NAME = "AICTS";

async function resendVerification(email) {
  console.log(`Looking up user by email: ${email}...`);
  const { data: linkData, error: linkErr } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email
  });

  if (linkErr) {
    console.error('Failed to generate link:', linkErr.message);
    return;
  }

  const action_link = linkData.properties.action_link;
  console.log('Generated action link:', action_link);

  console.log('Sending email...');
  try {
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
          { email: email }
        ],
        subject: "AICTS — Verify Your Email (Resend)",
        htmlContent: `
          <h2>Verify Your Email</h2>
          <p>Please click the link below to verify your email address:</p>
          <a href="${action_link}">Verify Email Address</a>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || response.statusText);
    }
    console.log('Email sent successfully!', data.messageId);
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}

const emailToVerify = process.argv[2];
if (!emailToVerify) {
  console.error('Please provide an email address to verify.');
  console.error('Usage: node scripts/brevo-verification.js <email>');
  process.exit(1);
}

resendVerification(emailToVerify);
