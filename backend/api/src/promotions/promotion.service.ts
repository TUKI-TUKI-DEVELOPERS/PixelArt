import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PromotionRepositoryPort, CreatePromotionData, UpdatePromotionData } from './domain/ports/promotion-repository.port';
import { Promotion } from './domain/promotion';

@Injectable()
export class PromotionService {
  constructor(private readonly repo: PromotionRepositoryPort) {}

  /** Público — promos vigentes en este momento */
  findActive(): Promise<Promotion[]> {
    return this.repo.findActive();
  }

  /** Admin — todas las promos */
  findAll(): Promise<Promotion[]> {
    return this.repo.findAll();
  }

  async create(data: CreatePromotionData): Promise<Promotion> {
    this.validateDates(data.validFrom, data.validUntil);
    this.validateDiscount(data.discountType, data.discountValue);
    return this.repo.create(data);
  }

  async update(id: number, data: UpdatePromotionData): Promise<Promotion> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException(`Promoción ${id} no encontrada`);

    const from   = data.validFrom   ?? existing.validFrom;
    const until  = data.validUntil  ?? existing.validUntil;
    const dtype  = data.discountType  ?? existing.discountType;
    const dvalue = data.discountValue ?? existing.discountValue;

    this.validateDates(from, until);
    this.validateDiscount(dtype, dvalue);

    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException(`Promoción ${id} no encontrada`);
    return this.repo.delete(id);
  }

  private validateDates(from: Date, until: Date) {
    if (until <= from) {
      throw new BadRequestException('valid_until debe ser posterior a valid_from');
    }
  }

  private validateDiscount(type: string, value: number) {
    if (type === 'percent' && (value <= 0 || value > 100)) {
      throw new BadRequestException('El descuento porcentual debe estar entre 1 y 100');
    }
    if (value <= 0) {
      throw new BadRequestException('El valor del descuento debe ser mayor a 0');
    }
  }
}
