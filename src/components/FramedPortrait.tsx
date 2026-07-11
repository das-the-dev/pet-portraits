import Image from "next/image";
import type { Portrait } from "@/lib/portfolio";

export function FramedPortrait({
  portrait,
  priority = false,
  sizes = "(max-width: 768px) 80vw, 40vw",
  className = "mx-auto w-full max-w-[17rem] sm:max-w-xs md:max-w-none",
}: {
  portrait: Portrait;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {/* Wall shadow */}
      <div className="relative shadow-[0_28px_60px_-18px_rgba(58,51,49,0.55),0_12px_24px_-12px_rgba(58,51,49,0.35)]">
        {/* Outer wood frame — % padding so proportions match at every size */}
        <div
          className="relative rounded-[2px]"
          style={{
            padding: "1.35%",
            background: `
              linear-gradient(
                145deg,
                #8f6f4a 0%,
                #735538 18%,
                #5c4228 42%,
                #4a3420 58%,
                #63482e 82%,
                #7a5a3a 100%
              )
            `,
            boxShadow: `
              inset 0 1px 0 rgba(255,255,255,0.22),
              inset 0 -1px 3px rgba(0,0,0,0.35),
              inset 1px 0 2px rgba(255,255,255,0.08),
              inset -1px 0 3px rgba(0,0,0,0.28)
            `,
          }}
        >
          {/* Inner rabbet — the dark groove where the mat sits */}
          <div
            className="rounded-[1px]"
            style={{
              padding: "0.7%",
              background: "linear-gradient(180deg, #2a1f17 0%, #1a120c 100%)",
              boxShadow: `
                inset 0 1px 4px rgba(0,0,0,0.6),
                inset 0 -1px 0 rgba(255,255,255,0.04)
              `,
            }}
          >
            {/* Mat board — scales with frame so grid + lightbox match */}
            <div
              className="relative"
              style={{
                padding: "2.75%",
                background: `
                  linear-gradient(
                    180deg,
                    #faf6f1 0%,
                    #f0e8df 55%,
                    #e8dfd4 100%
                  )
                `,
                boxShadow: `
                  inset 0 0 0 1px rgba(255,255,255,0.7),
                  inset 0 2px 6px rgba(0,0,0,0.08)
                `,
              }}
            >
              {/* Artwork on black paper */}
              <div className="relative aspect-[4/5] overflow-hidden bg-black shadow-[inset_0_0_0_1px_rgba(0,0,0,0.4)]">
                {portrait.image ? (
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ transform: `scale(${portrait.zoom ?? 1})` }}
                    >
                      <Image
                        src={portrait.image}
                        alt={`Hand-drawn portrait of ${portrait.name}`}
                        fill
                        sizes={sizes}
                        className="object-cover"
                        style={{
                          objectPosition: portrait.position ?? "50% 50%",
                        }}
                        priority={priority}
                      />
                    </div>
                    {/* Subtle glass reflection */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(125deg, rgba(255,255,255,0.07) 0%, transparent 42%, transparent 100%)",
                      }}
                    />
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-cream-dark to-[#efe4e8]">
                    <p className="font-display text-lg text-ink/40">Portrait</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
