"use client";

import { useState } from "react";
import type { Portrait } from "@/lib/portfolio";
import { FramedPortrait } from "@/components/FramedPortrait";
import { PortraitLightbox } from "@/components/PortraitLightbox";

export function PortraitCard({ portrait }: { portrait: Portrait }) {
  const [open, setOpen] = useState(false);
  const canExpand = Boolean(portrait.image);

  return (
    <>
      <figure className="flex h-full flex-col items-center">
        <button
          type="button"
          disabled={!canExpand}
          onClick={() => canExpand && setOpen(true)}
          aria-label={
            canExpand ? `View larger portrait of ${portrait.name}` : undefined
          }
          className={`w-full text-left transition-transform duration-500 ease-out ${
            canExpand
              ? "cursor-zoom-in hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta"
              : "cursor-default"
          }`}
        >
          <FramedPortrait
            portrait={portrait}
            className="w-full"
            sizes="(max-width: 768px) 45vw, 25vw"
          />
        </button>
        <figcaption className="mt-4 text-center sm:mt-5">
          <span className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
            {portrait.name}
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
