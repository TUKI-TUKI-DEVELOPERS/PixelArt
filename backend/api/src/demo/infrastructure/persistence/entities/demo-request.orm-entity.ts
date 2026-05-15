import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('demo_request')
export class DemoRequestOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'catalog_book_id', type: 'bigint' })
  catalogBookId!: string;

  @Column({ name: 'catalog_book_variant_id', type: 'bigint' })
  catalogBookVariantId!: string;

  @Column({ name: 'personalized_category_id', type: 'bigint' })
  personalizedCategoryId!: string;

  @Column({ name: 'personalized_model_id', type: 'bigint' })
  personalizedModelId!: string;

  @Column({ name: 'customer_full_name', type: 'text' })
  customerFullName!: string;

  @Column({ name: 'customer_email', type: 'text' })
  customerEmail!: string;

  @Column({ name: 'customer_phone', type: 'text' })
  customerPhone!: string;

  @Column({ name: 'shipping_address_line1', type: 'text' })
  shippingAddressLine1!: string;

  @Column({ name: 'shipping_address_line2', type: 'text', nullable: true })
  shippingAddressLine2!: string | null;

  @Column({ name: 'shipping_city', type: 'text', nullable: true })
  shippingCity!: string | null;

  @Column({ name: 'shipping_region', type: 'text', nullable: true })
  shippingRegion!: string | null;

  @Column({ name: 'shipping_reference', type: 'text', nullable: true })
  shippingReference!: string | null;

  @Column({ name: 'delivery_date', type: 'date' })
  deliveryDate!: string;

  @Column({ name: 'wants_rush', type: 'boolean', default: false })
  wantsRush!: boolean;

  @Column({ name: 'package_preference', type: 'varchar', length: 10, default: 'STANDARD' })
  packagePreference!: string;

  @Column({ name: 'wants_custom_dedication', type: 'boolean', default: false })
  wantsCustomDedication!: boolean;

  @Column({ name: 'dedication_text', type: 'text', nullable: true })
  dedicationText!: string | null;

  @Column({ name: 'message_optional', type: 'text', nullable: true })
  messageOptional!: string | null;

  @Column({ type: 'text', default: 'RECEIVED' })
  status!: string;

  @Column({ name: 'cancelled_at', type: 'timestamptz', nullable: true })
  cancelledAt!: Date | null;

  @Column({ name: 'cancellation_reason', type: 'text', nullable: true })
  cancellationReason!: string | null;

  @Column({ name: 'cancelled_by_user_id', type: 'bigint', nullable: true })
  cancelledByUserId!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
