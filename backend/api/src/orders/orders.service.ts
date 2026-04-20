import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderRepositoryPort, CreateOrderData } from './domain/ports/order-repository.port';

const VALID_TRANSITIONS: Record<string, string[]> = {
  AWAITING_PAYMENT_PROOF: ['UNDER_PAYMENT_REVIEW', 'CANCELLED'],
  UNDER_PAYMENT_REVIEW: ['PAYMENT_VERIFIED', 'REJECTED', 'CANCELLED'],
  PAYMENT_VERIFIED: ['IN_PRODUCTION', 'CANCELLED'],
  IN_PRODUCTION: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [],
  REJECTED: ['AWAITING_PAYMENT_PROOF'],
  CANCELLED: [],
};

@Injectable()
export class OrdersService {
  constructor(private readonly repo: OrderRepositoryPort) {}

  create(data: CreateOrderData) { return this.repo.create(data); }
  findAll() { return this.repo.findAll(); }
  findById(id: number) { return this.repo.findById(id); }
  findByPublicToken(token: string) { return this.repo.findByPublicToken(token); }
  getStatusEvents(orderId: number) { return this.repo.getStatusEvents(orderId); }
  updateExtraTemplates(id: number, extraTemplatesAmountCents: number) { return this.repo.updateExtraTemplates(id, extraTemplatesAmountCents); }

  async advanceStatus(orderId: number, newStatus: string, note?: string) {
    const order = await this.repo.findById(orderId);
    if (!order) throw new NotFoundException('Orden no encontrada');

    const allowed = VALID_TRANSITIONS[order.status] ?? [];
    if (!allowed.includes(newStatus)) {
      throw new BadRequestException(`No se puede cambiar de ${order.status} a ${newStatus}`);
    }

    await this.repo.updateStatus(orderId, newStatus, note);
    return { orderId, oldStatus: order.status, newStatus };
  }
}
