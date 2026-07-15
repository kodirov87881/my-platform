export default function DashboardPage() {
  const workflows = [
    {
      name: "Post to LinkedIn",
      description: "AI generates a post and publishes to LinkedIn",
      status: "Coming soon",
      icon: "💼",
    },
    {
      name: "Post to Instagram",
      description: "Create and schedule Instagram posts with AI images",
      status: "Coming soon",
      icon: "📸",
    },
    {
      name: "Daily News Brief",
      description: "Get curated AI and tech news every morning",
      status: "Coming soon",
      icon: "📰",
    },
    {
      name: "English Practice",
      description: "Daily words + speaking practice track",
      status: "Active via Telegram",
      icon: "🗣️",
    },
    {
      name: "Math Problems",
      description: "Daily math problems to sharpen your mind",
      status: "Active via Telegram",
      icon: "🧮",
    },
    {
      name: "Auto Job Search",
      description: "Find and apply to matching remote jobs",
      status: "Coming soon",
      icon: "🔍",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
      <p className="text-lg text-[var(--muted-foreground)] mb-10">
        Your personal AI control center
      </p>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
          <p className="text-2xl font-bold text-[var(--primary)]">3</p>
          <p className="text-xs text-[var(--muted-foreground)]">Active Workflows</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
          <p className="text-2xl font-bold text-[var(--primary)]">3</p>
          <p className="text-xs text-[var(--muted-foreground)]">Daily Habits</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
          <p className="text-2xl font-bold text-[var(--primary)]">$7K+</p>
          <p className="text-xs text-[var(--muted-foreground)]">Upwork Earned</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] p-4 bg-[var(--card)]">
          <p className="text-2xl font-bold text-[var(--primary)]">100%</p>
          <p className="text-xs text-[var(--muted-foreground)]">Job Success</p>
        </div>
      </section>

      {/* Workflows */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Workflows & Automations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {workflows.map((wf) => (
            <div
              key={wf.name}
              className="rounded-xl border border-[var(--border)] p-5 bg-[var(--card)]"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{wf.icon}</span>
                  <div>
                    <h3 className="font-medium">{wf.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)]">
                      {wf.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    wf.status === "Coming soon"
                      ? "bg-yellow-500/10 text-yellow-600"
                      : "bg-green-500/10 text-green-600"
                  }`}
                >
                  {wf.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
