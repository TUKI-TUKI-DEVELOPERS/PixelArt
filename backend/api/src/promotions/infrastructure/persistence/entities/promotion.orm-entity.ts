import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('promotions')
export class PromotionOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  label!: string;

  @Column({ name: 'target_type', type: 'text' })
  targetType!: string;

  @Column({ name: 'target_id', type: 'bigint', nullable: true })
  targetId!: string | null;

  @Column({ name: 'discount_type', type: 'text' })
  discountType!: string;

  @Column({ name: 'discount_value', type: 'bigint' })
  discountValue!: string;

  @Column({ name: 'valid_from', type: 'timestamptz' })
  validFrom!: Date;

  @Column({ name: 'valid_until', type: 'timestamptz' })
  validUntil!: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
