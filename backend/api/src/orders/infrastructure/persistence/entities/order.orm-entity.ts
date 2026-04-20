import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  channel!: string;

  @Column({ type: 'text', default: 'AWAITING_PAYMENT_PROOF' })
  status!: string;

  @Column({ name: 'public_token', type: 'uuid' })
  publicToken!: string;

  @Column({ name: 'demo_request_id', type: 'bigint', nullable: true })
  demoRequestId!: string | null;

  @Column({ name: 'catalog_book_variant_id', type: 'bigint', nullable: true })
  catalogBookVariantId!: string | null;

  @Column({ name: 'personalized_model_id', type: 'bigint', nullable: true })
  personalizedModelId!: string | null;

  @Column({ name: 'photobook_project_id', type: 'bigint', nullable: true })
  photobookProjectId!: string | null;

  @Column({ name: 'customer_full_name', type: 'text' })
  customerFullName!: string;

  @Column({ name: 'customer_email', type: 'text' })
  customerEmail!: string;

  @Column({ name: 'customer_phone', type: 'text' })
  customerPhone!: string;

  @Column({ name: 'base_amount_cents', type: 'bigint', default: 0 })
  baseAmountCents!: string;

  @Column({ name: 'rush_fee_cents', type: 'bigint', default: 0 })
  rushFeeCents!: string;

  @Column({ name: 'extra_templates_amount_cents', type: 'bigint', default: 0 })
  extraTemplatesAmountCents!: string;

  @Column({ name: 'total_amount_cents', type: 'bigint' })
  totalAmountCents!: string;

  @Column({ type: 'text', default: 'PEN' })
  currency!: string;

  @Column({ name: 'estimated_delivery_date', type: 'date', nullable: true })
  estimatedDeliveryDate!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
