import { Promotion, TargetType, DiscountType } from '../promotion';

export type CreatePromotionData = {
  label: string;
  targetType: TargetType;
  targetId: number | null;
  targetIds?: number[];
  discountType: DiscountType;
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
};

export type UpdatePromotionData = Partial<CreatePromotionData>;

export abstract class PromotionRepositoryPort {
  abstract findActive(): Promise<Promotion[]>;
  abstract findAll(): Promise<Promotion[]>;
  abstract findById(id: number): Promise<Promotion | null>;
  abstract create(data: CreatePromotionData): Promise<Promotion>;
  abstract update(id: number, data: UpdatePromotionData): Promise<Promotion>;
  abstract delete(id: number): Promise<void>;
}
