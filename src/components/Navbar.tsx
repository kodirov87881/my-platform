"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profile" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/chat", label: "AI Chat" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      await supabase.auth.signOut();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Logout failed", err);
    }
  }

  const allLinks = [...publicLinks];
  if (user) {
    allLinks.push({ href: "/dashboard", label: "Dashboard" });
  }

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          MK<span className="text-[var(--primary)]">.dev</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[var(--primary)]",
                pathname === link.href
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              {link.label}
            </Link>
          ))}

          {!loading && (
            <>
              {user ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--muted)] hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-sm font-medium px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
                >
                  Login
                </Link>
              )}
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[var(--foreground)]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3">
          {allLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)]"
              )}
            >
              {link.label}
            </Link>
          ))}

          {!loading && (
            <div className="pt-2 border-t border-[var(--border)] mt-1">
              {user ? (
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left text-sm font-medium py-2 text-red-500 hover:opacity-80 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center block text-sm font-medium py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]"
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
