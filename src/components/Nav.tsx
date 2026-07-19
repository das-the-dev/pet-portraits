"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Examples" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-cream/90 backdrop-blur border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-7 py-4 sm:px-8 sm:py-5">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {site.name}
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/commission"
            className="rounded-full bg-terracotta px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright"
          >
            Commission a Portrait
          </Link>
        </div>

        <button
          className="text-ink md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto w-full max-w-6xl border-t border-line bg-cream px-7 py-5 sm:px-8 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base font-medium text-ink"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/commission"
              className="rounded-full bg-terracotta px-5 py-2 text-center text-sm font-semibold text-cream"
              onClick={() => setOpen(false)}
            >
              Commission a Portrait
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
