// scripts/resend-verification.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.SMTP_EMAIL, pass: process.env.SMTP_PASSWORD }
});

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
    const info = await transporter.sendMail({
      from: \`AICTS <\${process.env.SMTP_EMAIL}>\`,
      to: email,
      subject: "AICTS — Verify Your Email (Resend)",
      html: \`
        <h2>Verify Your Email</h2>
        <p>Please click the link below to verify your email address:</p>
        <a href="\${action_link}">Verify Email Address</a>
      \`
    });
    console.log('Email sent successfully!', info.messageId);
  } catch (err) {
    console.error('Failed to send email:', err.message);
  }
}

const emailToVerify = process.argv[2];
if (!emailToVerify) {
  console.error('Please provide an email address to verify.');
  console.error('Usage: node scripts/resend-verification.js <email>');
  process.exit(1);
}

resendVerification(emailToVerify);
