import { OrderRecord } from '../../../domain/ports/order-repository.port';
import { OrderOrmEntity } from '../entities/order.orm-entity';

export class OrderMapper {
  static toRecord(e: OrderOrmEntity): OrderRecord {
    return {
      id: Number(e.id),
      channel: e.channel,
      status: e.status,
      publicToken: e.publicToken,
      demoRequestId: e.demoRequestId ? Number(e.demoRequestId) : null,
      personalizedModelId: e.personalizedModelId ? Number(e.personalizedModelId) : null,
      photobookProjectId: e.photobookProjectId ? Number(e.photobookProjectId) : null,
      customerFullName: e.customerFullName,
      customerEmail: e.customerEmail,
      customerPhone: e.customerPhone,
      baseAmountCents: Number(e.baseAmountCents),
      rushFeeCents: Number(e.rushFeeCents),
      extraTemplatesAmountCents: Number(e.extraTemplatesAmountCents),
      discountAmountCents: Number(e.discountAmountCents ?? 0),
      promotionId: e.promotionId ? Number(e.promotionId) : null,
      promotionCode: e.promotionCode ?? null,
      promotionPercent: e.promotionPercent === null || e.promotionPercent === undefined ? null : Number(e.promotionPercent),
      totalAmountCents: Number(e.totalAmountCents),
      currency: e.currency,
      estimatedDeliveryDate: e.estimatedDeliveryDate,
      createdAt: e.createdAt,
    };
  }
}
