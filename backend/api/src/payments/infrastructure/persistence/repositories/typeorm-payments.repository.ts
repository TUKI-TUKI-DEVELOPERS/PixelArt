import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentsRepositoryPort, CreatePaymentProofData, PaymentProofRecord } from '../../../domain/ports/payments-repository.port';
import { PaymentProofOrmEntity } from '../entities/payment-proof.orm-entity';

@Injectable()
export class TypeOrmPaymentsRepository extends PaymentsRepositoryPort {
  constructor(
    @InjectRepository(PaymentProofOrmEntity)
    private readonly repo: Repository<PaymentProofOrmEntity>,
  ) {
    super();
  }

  async create(data: CreatePaymentProofData): Promise<PaymentProofRecord> {
    const entity = this.repo.create({
      orderId: String(data.orderId),
      storageKey: data.storageKey,
      originalFilename: data.originalFilename,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes ? String(data.sizeBytes) : null,
      paymentMethod: data.paymentMethod,
      amountCents: String(data.amountCents),
    });
    const saved = await this.repo.save(entity);
    return { id: Number(saved.id), orderId: Number(saved.orderId), storageKey: saved.storageKey, paymentMethod: saved.paymentMethod, amountCents: Number(saved.amountCents), status: saved.status, createdAt: saved.createdAt };
  }

  async findByOrderId(orderId: number): Promise<PaymentProofRecord | null> {
    const e = await this.repo.findOne({ where: { orderId: String(orderId) } });
    if (!e) return null;
    return { id: Number(e.id), orderId: Number(e.orderId), storageKey: e.storageKey, paymentMethod: e.paymentMethod, amountCents: Number(e.amountCents), status: e.status, createdAt: e.createdAt };
  }
}
