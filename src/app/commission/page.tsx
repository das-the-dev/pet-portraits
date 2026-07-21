import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { CommissionForm } from "@/components/CommissionForm";
import { sizeOptions, formatUSD } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Request a Commission",
  description: "Commission a custom hand-drawn portrait of your pet.",
};

const container = "mx-auto w-full max-w-6xl px-7 sm:px-8";

export default function CommissionPage() {
  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className={container}>
        <Reveal className="mb-10 max-w-2xl sm:mb-12 lg:mb-14">
          <p className="eyebrow text-terracotta">Request a Commission</p>
          <h1 className="mt-3 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Let&rsquo;s capture your pet
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ink-soft sm:mt-6 sm:text-lg">
            Each portrait is an 8&quot; × 10&quot; colored pencil drawing on
            Stonehenge aqua coldpress aluminum black panels for{" "}
            {formatUSD(sizeOptions[0].price)}, including US shipping. Choose your
            options below and you&rsquo;ll see your estimate. On the next page,
            we&rsquo;ll securely collect your contact info, shipping address, and
            payment.
          </p>
        </Reveal>

        <Reveal>
          <CommissionForm />
        </Reveal>
      </div>
    </section>
  );
}
