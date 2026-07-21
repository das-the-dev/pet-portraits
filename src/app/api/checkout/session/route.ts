import { NextResponse } from "next/server";
import Stripe from "stripe";
import { sizeOptions } from "@/lib/pricing";
import { formatShippingAddress } from "@/lib/notify";

export async function GET(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!secret) {
    return NextResponse.json(
      { error: "Payments are not configured." },
      { status: 503 },
    );
  }

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session." }, { status: 400 });
  }

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed." },
        { status: 400 },
      );
    }

    const md = session.metadata ?? {};
    const size = sizeOptions.find((s) => s.id === md.sizeId);
    const shipping = session.collected_information?.shipping_details;
    const customer = session.customer_details;

    return NextResponse.json({
      customerName: shipping?.name ?? customer?.name ?? "—",
      email: customer?.email ?? "—",
      phone: customer?.phone ?? "",
      shippingAddress: formatShippingAddress(
        shipping?.address ?? customer?.address ?? undefined,
      ),
      size: size ? `${size.label} (${size.dimensions})` : md.sizeId ?? "—",
      petCount: Number(md.petCount) || 1,
      signature:
        md.signature === "front"
          ? "Front"
          : md.signature === "back"
            ? "Back"
            : "None",
      memorial: md.memorial === "yes",
      total: md.total ?? "—",
      notes: md.notes ?? "",
      photoUrl: md.photoUrl ?? "",
    });
  } catch (err) {
    console.error("Session retrieve error:", err);
    return NextResponse.json(
      { error: "Could not load payment details." },
      { status: 500 },
    );
  }
}
