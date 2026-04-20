const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

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
  customerName: string;
  bookName: string;
  orderId: number;
  baseAmountCents: number;
  extraTemplatesAmountCents: number;
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
  }
): Promise<{ success: boolean; totalAmountCents: number; currency: string; message: string }> {
  const formData = new FormData();
  formData.append("packageType", data.packageType);
  formData.append("additionalTemplateIds", data.additionalTemplateIds.join(","));
  formData.append("paymentProof", data.paymentProof);

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
