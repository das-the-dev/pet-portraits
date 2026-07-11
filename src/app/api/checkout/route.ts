import { NextResponse } from "next/server";
import Stripe from "stripe";
import { calculateQuote, formatUSD, sizeOptions, maxPets } from "@/lib/pricing";
import { site } from "@/lib/site";

/*
  Creates a Stripe Checkout session.

  Your form collects commission details (size, pets, memorial, notes, photo).
  Stripe collects contact info, shipping address, and payment.
*/

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const sizeId = String(body.sizeId ?? "");
  const petCount = Math.max(1, Math.min(maxPets, Number(body.petCount) || 1));
  const memorial = Boolean(body.memorial);
  const notes = String(body.notes ?? "").slice(0, 480);
  const photoUrl = String(body.photoUrl ?? "").slice(0, 480);

  if (!sizeOptions.some((s) => s.id === sizeId)) {
    return NextResponse.json({ error: "Please choose a size." }, { status: 400 });
  }

  const quote = calculateQuote({ sizeId, petCount, memorial });

  if (!secret) {
    return NextResponse.json({ configured: false, quote });
  }

  const stripe = new Stripe(secret);
  const origin =
    req.headers.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000";

  const size = sizeOptions.find((s) => s.id === sizeId)!;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      phone_number_collection: {
        enabled: true,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: quote.depositDue * 100,
            product_data: {
              name: `Custom pet portrait — ${size.label} (${size.dimensions})`,
              description: `${petCount} pet${petCount > 1 ? "s" : ""} · Colored pencil${
                memorial ? " · memorial discount applied" : ""
              }`,
            },
          },
        },
      ],
      metadata: {
        sizeId,
        petCount: String(petCount),
        memorial: memorial ? "yes" : "no",
        total: formatUSD(quote.total),
        notes,
        photoUrl,
        studio: site.name,
      },
      success_url: `${origin}/commission/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/commission?canceled=1`,
    });

    return NextResponse.json({ configured: true, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
