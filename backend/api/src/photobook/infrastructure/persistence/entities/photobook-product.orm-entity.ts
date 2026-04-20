import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('photobook_products')
export class PhotobookProductOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', default: 'PEN' })
  currency!: string;

  @Column({ name: 'min_pages', type: 'int', default: 25 })
  minPages!: number;

  @Column({ name: 'price_per_page_cents', type: 'bigint' })
  pricePerPageCents!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'allows_custom_dimensions', type: 'boolean', default: false })
  allowsCustomDimensions!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
