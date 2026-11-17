import { EligibilityTarget } from './eligibility-target';

/** Legacy targeting of automatic display promotions (promotions without a code). */
export type TargetType = 'model' | 'models' | 'category' | 'all';
export type DiscountType = 'percent' | 'fixed_cents';

export class Promotion {
  readonly id: number;
  readonly label: string;
  /** Exact, case-sensitive customer code. null = legacy automatic display promotion. */
  readonly code: string | null;
  /** Legacy targeting; null for coded promotions, which use `eligibility`. */
  readonly targetType: TargetType | null;
  readonly targetId: number | null;
  readonly targetIds: number[];
  readonly eligibility: EligibilityTarget[];
  readonly discountType: DiscountType;
  readonly discountValue: number;
  readonly validFrom: Date;
  readonly validUntil: Date;
  readonly isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: {
    id: number;
    label: string;
    code?: string | null;
    targetType: TargetType | null;
    targetId: number | null;
    targetIds?: number[];
    eligibility?: EligibilityTarget[];
    discountType: DiscountType;
    discountValue: number;
    validFrom: Date;
    validUntil: Date;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }) {
    Object.assign(this, props);
    if (!this.targetIds) (this as any).targetIds = [];
    if (!this.eligibility) (this as any).eligibility = [];
    if (this.code === undefined) (this as any).code = null;
  }

  /** Precio en centavos con el descuento aplicado */
  applyTo(basePriceCents: number): number {
    if (this.discountType === 'percent') {
      return Math.round(basePriceCents * (1 - this.discountValue / 100));
    }
    return Math.max(0, basePriceCents - this.discountValue);
  }
}
