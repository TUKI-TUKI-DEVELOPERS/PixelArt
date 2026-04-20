import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('photobook_projects')
export class PhotobookProjectOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'photobook_product_id', type: 'bigint' })
  photobookProductId!: string;

  @Column({ name: 'photobook_theme_id', type: 'bigint' })
  photobookThemeId!: string;

  @Column({ name: 'customer_email', type: 'text' })
  customerEmail!: string;

  @Column({ name: 'customer_full_name', type: 'text', nullable: true })
  customerFullName!: string | null;

  @Column({ name: 'customer_phone', type: 'text', nullable: true })
  customerPhone!: string | null;

  @Column({ name: 'delivery_address', type: 'text', nullable: true })
  deliveryAddress!: string | null;

  @Column({ name: 'delivery_district', type: 'text', nullable: true })
  deliveryDistrict!: string | null;

  @Column({ name: 'cover_title', type: 'text', nullable: true })
  coverTitle!: string | null;

  @Column({ name: 'customer_dni', type: 'text', nullable: true })
  customerDni!: string | null;

  @Column({ name: 'custom_width_cm', type: 'numeric', precision: 5, scale: 1, nullable: true })
  customWidthCm!: number | null;

  @Column({ name: 'custom_height_cm', type: 'numeric', precision: 5, scale: 1, nullable: true })
  customHeightCm!: number | null;

  @Column({ type: 'text', default: 'DRAFT' })
  status!: string;

  @Column({ name: 'price_per_page_cents', type: 'bigint' })
  pricePerPageCents!: string;

  @Column({ name: 'page_count', type: 'int', default: 0 })
  pageCount!: number;

  @Column({ name: 'calculated_total_cents', type: 'bigint', default: '0' })
  calculatedTotalCents!: string;

  @Column({ type: 'text', default: 'PEN' })
  currency!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
