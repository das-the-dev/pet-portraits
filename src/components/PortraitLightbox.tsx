"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { Portrait } from "@/lib/portfolio";

export function PortraitLightbox({
  portrait,
  onClose,
}: {
  portrait: Portrait;
  onClose: () => void;
}) {
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Full view of ${portrait.name}`}
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/85 p-4 backdrop-blur-sm sm:items-center sm:p-8"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full bg-cream/10 p-2.5 text-cream transition-colors hover:bg-cream/20 sm:right-6 sm:top-6"
      >
        <X size={22} strokeWidth={1.75} />
      </button>

      <figure
        className="flex w-full max-w-3xl flex-col items-center gap-4 sm:gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[min(72vh,780px)] w-full overflow-hidden rounded-sm bg-[#0c0a09] shadow-[0_24px_80px_-20px_rgba(0,0,0,0.65)]">
          {portrait.image ? (
            <Image
              src={portrait.image}
              alt={`Hand-drawn portrait of ${portrait.name}`}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-contain"
              priority
            />
          ) : null}
        </div>

        <figcaption className="text-center">
          <p className="font-display text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
            {portrait.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/65">
            {portrait.subtitle}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
