import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, PencilLine, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";
import { getFeatured } from "@/lib/portfolio";
import { getArtistPhoto } from "@/lib/about";
import { sizeOptions, formatUSD, memorialDiscountPercent } from "@/lib/pricing";
import { Reveal } from "@/components/Reveal";
import { PortraitCard } from "@/components/PortraitCard";
import { FramedPortrait } from "@/components/FramedPortrait";

export const dynamic = "force-dynamic";

const container = "mx-auto w-full max-w-6xl px-7 sm:px-8";

export default function HomePage() {
  const startingPrice = Math.min(...sizeOptions.map((s) => s.price));
  const featuredPortraits = getFeatured();
  const heroPortrait = featuredPortraits[0];
  const artistPhoto = getArtistPhoto();

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div
          className={`${container} grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-16`}
        >
          <Reveal>
            {heroPortrait && (
              <FramedPortrait portrait={heroPortrait} priority />
            )}
          </Reveal>

          <Reveal>
            <p className="eyebrow text-terracotta">Hand-Drawn Pet Portraits</p>
            <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-ink sm:mt-4 sm:text-5xl lg:text-[3.25rem]">
              Commission a portrait of your{" "}
              <span className="text-terracotta">beloved pet</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
              {site.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <Link
                href="/commission"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright"
              >
                Request a Portrait <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
              >
                View the Gallery
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              8&quot; × 10&quot; portraits from{" "}
              <span className="font-semibold text-ink">
                {formatUSD(startingPrice)}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line py-14 sm:py-20 lg:py-24">
        <div className={container}>
          <Reveal className="mb-10 sm:mb-12">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl lg:text-5xl">
              The Process
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-3 md:gap-8">
            {[
              {
                icon: PencilLine,
                title: "Share your photo",
                body: "Fill out a short request with a clear photo of your pet. I'll confirm the details with you.",
              },
              {
                icon: Heart,
                title: "I bring them to life",
                body: "I carefully draw your portrait in colored pencil, taking the time to capture every detail.",
              },
              {
                icon: CheckCircle2,
                title: "The finished piece",
                body: "I'll send a confirmation once it's complete and it will be delivered to your doorstep.",
              },
            ].map((step) => (
              <Reveal key={step.title}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-cream p-6 sm:p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-terracotta/10 text-terracotta sm:h-12 sm:w-12">
                    <step.icon size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink sm:mt-5 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-cream-dark/30 py-14 sm:py-20 lg:py-24">
        <div className={container}>
          <Reveal className="mb-10 flex items-end justify-between gap-4 sm:mb-12">
            <div>
              <p className="eyebrow text-terracotta">Selected Work</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:mt-3 sm:text-4xl lg:text-5xl">
                A few favorites
              </h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden shrink-0 items-center gap-2 pb-1 text-sm font-semibold text-ink hover:text-terracotta sm:inline-flex"
            >
              See all <ArrowRight size={16} />
            </Link>
          </Reveal>

          <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-7 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
            {featuredPortraits.slice(0, 4).map((portrait) => (
              <Reveal key={portrait.id}>
                <PortraitCard portrait={portrait} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink"
            >
              See all portraits <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Memorial */}
      <section className="border-y border-line bg-sage/10 py-14 sm:py-20 lg:py-24">
        <div className={`${container} max-w-2xl text-center`}>
          <Reveal>
            <Heart
              className="mx-auto mb-4 text-terracotta sm:mb-5"
              size={28}
              strokeWidth={1.5}
            />
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              For the ones we&rsquo;ve lost
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              If you&rsquo;ve recently said goodbye to a companion, I offer a{" "}
              <span className="font-semibold text-ink">
                {memorialDiscountPercent}% memorial discount
              </span>
              . Simply check the box in the request form.
            </p>
            <Link
              href="/commission"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright sm:mt-8"
            >
              Begin a portrait <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* About */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div
          className={`${container} grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-16`}
        >
          <Reveal>
            <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-2xl border border-line bg-cream-dark md:mx-0 md:max-w-none md:rounded-[2rem]">
              {artistPhoto ? (
                <Image
                  src={artistPhoto}
                  alt={`${site.artistName}, pet portrait artist`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream-dark to-[#efe4e8]">
                  <p className="px-8 text-center font-display text-xl text-ink/40">
                    A photo of you goes here
                  </p>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal>
            <p className="eyebrow text-terracotta">About the Artist</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:mt-3 sm:text-4xl lg:text-5xl">
              Hi, I&rsquo;m {site.artistName}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-lg">
              I&rsquo;ve been drawing animals since I could first pick up a
              pencil. My cat is my best friend, and capturing the personality
              of your pet and the companionship they bring is what I strive to
              do.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
