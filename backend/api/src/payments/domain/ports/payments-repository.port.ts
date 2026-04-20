export type CreatePaymentProofData = {
  orderId: number;
  storageKey: string;
  originalFilename: string | null;
  mimeType: string | null;
  sizeBytes: number | null;
  paymentMethod: string;
  amountCents: number;
};

export type PaymentProofRecord = {
  id: number;
  orderId: number;
  storageKey: string;
  paymentMethod: string;
  amountCents: number;
  status: string;
  createdAt: Date;
};

export abstract class PaymentsRepositoryPort {
  abstract create(data: CreatePaymentProofData): Promise<PaymentProofRecord>;
  abstract findByOrderId(orderId: number): Promise<PaymentProofRecord | null>;
}
