import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Promotion } from '../../domain/promotion';
import { EligibilityTarget, validateEligibilityTarget } from '../../domain/eligibility-target';
import { PromotionRepositoryPort, SavePromotionData } from '../../domain/ports/promotion-repository.port';
import { PromotionCatalogPort } from '../../domain/ports/promotion-catalog.port';
import { findScheduleConflicts } from '../../domain/services/promotion-overlap';
import { isValidPromoCode, normalizePromoCode, PROMO_CODE_MAX_LENGTH } from '../../domain/value-objects/promo-code';

export type SavePromotionInput = {
  /** null = create */
  id: number | null;
  code: string;
  percent: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  eligibility: EligibilityTarget[];
};

/**
 * Creates or updates a coded promotion. The overlap rule (no two active
 * promotions covering the same product in overlapping periods) is checked and
 * the write is performed inside one transaction holding an advisory lock.
 */
@Injectable()
export class SavePromotionUseCase {
  constructor(
    private readonly repo: PromotionRepositoryPort,
    private readonly catalog: PromotionCatalogPort,
  ) {}

  async execute(input: SavePromotionInput): Promise<Promotion> {
    const data = this.validate(input);

    if (input.id !== null) {
      const existing = await this.repo.findById(input.id);
      if (!existing) throw new NotFoundException(`Promoción ${input.id} no encontrada`);
    }

    return this.repo.withScheduleLock(async (session) => {
      const sameCode = await session.findByCode(data.code);
      if (sameCode && sameCode.id !== input.id) {
        throw new ConflictException(`Ya existe una promoción con el código ${data.code}`);
      }

      if (data.isActive) {
        const active = await session.findActiveCodedPromotions();
        const categoryOf = await this.catalog.findModelCategories(
          bookIds([...data.eligibility, ...active.flatMap((p) => p.eligibility)]),
        );
        const conflicts = findScheduleConflicts({ id: input.id, ...data }, active, categoryOf);
        if (conflicts.length) {
          const codes = conflicts.map((p) => p.code ?? p.label);
          throw new ConflictException({
            statusCode: 409,
            error: 'Conflict',
            message: `Se cruza en fechas y productos con la promoción ${codes.join(', ')}`,
            conflictingCodes: codes,
          });
        }
      }

      return input.id === null ? session.create(data) : session.update(input.id, data);
    });
  }

  private validate(input: SavePromotionInput): SavePromotionData {
    const code = normalizePromoCode(input.code);
    if (!isValidPromoCode(code)) {
      throw new BadRequestException(
        `El código es obligatorio, sin espacios y de máximo ${PROMO_CODE_MAX_LENGTH} caracteres`,
      );
    }
    if (!Number.isInteger(input.percent) || input.percent < 1 || input.percent > 100) {
      throw new BadRequestException('El descuento debe ser un porcentaje entero entre 1 y 100');
    }
    if (!isValidDate(input.validFrom) || !isValidDate(input.validUntil)) {
      throw new BadRequestException('Las fechas de vigencia son obligatorias');
    }
    if (input.validUntil.getTime() <= input.validFrom.getTime()) {
      throw new BadRequestException('La fecha de fin debe ser posterior a la de inicio');
    }
    if (!input.eligibility?.length) {
      throw new BadRequestException('Selecciona al menos un producto o categoría');
    }
    const eligibility = uniqueTargets(input.eligibility.map((t) => ({ kind: t.kind, refId: t.refId ?? null })));
    if (!eligibility.every(validateEligibilityTarget)) {
      throw new BadRequestException('Alguno de los productos seleccionados no es válido');
    }
    return {
      code,
      percent: input.percent,
      validFrom: input.validFrom,
      validUntil: input.validUntil,
      isActive: input.isActive,
      eligibility,
    };
  }
}

function isValidDate(value: unknown): value is Date {
  return value instanceof Date && !Number.isNaN(value.getTime());
}

function uniqueTargets(targets: EligibilityTarget[]): EligibilityTarget[] {
  const seen = new Set<string>();
  return targets.filter((t) => {
    const key = `${t.kind}:${t.refId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function bookIds(targets: EligibilityTarget[]): number[] {
  const ids = targets.filter((t) => t.kind === 'PERSONALIZED_BOOK' && t.refId !== null).map((t) => t.refId as number);
  return [...new Set(ids)].sort((a, b) => a - b);
}
