import type { Metadata } from "next";
import { Suspense } from "react";
import { SuccessContent } from "@/components/SuccessContent";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your commission request has been received.",
};

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <section className="mx-auto max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
          <p className="text-ink-soft">Loading…</p>
        </section>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
