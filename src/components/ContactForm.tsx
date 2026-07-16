"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("sent");
        form.reset();
      } else {
        throw new Error(data.error || "Failed");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          required
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          required
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          name="message"
          required
          rows={4}
          className="w-full px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
          placeholder="Your message..."
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "sent" && (
        <p className="text-green-600 text-sm">✅ Message sent! I will get back to you.</p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm">❌ Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
