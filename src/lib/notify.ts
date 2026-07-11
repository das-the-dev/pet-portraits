import { formatUSD, memorialDiscountPercent } from "@/lib/pricing";
import { site } from "@/lib/site";

const MEDIUM = "Colored Pencil";

export type CommissionNotification = {
  customerName: string;
  email: string;
  phone?: string;
  shippingAddress: string;
  size: string;
  petCount: number;
  memorial: boolean;
  total: string;
  notes: string;
  photoUrl: string;
};

export async function sendCommissionNotification(
  data: CommissionNotification,
): Promise<boolean> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!key) return false;

  const fd = new FormData();
  fd.append("access_key", key);
  fd.append("subject", "New paid portrait commission");
  fd.append("from_name", `${site.name} website`);
  fd.append("name", data.customerName);
  fd.append("email", data.email);
  if (data.phone) fd.append("Phone", data.phone);
  fd.append("Shipping address", data.shippingAddress);
  fd.append("Size", data.size);
  fd.append("Number of pets", String(data.petCount));
  fd.append("Medium", MEDIUM);
  fd.append(
    "Memorial",
    data.memorial
      ? `Yes (${memorialDiscountPercent}% discount)`
      : "No",
  );
  fd.append("Total paid", data.total);
  fd.append("Notes", data.notes || "—");
  fd.append("Photo", data.photoUrl || "Not provided");

  try {
    const r = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: fd,
    });
    const j = await r.json();
    return Boolean(j.success);
  } catch {
    return false;
  }
}

export function formatShippingAddress(addr?: {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
}): string {
  if (!addr) return "—";
  const lines = [
    addr.line1,
    addr.line2,
    [addr.city, addr.state, addr.postal_code].filter(Boolean).join(", "),
    addr.country,
  ].filter(Boolean);
  return lines.join("\n");
}
