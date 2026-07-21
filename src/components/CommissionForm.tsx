"use client";

import { useMemo, useRef, useState } from "react";
import { Loader2, ArrowRight, Heart, ImagePlus } from "lucide-react";
import {
  sizeOptions,
  calculateQuote,
  formatUSD,
  memorialDiscountPercent,
  depositFraction,
  maxPets,
  additionalPetPrice,
} from "@/lib/pricing";

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

type SignaturePlacement = "front" | "back" | "none";

export function CommissionForm() {
  const sizeId = sizeOptions[0].id;
  const [petCount, setPetCount] = useState(1);
  const [signature, setSignature] = useState<SignaturePlacement>("none");
  const [memorial, setMemorial] = useState(false);
  const [notes, setNotes] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const quote = useMemo(
    () => calculateQuote({ sizeId, petCount, memorial }),
    [sizeId, petCount, memorial],
  );

  function handleFile(file?: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, etc.).");
      return;
    }
    setError("");
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  async function uploadPhoto(): Promise<string> {
    if (!photo || !CLOUDINARY_CLOUD || !CLOUDINARY_PRESET) return "";
    const fd = new FormData();
    fd.append("file", photo);
    fd.append("upload_preset", CLOUDINARY_PRESET);
    try {
      const r = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`,
        { method: "POST", body: fd },
      );
      const j = await r.json();
      return j.secure_url ?? "";
    } catch {
      return "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    setSubmitting(true);
    try {
      const photoUrl = await uploadPhoto();

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sizeId,
          petCount,
          signature,
          memorial,
          notes,
          photoUrl,
        }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.configured === false) {
        setError(
          "Online payment isn't set up yet. Please check back soon, or reach out on Instagram to place an order.",
        );
        return;
      }
      setError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-14 xl:gap-16"
    >
      <div className="space-y-8 sm:space-y-9">
        <Fieldset legend="How many pets in the portrait?">
          <div className="flex items-center gap-4">
            <Stepper value={petCount} onChange={setPetCount} min={1} max={maxPets} />
            <span className="text-sm text-ink-soft">
              {petCount === 1
                ? "Just one beloved companion"
                : `${petCount} pets together`}
            </span>
          </div>
          <p className="mt-2 text-xs text-ink-soft">
            Up to {maxPets} pets in a single portrait. Each additional pet is{" "}
            {formatUSD(additionalPetPrice)}.
          </p>
        </Fieldset>

        <Fieldset legend="Signature">
          <div className="flex flex-wrap gap-2.5">
            {(
              [
                { id: "none" as const, label: "None" },
                { id: "front" as const, label: "Front" },
                { id: "back" as const, label: "Back" },
              ] as const
            ).map((option) => (
              <label
                key={option.id}
                className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  signature === option.id
                    ? "border-terracotta bg-terracotta/10 text-ink"
                    : "border-line bg-cream text-ink-soft hover:border-ink/30 hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="signature"
                  className="sr-only"
                  checked={signature === option.id}
                  onChange={() => setSignature(option.id)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </Fieldset>

        <Fieldset legend="Your pet's photo">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          {photoPreview ? (
            <div className="flex items-center gap-4 rounded-xl border border-line bg-cream p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photoPreview}
                alt="Your selected pet photo"
                className="h-20 w-20 shrink-0 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">
                  {photo?.name}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPhoto(null);
                    setPhotoPreview("");
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="mt-1 text-xs font-medium text-terracotta hover:underline"
                >
                  Remove / choose another
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
                dragOver
                  ? "border-terracotta bg-terracotta/5"
                  : "border-line bg-cream hover:border-ink/30"
              }`}
            >
              <ImagePlus className="text-terracotta" size={28} />
              <span className="text-sm font-medium text-ink">
                Drag a photo here, or click to choose
              </span>
              <span className="max-w-sm text-xs text-ink-soft">
                Please use a clear photo of your pet taken at a good angle and in
                the best lighting possible. Natural daylight, facing the camera,
                gives me the most detail to work from.
              </span>
            </button>
          )}
        </Fieldset>

        <Fieldset legend="Notes">
          <label className="mb-1.5 block text-sm text-ink-soft">
            Pet names, special requests, framing ideas, deadlines, or anything
            else I should know.
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="e.g. This is for my dog Bailey — I'd love a soft, warm expression…"
            className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink-soft/60 focus:border-terracotta"
          />
        </Fieldset>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-sage/10 p-4">
          <input
            type="checkbox"
            checked={memorial}
            onChange={(e) => setMemorial(e.target.checked)}
            className="mt-1 h-4 w-4 accent-terracotta"
          />
          <span className="text-sm leading-relaxed text-ink">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Heart size={14} className="text-terracotta" /> This is a memorial
              portrait.
            </span>{" "}
            <span className="text-ink-soft">
              If you&rsquo;ve recently lost your companion, a{" "}
              {memorialDiscountPercent}% discount will be applied with my sincere
              condolences.
            </span>
          </span>
        </label>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-line bg-cream-dark/40 p-5 sm:p-6">
          <h3 className="font-display text-xl font-semibold text-ink">
            Your estimate
          </h3>
          <dl className="mt-5 space-y-3 text-sm">
            <Row
              label={`${sizeOptions[0].dimensions} portrait`}
              value={formatUSD(quote.base)}
            />
            {quote.additionalPets > 0 && (
              <Row
                label="Additional pets"
                value={formatUSD(quote.additionalPets)}
              />
            )}
            {quote.discount > 0 && (
              <Row
                label={`Memorial discount (${memorialDiscountPercent}%)`}
                value={`−${formatUSD(quote.discount)}`}
                accent
              />
            )}
            <div className="border-t border-line pt-3">
              <Row label="Total due" value={formatUSD(quote.total)} bold />
            </div>
          </dl>

          {error && (
            <p className="mt-4 rounded-lg bg-terracotta/10 px-3 py-2 text-sm text-terracotta">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-terracotta-bright disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Just a moment…
              </>
            ) : (
              <>
                Proceed to checkout <ArrowRight size={16} />
              </>
            )}
          </button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            On the next page, we&rsquo;ll collect your contact info, shipping
            address, and payment securely.
          </p>
        </div>
      </div>
    </form>
  );
}

function Fieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-display text-lg font-semibold text-ink">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-cream">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-10 w-10 items-center justify-center text-lg text-ink-soft hover:text-ink"
        aria-label="Fewer pets"
      >
        −
      </button>
      <span className="w-8 text-center font-semibold text-ink">{value}</span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-10 w-10 items-center justify-center text-lg text-ink-soft hover:text-ink"
        aria-label="More pets"
      >
        +
      </button>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className={`${bold ? "font-semibold text-ink" : "text-ink-soft"}`}>
        {label}
      </dt>
      <dd
        className={`${
          bold
            ? "font-display text-lg font-semibold text-ink"
            : accent
              ? "font-semibold text-terracotta"
              : "text-ink"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}
