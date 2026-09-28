"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authApi } from "@/app/lib/api";

const navigation = [
  ["Our Story", "/story"],
  ["Memories", "/vault/memories"],
  ["Letters", "/vault/letters"],
  ["Capsules", "/vault/capsules"],
] as const;

export default function VaultNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const next = visible?.target.getAttribute("data-nav");
        if (next === "light" || next === "dark") setTone(next);
      },
      { threshold: [0.28, 0.45, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  async function handleLogout() {
    try {
      await authApi.logout();
    } finally {
      window.location.href = "/login";
    }
  }

  return (
    <header className={`cine-nav cine-nav--${tone} ${menuOpen ? "is-solid" : ""}`}>
      <Link href="/vault" className="cine-brand" aria-label="Memento home">
        Memento
      </Link>

      <nav
        className={`cine-nav-links ${menuOpen ? "is-open" : ""}`}
        aria-label="Private vault navigation"
      >
        {navigation.map(([label, href]) => (
          <Link key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </Link>
        ))}
      </nav>

      <div className="cine-nav-actions">
        <button
          type="button"
          className="cine-menu"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
        </button>
        <button type="button" className="cine-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
