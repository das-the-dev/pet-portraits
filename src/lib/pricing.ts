/*
  ─────────────────────────────────────────────────────────────
  PRICING  —  edit the numbers here to set your commission prices.
  All prices are in whole US dollars.
  ─────────────────────────────────────────────────────────────
*/

export type SizeOption = {
  id: string;
  label: string;
  dimensions: string;
  price: number;
};

// Base price for a single-pet portrait at each size.
// Price includes US shipping (materials, packaging, and postage).
export const sizeOptions: SizeOption[] = [
  { id: "small", label: '8" × 10"', dimensions: '8" × 10"', price: 200 },
];

// The most pets you'll draw together in one portrait.
export const maxPets = 3;

// Added for each pet beyond the first in the same portrait.
export const additionalPetPrice = 75;

// Memorial / "death in the family" discount, as a percentage off (0–100).
export const memorialDiscountPercent = 15;

// What fraction of the total is collected up front (0–1).
// 1 = the full price is paid up front. Lower it (e.g. 0.5) to take a
// partial deposit instead, with the rest due on completion.
export const depositFraction = 1;

export type Quote = {
  base: number;
  additionalPets: number;
  subtotal: number;
  discount: number;
  total: number;
  depositDue: number;
};

export function calculateQuote(opts: {
  sizeId: string;
  petCount: number;
  memorial: boolean;
}): Quote {
  const size = sizeOptions.find((s) => s.id === opts.sizeId) ?? sizeOptions[0];
  const extraPets = Math.max(0, opts.petCount - 1);
  const additionalPets = extraPets * additionalPetPrice;
  const subtotal = size.price + additionalPets;
  const discount = opts.memorial
    ? Math.round((subtotal * memorialDiscountPercent) / 100)
    : 0;
  const total = subtotal - discount;
  const depositDue = Math.round(total * depositFraction);
  return { base: size.price, additionalPets, subtotal, discount, total, depositDue };
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
}
