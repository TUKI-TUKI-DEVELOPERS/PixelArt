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
  estimatedDeliveryDate?: string | null;
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
  totalAmountCents: number;
  currency: string;
  estimatedDeliveryDate: string | null;
  createdAt: Date;
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
  abstract getStatusEvents(orderId: number): Promise<StatusEvent[]>;
}
