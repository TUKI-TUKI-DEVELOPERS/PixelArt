export type TargetType = 'model' | 'models' | 'category' | 'all';
export type DiscountType = 'percent' | 'fixed_cents';

export class Promotion {
  readonly id: number;
  readonly label: string;
  readonly targetType: TargetType;
  readonly targetId: number | null;
  readonly targetIds: number[];
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
    targetType: TargetType;
    targetId: number | null;
    targetIds?: number[];
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
  }

  /** Precio en centavos con el descuento aplicado */
  applyTo(basePriceCents: number): number {
    if (this.discountType === 'percent') {
      return Math.round(basePriceCents * (1 - this.discountValue / 100));
    }
    return Math.max(0, basePriceCents - this.discountValue);
  }
}
