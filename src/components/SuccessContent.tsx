"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import {
  sendCommissionNotification,
  type CommissionNotification,
} from "@/lib/notify";

export function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!sessionId) {
      setStatus("ready");
      return;
    }

    const storageKey = `commission-notified-${sessionId}`;
    if (sessionStorage.getItem(storageKey)) {
      setStatus("ready");
      return;
    }

    async function notify() {
      try {
        const res = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId!)}`,
        );
        const data = await res.json();
        if (!res.ok) {
          setStatus("error");
          return;
        }

        const payload: CommissionNotification = {
          customerName: data.customerName,
          email: data.email,
          phone: data.phone,
          shippingAddress: data.shippingAddress,
          size: data.size,
          petCount: data.petCount,
          memorial: data.memorial,
          total: data.total,
          notes: data.notes,
          photoUrl: data.photoUrl,
        };

        await sendCommissionNotification(payload);
        sessionStorage.setItem(storageKey, "1");
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }

    notify();
  }, [sessionId]);

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-7 py-16 text-center sm:px-8 sm:py-24 lg:py-28">
      <CheckCircle2 className="mb-6 text-sage" size={56} strokeWidth={1.5} />
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
        Thank you — your portrait is reserved!
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-soft">
        Your payment came through and I can&rsquo;t wait to start. I&rsquo;ll be
        in touch soon to confirm the details of your commission.
      </p>

      {status === "loading" && (
        <p className="mt-6 text-sm text-ink-soft">Finalizing your order…</p>
      )}
      {status === "error" && (
        <p className="mt-6 text-sm text-ink-soft">
          Your payment went through. If you don&rsquo;t hear from me within a day,
          please reach out — your order is safe in our system.
        </p>
      )}

      <Link
        href="/"
        className="mt-10 text-sm font-semibold text-ink-soft hover:text-ink"
      >
        ← Back to home
      </Link>
    </section>
  );
}
