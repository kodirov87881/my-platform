import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20">
      {/* Hero Section */}
      <section className="text-center mb-24">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          Mukhammadali <span className="text-[var(--primary)]">Kodirov</span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-4">
          Full-Stack Developer & AI Automation Engineer
        </p>
        <p className="text-lg text-[var(--muted-foreground)] mb-10 max-w-2xl mx-auto">
          Based in Kobe, Japan. Building web apps, AI agents, and automation
          systems. My goal: $100K+ remote job.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/profile"
            className="px-6 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-medium hover:opacity-90 transition-opacity"
          >
            View Profile
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--muted)] transition-colors"
          >
            Chat with AI
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border border-[var(--border)] font-medium hover:bg-[var(--muted)] transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </section>

      {/* Quick Features */}
      <section className="grid md:grid-cols-3 gap-6 mb-24">
        <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)]">
          <h3 className="font-semibold text-lg mb-2">🤖 AI Chatbot</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Ask about my skills, experience, or get help with your project.
          </p>
          <Link href="/chat" className="text-sm text-[var(--primary)] hover:underline">
            Try it →
          </Link>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)]">
          <h3 className="font-semibold text-lg mb-2">⚡ Agent Workflows</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Automate LinkedIn, Instagram, news — all from one dashboard.
          </p>
          <Link href="/dashboard" className="text-sm text-[var(--primary)] hover:underline">
            View workflows →
          </Link>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)]">
          <h3 className="font-semibold text-lg mb-2">🌍 Remote Ready</h3>
          <p className="text-sm text-[var(--muted-foreground)] mb-4">
            Experienced with React, Node.js, AI, and cloud deployment.
          </p>
          <Link href="/profile" className="text-sm text-[var(--primary)] hover:underline">
            See skills →
          </Link>
        </div>
      </section>

      {/* Philosophy */}
      <section className="text-center border-t border-[var(--border)] pt-16">
        <h2 className="text-2xl font-bold mb-4">My Philosophy</h2>
        <blockquote className="text-lg text-[var(--muted-foreground)] italic max-w-2xl mx-auto">
          &ldquo;If you do something once, you get experience. Do it many times,
          you become a professional. Knowledge from work is the password to
          success.&rdquo;
        </blockquote>
      </section>
    </div>
  );
}
