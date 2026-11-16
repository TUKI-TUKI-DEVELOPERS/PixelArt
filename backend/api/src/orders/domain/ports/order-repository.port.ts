export type CreateOrderData = {
  channel: 'CUSTOM_BOOK' | 'PHOTOBOOK';
  demoRequestId?: number | null;
  catalogBookVariantId?: number | null;
  personalizedModelId?: number | null;
  photobookProjectId?: number | null;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  baseAmountCents: number;
  rushFeeCents?: number;
  extraTemplatesAmountCents?: number;
  /** Promotion-code snapshot; the discount is subtracted from the total. */
  promotion?: AppliedOrderPromotion | null;
  estimatedDeliveryDate?: string | null;
  status?: string;
};

export type ActivatePhotobookOrderData = {
  photobookProjectId: number;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  baseAmountCents: number;
  /** Promotion-code snapshot validated before the order is activated. */
  promotion?: AppliedOrderPromotion | null;
};

export type OrderRecord = {
  id: number;
  channel: string;
  status: string;
  publicToken: string;
  demoRequestId: number | null;
  personalizedModelId: number | null;
  photobookProjectId: number | null;
  customerFullName: string;
  customerEmail: string;
  customerPhone: string;
  baseAmountCents: number;
  rushFeeCents: number;
  extraTemplatesAmountCents: number;
  /** Promotion-code discount snapshot; total = base + rush + extra - discount. */
  discountAmountCents: number;
  /** null when no code was applied, or when the promotion was deleted afterwards. */
  promotionId: number | null;
  promotionCode: string | null;
  promotionPercent: number | null;
  totalAmountCents: number;
  currency: string;
  estimatedDeliveryDate: string | null;
  createdAt: Date;
};

/** A promotion code applied to an order, frozen at checkout time. */
export type AppliedOrderPromotion = {
  promotionId: number | null;
  code: string;
  percent: number;
  discountCents: number;
};

export type CheckoutPricing = {
  extraTemplatesAmountCents: number;
  promotion: AppliedOrderPromotion | null;
};

export type StatusEvent = {
  id: number;
  oldStatus: string | null;
  newStatus: string;
  note: string | null;
  createdAt: Date;
};

export abstract class OrderRepositoryPort {
  abstract create(data: CreateOrderData): Promise<OrderRecord>;
  abstract findAll(): Promise<OrderRecord[]>;
  abstract findById(id: number): Promise<OrderRecord | null>;
  abstract findByPublicToken(token: string): Promise<OrderRecord | null>;
  abstract updateStatus(id: number, newStatus: string, note?: string): Promise<void>;
  abstract updateExtraTemplates(id: number, extraTemplatesAmountCents: number): Promise<void>;
  /**
   * Stores the package amount, the promotion snapshot and the total in one
   * update. Returns false (and changes nothing) when the order already holds a
   * different promotion code.
   */
  abstract applyCheckoutPricing(id: number, pricing: CheckoutPricing): Promise<boolean>;
  abstract ensurePhotobookConfigurationOrder(data: ActivatePhotobookOrderData): Promise<OrderRecord>;
  abstract activatePhotobookOrder(data: ActivatePhotobookOrderData): Promise<OrderRecord>;
  abstract getStatusEvents(orderId: number): Promise<StatusEvent[]>;
}
