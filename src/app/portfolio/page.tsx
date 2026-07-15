import { services, stats, projects, testimonials } from "@/lib/portfolio-data";
import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          What I <span className="text-[var(--primary)]">Build</span>
        </h1>
        <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mx-auto">
          Full-stack developer specializing in web apps, AI integration, APIs,
          and automation. I help businesses save time and grow with technology.
        </p>
      </div>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[var(--border)] p-5 bg-[var(--card)] text-center"
          >
            <p className="text-3xl font-bold text-[var(--primary)]">
              {stat.value}
            </p>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)] hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl mb-3">{service.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                {service.description}
              </p>
              <ul className="space-y-1 mb-4">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-[var(--muted-foreground)] flex items-center gap-1.5"
                  >
                    <span className="text-[var(--primary)]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{service.price}</span>
                <Link
                  href="/contact"
                  className="text-xs px-3 py-1.5 rounded-lg bg-[var(--primary)] text-white hover:opacity-90 transition-opacity"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)]"
            >
              <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--muted)] border border-[var(--border)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  className="text-sm text-[var(--primary)] hover:underline"
                >
                  View Live →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Why Work With Me</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-xl border border-[var(--border)] p-6 bg-[var(--card)]"
            >
              <p className="text-sm text-[var(--muted-foreground)] italic mb-3">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium">{t.author}</p>
                <p className="text-xs text-[var(--muted-foreground)]">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center rounded-xl border border-[var(--border)] p-12 bg-[var(--card)]">
        <h2 className="text-2xl font-bold mb-3">Ready to Build Something?</h2>
        <p className="text-[var(--muted-foreground)] mb-6 max-w-lg mx-auto">
          Tell me about your project. I will give you a free estimate within 24
          hours.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 rounded-lg bg-[var(--primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Start a Project
        </Link>
      </section>
    </div>
  );
}
