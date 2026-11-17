import { Injectable, NotFoundException } from '@nestjs/common';
import { PromotionRepositoryPort } from './domain/ports/promotion-repository.port';
import { Promotion } from './domain/promotion';
import { SavePromotionInput, SavePromotionUseCase } from './application/use-cases/save-promotion.use-case';

@Injectable()
export class PromotionService {
  constructor(
    private readonly repo: PromotionRepositoryPort,
    private readonly savePromotion: SavePromotionUseCase,
  ) {}

  /** Admin — todas las promos */
  findAll(): Promise<Promotion[]> {
    return this.repo.findAll();
  }

  /** Admin — crea (id null) o actualiza una promoción con código */
  save(input: SavePromotionInput): Promise<Promotion> {
    return this.savePromotion.execute(input);
  }

  async delete(id: number): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) throw new NotFoundException(`Promoción ${id} no encontrada`);
    return this.repo.delete(id);
  }
}
