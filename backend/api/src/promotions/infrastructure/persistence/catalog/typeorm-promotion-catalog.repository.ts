import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PromotionCatalogPort } from '../../../domain/ports/promotion-catalog.port';

@Injectable()
export class TypeOrmPromotionCatalogRepository extends PromotionCatalogPort {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  async findModelCategories(modelIds: number[]): Promise<Map<number, number>> {
    if (!modelIds.length) return new Map();
    const rows: { id: string; category_id: string }[] = await this.dataSource.query(
      `SELECT id, category_id FROM personalized_models WHERE id = ANY($1::bigint[])`,
      [modelIds],
    );
    return new Map(rows.map((r) => [Number(r.id), Number(r.category_id)]));
  }
}
