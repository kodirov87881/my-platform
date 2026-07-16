"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(60);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!email) {
      router.push("/login");
      return;
    }

    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer, email, router]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || loading || !email) return;

    setLoading(true);
    setError(null);
    setResendMessage(null);

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Invalid verification code.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to verify. Please check code.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (resendTimer > 0 || resendLoading || !email) return;

    setResendLoading(true);
    setError(null);
    setResendMessage(null);

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send code.");
      }

      setResendMessage("Code resent successfully!");
      setResendTimer(60);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to resend code.";
      setError(message);
    } finally {
      setResendLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Security Check</h1>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">
          Enter the 6-digit code sent to <span className="font-semibold text-[var(--foreground)]">{email}</span>
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {resendMessage && (
        <div className="mb-6 rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-sm text-green-600 dark:text-green-400">
          {resendMessage}
        </div>
      )}

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label
            htmlFor="code"
            className="block text-sm font-medium text-[var(--foreground)] mb-2"
          >
            Verification Code
          </label>
          <input
            id="code"
            name="code"
            type="text"
            required
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            placeholder="123456"
            className="w-full px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--background)] text-center text-xl font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={loading || code.length < 6}
          className="w-full py-3 px-4 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      <div className="mt-6 flex justify-between text-xs text-[var(--muted-foreground)]">
        <button
          onClick={handleResend}
          disabled={resendTimer > 0 || resendLoading}
          className="hover:text-[var(--foreground)] transition-colors disabled:opacity-50 cursor-pointer"
        >
          {resendTimer > 0 ? `Resend code in ${resendTimer}s` : "Resend Code"}
        </button>
        <Link
          href="/login"
          className="hover:text-[var(--foreground)] transition-colors"
        >
          Change Email
        </Link>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-[var(--muted-foreground)]">Loading verification form...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
