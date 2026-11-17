import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ActivatePhotobookOrderData,
  AppliedOrderPromotion,
  CheckoutPricing,
  CreateOrderData,
  OrderRecord,
  OrderRepositoryPort,
  StatusEvent,
} from '../../../domain/ports/order-repository.port';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { OrderStatusEventOrmEntity } from '../entities/order-status-event.orm-entity';
import { OrderMapper } from '../mappers/order.mapper';
import { returningRows } from '../../../../common/database/returning-rows';

const toRecord = OrderMapper.toRecord;

/** Snapshot columns; all empty (and discount 0) when no code was applied. */
function promotionColumns(promotion: AppliedOrderPromotion | null) {
  return {
    discountAmountCents: String(promotion?.discountCents ?? 0),
    promotionId: promotion?.promotionId != null ? String(promotion.promotionId) : null,
    promotionCode: promotion?.code ?? null,
    promotionPercent: promotion?.percent ?? null,
  };
}

@Injectable()
export class TypeOrmOrderRepository extends OrderRepositoryPort {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly repo: Repository<OrderOrmEntity>,
    @InjectRepository(OrderStatusEventOrmEntity)
    private readonly eventRepo: Repository<OrderStatusEventOrmEntity>,
  ) {
    super();
  }

  async create(data: CreateOrderData): Promise<OrderRecord> {
    const rushFee = data.rushFeeCents ?? 0;
    const extraTemplates = data.extraTemplatesAmountCents ?? 0;
    const promotion = data.promotion ?? null;
    const total = data.baseAmountCents + rushFee + extraTemplates - (promotion?.discountCents ?? 0);

    const entity = this.repo.create({
      channel: data.channel,
      demoRequestId: data.demoRequestId ? String(data.demoRequestId) : null,
      catalogBookVariantId: data.catalogBookVariantId ? String(data.catalogBookVariantId) : null,
      personalizedModelId: data.personalizedModelId ? String(data.personalizedModelId) : null,
      photobookProjectId: data.photobookProjectId ? String(data.photobookProjectId) : null,
      customerFullName: data.customerFullName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      baseAmountCents: String(data.baseAmountCents),
      rushFeeCents: String(rushFee),
      extraTemplatesAmountCents: String(extraTemplates),
      ...promotionColumns(promotion),
      totalAmountCents: String(total),
      estimatedDeliveryDate: data.estimatedDeliveryDate ?? null,
      status: data.status ?? 'AWAITING_PAYMENT_PROOF',
    });
    const saved = await this.repo.save(entity);
    // Reload to get PG-generated public_token
    const reloaded = await this.repo.findOneByOrFail({ id: saved.id });
    return toRecord(reloaded);
  }

  async findById(id: number): Promise<OrderRecord | null> {
    const e = await this.repo.findOne({ where: { id: String(id) } });
    return e ? toRecord(e) : null;
  }

  async findByPublicToken(token: string): Promise<OrderRecord | null> {
    const e = await this.repo.findOne({ where: { publicToken: token } });
    return e ? toRecord(e) : null;
  }

  async findAll(): Promise<OrderRecord[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return entities.map(toRecord);
  }

  async updateExtraTemplates(id: number, extraTemplatesAmountCents: number): Promise<void> {
    const order = await this.repo.findOneByOrFail({ id: String(id) });
    const newTotal =
      Number(order.baseAmountCents) +
      Number(order.rushFeeCents) +
      extraTemplatesAmountCents -
      Number(order.discountAmountCents ?? 0);
    await this.repo.update(String(id), {
      extraTemplatesAmountCents: String(extraTemplatesAmountCents),
      totalAmountCents: String(newTotal),
    });
  }

  async applyCheckoutPricing(id: number, pricing: CheckoutPricing): Promise<boolean> {
    const promotion = pricing.promotion;
    // The WHERE guard makes "one code per order" race-safe: a different code
    // never overwrites an existing snapshot, the same code is idempotent.
    const result = await this.repo.manager.query(
      `UPDATE orders SET
         extra_templates_amount_cents = $2::bigint,
         discount_amount_cents        = $3::bigint,
         promotion_id                 = $4::bigint,
         promotion_code               = $5::text,
         promotion_percent            = $6::int,
         total_amount_cents = base_amount_cents + rush_fee_cents + $2::bigint - $3::bigint,
         updated_at = now()
       WHERE id = $1
         AND (promotion_code IS NULL OR promotion_code = $5::text)
       RETURNING id`,
      [
        id,
        pricing.extraTemplatesAmountCents,
        promotion?.discountCents ?? 0,
        promotion?.promotionId ?? null,
        promotion?.code ?? null,
        promotion?.percent ?? null,
      ],
    );
    return returningRows<{ id: string }>(result).length > 0;
  }

  async ensurePhotobookConfigurationOrder(data: ActivatePhotobookOrderData): Promise<OrderRecord> {
    const existing = await this.repo.findOne({ where: { photobookProjectId: String(data.photobookProjectId) } });
    if (existing) return toRecord(existing);
    try {
      return await this.create({
        channel: 'PHOTOBOOK',
        photobookProjectId: data.photobookProjectId,
        customerFullName: data.customerFullName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        baseAmountCents: 0,
        status: 'CONFIGURING_PHOTOBOOK',
      });
    } catch (error) {
      const concurrent = await this.repo.findOne({ where: { photobookProjectId: String(data.photobookProjectId) } });
      if (concurrent) return toRecord(concurrent);
      throw error;
    }
  }

  async activatePhotobookOrder(data: ActivatePhotobookOrderData): Promise<OrderRecord> {
    const existing = await this.repo.findOne({ where: { photobookProjectId: String(data.photobookProjectId) } });
    if (!existing) {
      return this.create({ channel: 'PHOTOBOOK', ...data, status: 'AWAITING_PAYMENT_PROOF' });
    }
    if (existing.status !== 'CONFIGURING_PHOTOBOOK') return toRecord(existing);

    const oldStatus = existing.status;
    await this.repo.update(existing.id, {
      customerFullName: data.customerFullName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      baseAmountCents: String(data.baseAmountCents),
      rushFeeCents: '0',
      extraTemplatesAmountCents: '0',
      ...promotionColumns(data.promotion ?? null),
      totalAmountCents: String(data.baseAmountCents - (data.promotion?.discountCents ?? 0)),
      status: 'AWAITING_PAYMENT_PROOF',
    });
    await this.eventRepo.save(this.eventRepo.create({
      orderId: existing.id,
      oldStatus,
      newStatus: 'AWAITING_PAYMENT_PROOF',
      note: 'Photobook personalizado configurado y listo para pago',
    }));
    const activated = await this.repo.findOneByOrFail({ id: existing.id });
    return toRecord(activated);
  }

  async updateStatus(id: number, newStatus: string, note?: string): Promise<void> {
    const order = await this.repo.findOneByOrFail({ id: String(id) });
    const oldStatus = order.status;
    await this.repo.update(String(id), { status: newStatus });
    const event = this.eventRepo.create({
      orderId: String(id),
      oldStatus,
      newStatus,
      note: note ?? null,
    });
    await this.eventRepo.save(event);
  }

  async getStatusEvents(orderId: number): Promise<StatusEvent[]> {
    const events = await this.eventRepo.find({
      where: { orderId: String(orderId) },
      order: { createdAt: 'ASC' },
    });
    return events.map((e) => ({
      id: Number(e.id),
      oldStatus: e.oldStatus,
      newStatus: e.newStatus,
      note: e.note,
      createdAt: e.createdAt,
    }));
  }
}
