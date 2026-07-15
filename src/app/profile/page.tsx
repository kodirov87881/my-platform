import { siteConfig } from "@/lib/utils";

export default function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Profile</h1>
      <p className="text-lg text-[var(--muted-foreground)] mb-10">
        {siteConfig.title}
      </p>

      {/* About */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">About Me</h2>
        <p className="text-[var(--muted-foreground)] leading-relaxed">
          I am a developer based in <strong>{siteConfig.location}</strong>. I
          work at QuinQue (The Edge) building web applications. I am learning
          English to get a $100K+ remote job. I believe in the power of
          daily practice — if you do something every day, you become a
          professional.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {siteConfig.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1.5 rounded-full text-sm border border-[var(--border)] bg-[var(--muted)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Experience</h2>
        {siteConfig.experience.map((exp, i) => (
          <div
            key={i}
            className="border border-[var(--border)] rounded-xl p-5 bg-[var(--card)]"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">{exp.role}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">
                  {exp.company} — {exp.location}
                </p>
              </div>
              <span className="text-xs text-[var(--muted-foreground)] bg-[var(--muted)] px-2 py-0.5 rounded">
                {exp.period}
              </span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)] mt-2">
              {exp.description}
            </p>
          </div>
        ))}
      </section>

      {/* Goals */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Goals</h2>
        <ul className="space-y-2">
          {siteConfig.goals.map((goal, i) => (
            <li key={i} className="flex items-center gap-2 text-[var(--muted-foreground)]">
              <span className="text-[var(--primary)]">→</span> {goal}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
