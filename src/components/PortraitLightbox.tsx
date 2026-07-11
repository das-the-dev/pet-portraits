"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { Portrait } from "@/lib/portfolio";
import { FramedPortrait } from "@/components/FramedPortrait";

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
      aria-label={`Larger view of ${portrait.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-5 py-12 backdrop-blur-sm sm:px-10 sm:py-16"
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
        className="flex w-full max-w-[min(28rem,calc((100dvh-12rem)*0.8))] flex-col items-center sm:max-w-[min(32rem,calc((100dvh-13rem)*0.8))]"
        onClick={(e) => e.stopPropagation()}
      >
        <FramedPortrait
          portrait={portrait}
          className="w-full"
          sizes="(max-width: 768px) 90vw, 560px"
          priority
        />
        <figcaption className="mt-6 shrink-0 text-center sm:mt-8">
          <p className="font-display text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
            {portrait.name}
          </p>
        </figcaption>
      </figure>
    </div>
  );
}
