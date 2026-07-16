import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Restrict to allowed emails if configured
    const allowedEmailsEnv = process.env.ALLOWED_EMAILS;
    if (allowedEmailsEnv) {
      const allowedList = allowedEmailsEnv
        .split(",")
        .map((e) => e.trim().toLowerCase());
      if (!allowedList.includes(email.toLowerCase())) {
        return NextResponse.json(
          { error: "Access Denied: Email not authorized" },
          { status: 403 }
        );
      }
    }

    const requestUrl = new URL(request.url);
    const redirectTo = `${requestUrl.origin}/api/auth/callback`;

    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
