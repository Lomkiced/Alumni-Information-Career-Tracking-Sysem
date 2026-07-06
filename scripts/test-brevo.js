require('dotenv').config({ path: '.env.local' });

async function testBrevo() {
  console.log("Testing Brevo API...");
  console.log("API Key exists?", !!process.env.BREVO_API_KEY);
  console.log("Sender Email:", process.env.BREVO_SENDER_EMAIL);

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "AICTS",
          email: process.env.BREVO_SENDER_EMAIL || "test@example.com",
        },
        to: [
          { email: process.env.BREVO_SENDER_EMAIL || "test@example.com" }
        ],
        subject: "Test Brevo Email",
        htmlContent: "<p>This is a test email from Brevo API.</p>",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo Error:", data.message || response.statusText);
      console.error("Details:", data);
    } else {
      console.log("Brevo Success:", data);
    }
  } catch (err) {
    console.error("Fetch failed:", err);
  }
}

testBrevo();
