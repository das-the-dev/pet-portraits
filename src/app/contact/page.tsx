import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with questions about a pet portrait commission.",
};

const container = "mx-auto w-full max-w-6xl px-7 sm:px-8";

export default function ContactPage() {
  return (
    <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
      <div className={container}>
        <Reveal className="mb-10 sm:mb-12 lg:mb-14">
          <h1 className="font-display text-[2.35rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Contact
          </h1>
        </Reveal>

        <Reveal>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
