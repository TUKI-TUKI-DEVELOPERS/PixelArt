import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionRepositoryPort, CreatePromotionData, UpdatePromotionData } from '../../../domain/ports/promotion-repository.port';
import { Promotion } from '../../../domain/promotion';
import { PromotionOrmEntity } from '../entities/promotion.orm-entity';
import { PromotionMapper } from '../mappers/promotion.mapper';

@Injectable()
export class TypeOrmPromotionRepository extends PromotionRepositoryPort {
  constructor(
    @InjectRepository(PromotionOrmEntity)
    private readonly repo: Repository<PromotionOrmEntity>,
  ) {
    super();
  }

  private async fetchTargetIds(promotionIds: string[]): Promise<Map<string, number[]>> {
    const map = new Map<string, number[]>();
    if (!promotionIds.length) return map;
    const rows: { promotion_id: string; catalog_book_id: string }[] =
      await this.repo.manager.query(
        `SELECT promotion_id, catalog_book_id FROM promotion_targets WHERE promotion_id = ANY($1)`,
        [promotionIds],
      );
    for (const row of rows) {
      const key = String(row.promotion_id);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(Number(row.catalog_book_id));
    }
    return map;
  }

  private async saveTargetIds(promotionId: string, targetIds: number[]): Promise<void> {
    await this.repo.manager.query(
      `DELETE FROM promotion_targets WHERE promotion_id = $1`,
      [promotionId],
    );
    if (!targetIds.length) return;
    const values = targetIds.map((_, i) => `($1, $${i + 2})`).join(', ');
    await this.repo.manager.query(
      `INSERT INTO promotion_targets (promotion_id, catalog_book_id) VALUES ${values} ON CONFLICT DO NOTHING`,
      [promotionId, ...targetIds],
    );
  }

  async findActive(): Promise<Promotion[]> {
    const now = new Date();
    const entities = await this.repo
      .createQueryBuilder('p')
      .where('p.is_active = TRUE')
      .andWhere('p.valid_from <= :now', { now })
      .andWhere('p.valid_until >= :now', { now })
      .orderBy('p.created_at', 'DESC')
      .getMany();
    const targetMap = await this.fetchTargetIds(entities.map(e => e.id));
    return entities.map(e => PromotionMapper.toDomain(e, targetMap.get(e.id) ?? []));
  }

  async findAll(): Promise<Promotion[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    const targetMap = await this.fetchTargetIds(entities.map(e => e.id));
    return entities.map(e => PromotionMapper.toDomain(e, targetMap.get(e.id) ?? []));
  }

  async findById(id: number): Promise<Promotion | null> {
    const e = await this.repo.findOne({ where: { id: String(id) } });
    if (!e) return null;
    const targetMap = await this.fetchTargetIds([e.id]);
    return PromotionMapper.toDomain(e, targetMap.get(e.id) ?? []);
  }

  async create(data: CreatePromotionData): Promise<Promotion> {
    const entity = this.repo.create({
      label:         data.label,
      targetType:    data.targetType,
      targetId:      data.targetId ? String(data.targetId) : null,
      discountType:  data.discountType,
      discountValue: String(data.discountValue),
      validFrom:     data.validFrom,
      validUntil:    data.validUntil,
      isActive:      data.isActive,
    });
    const saved = await this.repo.save(entity);
    if (data.targetType === 'models' && data.targetIds?.length) {
      await this.saveTargetIds(saved.id, data.targetIds);
    }
    return PromotionMapper.toDomain(saved, data.targetIds ?? []);
  }

  async update(id: number, data: UpdatePromotionData): Promise<Promotion> {
    const entity = await this.repo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException(`Promoción ${id} no encontrada`);

    if (data.label         !== undefined) entity.label         = data.label;
    if (data.targetType    !== undefined) entity.targetType    = data.targetType;
    if (data.targetId      !== undefined) entity.targetId      = data.targetId ? String(data.targetId) : null;
    if (data.discountType  !== undefined) entity.discountType  = data.discountType;
    if (data.discountValue !== undefined) entity.discountValue = String(data.discountValue);
    if (data.validFrom     !== undefined) entity.validFrom     = data.validFrom;
    if (data.validUntil    !== undefined) entity.validUntil    = data.validUntil;
    if (data.isActive      !== undefined) entity.isActive      = data.isActive;

    const saved = await this.repo.save(entity);
    if (data.targetIds !== undefined) {
      await this.saveTargetIds(saved.id, data.targetIds);
    }
    const targetMap = await this.fetchTargetIds([saved.id]);
    return PromotionMapper.toDomain(saved, targetMap.get(saved.id) ?? []);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id: String(id) });
  }
}
