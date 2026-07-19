import Link from "next/link";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream-dark/40">
      <div className="mx-auto w-full max-w-6xl px-7 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-2xl font-semibold text-ink">
              {site.name}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <Link href="/portfolio" className="text-ink-soft hover:text-ink">
              Portfolio
            </Link>
            <Link href="/commission" className="text-ink-soft hover:text-ink">
              Request a Commission
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="text-ink-soft hover:text-ink"
            >
              {site.email}
            </a>
          </div>

          <div className="flex gap-4">
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-ink-soft transition-colors hover:text-terracotta"
              >
                <InstagramIcon size={20} />
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-ink-soft transition-colors hover:text-terracotta"
              >
                <FacebookIcon size={20} />
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              aria-label="Email"
              className="text-ink-soft transition-colors hover:text-terracotta"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-6 text-xs text-ink-soft sm:mt-10">
          © {year} {site.name}. All artwork is original and hand-drawn.
        </div>
      </div>
    </footer>
  );
}
