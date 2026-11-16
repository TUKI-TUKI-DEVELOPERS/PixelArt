const API = "";

export type CheckoutProposal = {
  templateId: number;
  templateName: string | null;
  templatePreviewUrl: string | null;
  imageUrl: string;
  protectionMode: string;
};

export type AvailableTemplate = {
  id: number;
  name: string | null;
  previewUrl: string;
};

export type CheckoutInfo = {
  orderStatus: string;
  customerName: string;
  bookName: string;
  orderId: number;
  baseAmountCents: number;
  rushFeeCents: number;
  packagePreference: 'STANDARD' | 'PREMIUM';
  extraTemplatesAmountCents: number;
  /** Promotion code already stored on the order (e.g. a retried submit). */
  appliedPromotion: { code: string; percent: number; discountCents: number } | null;
  currency: string;
  expiresAt: string;
  proposals: CheckoutProposal[];
  alreadySelectedTemplateIds: number[];
  availableTemplates: AvailableTemplate[];
  hasPaymentProof: boolean;
};

export async function getCheckoutInfo(token: string): Promise<CheckoutInfo> {
  const res = await fetch(`${API}/api/checkout/${token}`);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? "Link inválido");
  }
  return res.json();
}

export async function submitCheckout(
  token: string,
  data: {
    additionalTemplateIds: number[];
    packageType: "STANDARD" | "PREMIUM";
    paymentProof: File;
    promoCode?: string | null;
  }
): Promise<{ success: boolean; totalAmountCents: number; currency: string; message: string }> {
  const formData = new FormData();
  formData.append("packageType", data.packageType);
  formData.append("additionalTemplateIds", data.additionalTemplateIds.join(","));
  formData.append("paymentProof", data.paymentProof);
  if (data.promoCode) formData.append("promoCode", data.promoCode);

  const res = await fetch(`${API}/api/checkout/${token}/submit`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? "Error al enviar");
  }
  return res.json();
}

export type PromoPreview = {
  code: string;
  percent: number;
  discountCents: number;
  totalCents: number;
};

export async function previewCheckoutPromo(
  token: string,
  data: { code: string; packageType: "STANDARD" | "PREMIUM" }
): Promise<PromoPreview> {
  const res = await fetch(`${API}/api/checkout/${token}/promo-preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code: data.code, package: data.packageType }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const message = (err as { message?: unknown }).message;
    throw new Error(typeof message === "string" && message ? message : "No se pudo validar el código");
  }
  return res.json();
}
