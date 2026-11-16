import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, IsNull, Not, Repository } from 'typeorm';
import {
  PromotionRepositoryPort,
  PromotionScheduleSession,
  SavePromotionData,
} from '../../../domain/ports/promotion-repository.port';
import { Promotion } from '../../../domain/promotion';
import { EligibilityTarget } from '../../../domain/eligibility-target';
import { PromotionOrmEntity } from '../entities/promotion.orm-entity';
import { EligibilityRow, PromotionMapper } from '../mappers/promotion.mapper';

type Queryable = Pick<EntityManager, 'query'>;

const SCHEDULE_LOCK_SQL = `SELECT pg_advisory_xact_lock(hashtext('promotions:schedule'))`;
const PG_UNIQUE_VIOLATION = '23505';
const PG_FOREIGN_KEY_VIOLATION = '23503';

@Injectable()
export class TypeOrmPromotionRepository extends PromotionRepositoryPort {
  constructor(
    @InjectRepository(PromotionOrmEntity)
    private readonly repo: Repository<PromotionOrmEntity>,
  ) {
    super();
  }

  async findValidCodedPromotions(now: Date): Promise<Promotion[]> {
    const entities = await this.repo
      .createQueryBuilder('p')
      .where('p.is_active = TRUE')
      .andWhere('p.code IS NOT NULL')
      .andWhere('p.valid_from <= :now', { now })
      // Half-open interval, same as the code evaluator.
      .andWhere('p.valid_until > :now', { now })
      .orderBy('p.valid_until', 'ASC')
      .getMany();
    return this.hydrate(this.repo.manager, entities);
  }

  async findAll(): Promise<Promotion[]> {
    const entities = await this.repo.find({ order: { createdAt: 'DESC' } });
    return this.hydrate(this.repo.manager, entities);
  }

  async findById(id: number): Promise<Promotion | null> {
    const e = await this.repo.findOne({ where: { id: String(id) } });
    if (!e) return null;
    const [promotion] = await this.hydrate(this.repo.manager, [e]);
    return promotion;
  }

  async findByCode(code: string): Promise<Promotion | null> {
    return this.findByCodeWith(this.repo.manager, this.repo, code);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete({ id: String(id) });
  }

  async withScheduleLock<T>(work: (session: PromotionScheduleSession) => Promise<T>): Promise<T> {
    return this.repo.manager.transaction(async (manager) => {
      await manager.query(SCHEDULE_LOCK_SQL);
      return work(this.sessionFor(manager));
    });
  }

  private sessionFor(manager: EntityManager): PromotionScheduleSession {
    const repo = manager.getRepository(PromotionOrmEntity);
    return {
      findActiveCodedPromotions: async () => {
        const entities = await repo.find({
          where: { isActive: true, code: Not(IsNull()) },
          order: { createdAt: 'DESC' },
        });
        return this.hydrate(manager, entities);
      },
      findByCode: (code) => this.findByCodeWith(manager, repo, code),
      create: (data) => this.translateErrors(data.code, () => this.insert(manager, repo, data)),
      update: (id, data) => this.translateErrors(data.code, () => this.overwrite(manager, repo, id, data)),
    };
  }

  private async insert(manager: EntityManager, repo: Repository<PromotionOrmEntity>, data: SavePromotionData) {
    const saved = await repo.save(repo.create({ ...this.columnsFor(data) }));
    await this.replaceEligibility(manager, saved.id, data.eligibility);
    return PromotionMapper.toDomain(saved, [], data.eligibility);
  }

  private async overwrite(
    manager: EntityManager,
    repo: Repository<PromotionOrmEntity>,
    id: number,
    data: SavePromotionData,
  ) {
    const entity = await repo.findOne({ where: { id: String(id) } });
    if (!entity) throw new NotFoundException(`Promoción ${id} no encontrada`);
    Object.assign(entity, this.columnsFor(data));
    const saved = await repo.save(entity);
    // A legacy display promotion edited in the new form becomes a coded one.
    await manager.query(`DELETE FROM promotion_targets WHERE promotion_id = $1`, [saved.id]);
    await this.replaceEligibility(manager, saved.id, data.eligibility);
    return PromotionMapper.toDomain(saved, [], data.eligibility);
  }

  private columnsFor(data: SavePromotionData): Partial<PromotionOrmEntity> {
    return {
      label: data.code,
      code: data.code,
      targetType: null,
      targetId: null,
      discountType: 'percent',
      discountValue: String(data.percent),
      validFrom: data.validFrom,
      validUntil: data.validUntil,
      isActive: data.isActive,
    };
  }

  private async replaceEligibility(manager: Queryable, promotionId: string, targets: EligibilityTarget[]) {
    await manager.query(`DELETE FROM promotion_eligibility_targets WHERE promotion_id = $1`, [promotionId]);
    if (!targets.length) return;
    const params: unknown[] = [promotionId];
    const values = targets.map((target) => {
      const cols = PromotionMapper.eligibilityToColumns(target);
      params.push(target.kind, cols.personalizedCategoryId, cols.personalizedModelId, cols.photobookThemeId);
      const n = params.length;
      return `($1, $${n - 3}, $${n - 2}, $${n - 1}, $${n})`;
    });
    await manager.query(
      `INSERT INTO promotion_eligibility_targets
         (promotion_id, target_kind, personalized_category_id, personalized_model_id, photobook_theme_id)
       VALUES ${values.join(', ')}`,
      params,
    );
  }

  private async translateErrors<T>(code: string, work: () => Promise<T>): Promise<T> {
    try {
      return await work();
    } catch (error) {
      const pgCode = (error as { code?: string }).code ?? (error as { driverError?: { code?: string } }).driverError?.code;
      if (pgCode === PG_UNIQUE_VIOLATION) throw new ConflictException(`Ya existe una promoción con el código ${code}`);
      if (pgCode === PG_FOREIGN_KEY_VIOLATION) {
        throw new BadRequestException('Alguno de los productos seleccionados no existe');
      }
      throw error;
    }
  }

  private async findByCodeWith(manager: Queryable, repo: Repository<PromotionOrmEntity>, code: string) {
    // Plain equality on TEXT: exact and case-sensitive.
    const e = await repo.findOne({ where: { code } });
    if (!e) return null;
    const [promotion] = await this.hydrate(manager, [e]);
    return promotion;
  }

  private async hydrate(manager: Queryable, entities: PromotionOrmEntity[]): Promise<Promotion[]> {
    if (!entities.length) return [];
    const ids = entities.map((e) => e.id);
    const [legacyTargets, eligibility] = await Promise.all([
      this.fetchLegacyTargetIds(manager, ids),
      this.fetchEligibility(manager, ids),
    ]);
    return entities.map((e) =>
      PromotionMapper.toDomain(e, legacyTargets.get(String(e.id)) ?? [], eligibility.get(String(e.id)) ?? []),
    );
  }

  private async fetchLegacyTargetIds(manager: Queryable, promotionIds: string[]): Promise<Map<string, number[]>> {
    const rows: { promotion_id: string; catalog_book_id: string }[] = await manager.query(
      `SELECT promotion_id, catalog_book_id FROM promotion_targets WHERE promotion_id = ANY($1)`,
      [promotionIds],
    );
    const map = new Map<string, number[]>();
    for (const row of rows ?? []) {
      const key = String(row.promotion_id);
      map.set(key, [...(map.get(key) ?? []), Number(row.catalog_book_id)]);
    }
    return map;
  }

  private async fetchEligibility(manager: Queryable, promotionIds: string[]): Promise<Map<string, EligibilityTarget[]>> {
    const rows: EligibilityRow[] = await manager.query(
      `SELECT promotion_id, target_kind, personalized_category_id, personalized_model_id, photobook_theme_id
         FROM promotion_eligibility_targets
        WHERE promotion_id = ANY($1)
        ORDER BY id`,
      [promotionIds],
    );
    const map = new Map<string, EligibilityTarget[]>();
    for (const row of rows ?? []) {
      const key = String(row.promotion_id);
      map.set(key, [...(map.get(key) ?? []), PromotionMapper.eligibilityFromRow(row)]);
    }
    return map;
  }
}
