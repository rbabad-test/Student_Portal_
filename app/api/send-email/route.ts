import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    // 1. Guard check and delayed instantiation of Resend inside the handler
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("Resend API key missing from process.env.RESEND_API_KEY");
      return NextResponse.json(
        { message: "Server configuration error: Missing Resend API key." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { to, subject, htmlContent } = await request.json();

    const data = await resend.emails.send({
      from: "Saint Gregory CST <onboarding@resend.dev>", // Replace with your verified domain later
      to: to,
      subject: subject,
      html: htmlContent,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}