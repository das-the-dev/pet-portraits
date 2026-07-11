import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPortfolio } from "@/lib/portfolio";
import { Reveal } from "@/components/Reveal";
import { PortraitCard } from "@/components/PortraitCard";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A gallery of hand-drawn pet portraits.",
};

export const dynamic = "force-dynamic";

const container = "mx-auto w-full max-w-6xl px-7 sm:px-8";

export default function PortfolioPage() {
  const portfolio = getPortfolio();

  return (
    <>
      <section className="pt-12 sm:pt-16 lg:pt-20">
        <div className={container}>
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow text-terracotta">Portfolio</p>
              <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                Gallery
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
                Every portrait below was hand-drawn from a photo sent by someone
                who loves their pet. Yours could be next.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24">
        <div className={container}>
          <div className="grid grid-cols-2 gap-3.5 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {portfolio.map((portrait) => (
              <Reveal key={portrait.id}>
                <PortraitCard portrait={portrait} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 rounded-2xl border border-line bg-cream-dark/40 px-6 py-10 text-center sm:mt-16 sm:rounded-3xl sm:px-8 sm:py-14">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Ready to commission yours?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft sm:mt-4 sm:text-base">
              Tell me about your pet and I&rsquo;ll create a portrait you&rsquo;ll
              treasure.
            </p>
            <Link
              href="/commission"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright sm:mt-7"
            >
              Request a Portrait <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
