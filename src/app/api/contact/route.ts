import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic Input Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error("WEB3FORMS_ACCESS_KEY is not defined in environment variables");
      return NextResponse.json(
        { error: "Contact form submission is currently misconfigured" },
        { status: 500 }
      );
    }

    // Forward the request to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        message,
        subject: "New message from my-platform",
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      console.error("Web3Forms API error response:", data);
      return NextResponse.json(
        { error: data.message || "Failed to submit message to Web3Forms" },
        { status: response.status || 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Error in contact route:", err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
