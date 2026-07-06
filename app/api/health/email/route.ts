import { NextResponse } from "next/server";
import { transporter } from "@/lib/email/nodemailer";

export async function GET() {
  const envStatus = {
    SMTP_EMAIL: process.env.SMTP_EMAIL ? "Configured" : "Missing",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD ? "Configured" : "Missing",
  };

  try {
    await transporter.verify();
    return NextResponse.json({
      status: "success",
      message: "SMTP connection verified successfully in production.",
      envStatus
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: "Failed to connect to SMTP server.",
      error: error.message || error.toString(),
      code: error.code,
      command: error.command,
      envStatus
    }, { status: 500 });
  }
}
