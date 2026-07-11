"use client";

import { useState } from "react";
import Image from "next/image";
import { PawPrint } from "lucide-react";
import type { Portrait } from "@/lib/portfolio";
import { PortraitLightbox } from "@/components/PortraitLightbox";

export function PortraitCard({ portrait }: { portrait: Portrait }) {
  const [open, setOpen] = useState(false);
  const canExpand = Boolean(portrait.image);

  return (
    <>
      <figure className="group relative h-full overflow-hidden rounded-2xl border border-line bg-cream-dark/40">
        <button
          type="button"
          disabled={!canExpand}
          onClick={() => canExpand && setOpen(true)}
          aria-label={
            canExpand
              ? `View full portrait of ${portrait.name}`
              : undefined
          }
          className={`relative aspect-[4/5] w-full overflow-hidden bg-black text-left ${
            canExpand
              ? "cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
              : "cursor-default"
          }`}
        >
          {portrait.image ? (
            <div
              className="absolute inset-0"
              style={{ transform: `scale(${portrait.zoom ?? 1})` }}
            >
              <Image
                src={portrait.image}
                alt={`Hand-drawn portrait of ${portrait.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ objectPosition: portrait.position ?? "50% 50%" }}
              />
            </div>
          ) : (
            <Placeholder name={portrait.name} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </button>
        <figcaption className="flex flex-col gap-0.5 px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 sm:px-5 sm:py-4">
          <span className="font-display text-base font-semibold text-ink sm:text-lg">
            {portrait.name}
          </span>
          <span className="text-xs uppercase tracking-wider text-ink-soft">
            {portrait.subtitle}
          </span>
        </figcaption>
      </figure>

      {open && portrait.image ? (
        <PortraitLightbox
          portrait={portrait}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}

function Placeholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-dark to-[#efe4e8]">
      <PawPrint className="mb-3 text-terracotta/40" size={40} strokeWidth={1.5} />
      <span className="font-display text-2xl text-ink/30">{name}</span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-ink/25">
        Photo coming soon
      </span>
    </div>
  );
}
