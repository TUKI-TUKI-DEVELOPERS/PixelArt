import { Promotion } from '../promotion';
import { EligibilityTarget } from '../eligibility-target';

/** A coded promotion as the admin defines it. Percent only; label mirrors the code. */
export type SavePromotionData = {
  code: string;
  percent: number;
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  eligibility: EligibilityTarget[];
};

/** Repository operations bound to one transaction that holds the schedule lock. */
export interface PromotionScheduleSession {
  findActiveCodedPromotions(): Promise<Promotion[]>;
  findByCode(code: string): Promise<Promotion | null>;
  create(data: SavePromotionData): Promise<Promotion>;
  update(id: number, data: SavePromotionData): Promise<Promotion>;
}

export abstract class PromotionRepositoryPort {
  /** Active coded promotions whose [validFrom, validUntil) contains `now`. */
  abstract findValidCodedPromotions(now: Date): Promise<Promotion[]>;
  abstract findAll(): Promise<Promotion[]>;
  abstract findById(id: number): Promise<Promotion | null>;
  /** Exact, case-sensitive match. */
  abstract findByCode(code: string): Promise<Promotion | null>;
  abstract delete(id: number): Promise<void>;
  /**
   * Runs `work` inside one transaction that first takes the promotion-schedule
   * advisory lock, so concurrent saves cannot both pass the overlap check.
   */
  abstract withScheduleLock<T>(work: (session: PromotionScheduleSession) => Promise<T>): Promise<T>;
}
