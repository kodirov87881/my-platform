import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
      <p className="text-lg text-[var(--muted-foreground)] mb-10">
        Have a project, question, or just want to say hi? Send me a message.
      </p>

      <div className="rounded-xl border border-[var(--border)] p-8 bg-[var(--card)]">
        <ContactForm />
      </div>

      <div className="mt-10 border-t border-[var(--border)] pt-8">
        <h2 className="text-lg font-semibold mb-3">Other ways to reach me</h2>
        <div className="space-y-2 text-sm text-[var(--muted-foreground)]">
          <p>📧 kodirov8788@gmail.com</p>
          <p>💼 Upwork: Mukhammadali Kodirov</p>
          <p>🐙 GitHub: kodirov87881</p>
          <p>📍 Kobe, Japan</p>
        </div>
      </div>
    </div>
  );
}
