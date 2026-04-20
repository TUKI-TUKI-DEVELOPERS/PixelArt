import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepositoryPort, CreateOrderData, OrderRecord, StatusEvent } from '../../../domain/ports/order-repository.port';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { OrderStatusEventOrmEntity } from '../entities/order-status-event.orm-entity';

function toRecord(e: OrderOrmEntity): OrderRecord {
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
    totalAmountCents: Number(e.totalAmountCents),
    currency: e.currency,
    estimatedDeliveryDate: e.estimatedDeliveryDate,
    createdAt: e.createdAt,
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
    const total = data.baseAmountCents + rushFee + extraTemplates;

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
      totalAmountCents: String(total),
      estimatedDeliveryDate: data.estimatedDeliveryDate ?? null,
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
    const newTotal = Number(order.baseAmountCents) + Number(order.rushFeeCents) + extraTemplatesAmountCents;
    await this.repo.update(String(id), {
      extraTemplatesAmountCents: String(extraTemplatesAmountCents),
      totalAmountCents: String(newTotal),
    });
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
