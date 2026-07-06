import { NextResponse } from "next/server";

export async function GET() {
  const envStatus = {
    BREVO_API_KEY: process.env.BREVO_API_KEY ? "Configured" : "Missing",
    BREVO_SENDER_EMAIL: process.env.BREVO_SENDER_EMAIL ? "Configured" : "Missing",
  };

  try {
    if (!process.env.BREVO_API_KEY) {
      throw new Error("Missing BREVO_API_KEY");
    }
    
    // Test the API key by fetching the account details
    const response = await fetch("https://api.brevo.com/v3/account", {
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
      }
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(`Brevo Authentication Failed: ${data.message || response.statusText}`);
    }

    return NextResponse.json({
      status: "success",
      message: "Brevo API connection verified successfully in production.",
      envStatus
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to Brevo API.",
      error: error.message || error.toString(),
      envStatus
    }, { status: 500 });
  }
}
