"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    if (!WEB3FORMS_KEY) {
      setError("The contact form isn’t available right now. Please try again later.");
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_KEY);
      fd.append("subject", "New message from the website");
      fd.append("from_name", `${site.name} contact form`);
      fd.append("name", name.trim());
      fd.append("email", email.trim());
      fd.append("message", message.trim());

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();

      if (!data.success) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-line bg-cream-dark/40 px-6 py-10 text-center sm:px-8 sm:py-12">
        <CheckCircle2
          className="mx-auto mb-4 text-sage"
          size={40}
          strokeWidth={1.5}
        />
        <h2 className="font-display text-2xl font-semibold text-ink">
          Message sent
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft sm:text-base">
          Thanks for reaching out — I&rsquo;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm font-semibold text-terracotta hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-5">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-ink">
          Your name
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-ink">
          Your email
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-terracotta"
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-terracotta"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
