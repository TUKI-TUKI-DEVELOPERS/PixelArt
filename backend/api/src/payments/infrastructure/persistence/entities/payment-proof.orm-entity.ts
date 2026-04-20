import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('payment_proofs')
export class PaymentProofOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'order_id', type: 'bigint' })
  orderId!: string;

  @Column({ name: 'storage_key', type: 'text' })
  storageKey!: string;

  @Column({ name: 'original_filename', type: 'text', nullable: true })
  originalFilename!: string | null;

  @Column({ name: 'mime_type', type: 'text', nullable: true })
  mimeType!: string | null;

  @Column({ name: 'size_bytes', type: 'bigint', nullable: true })
  sizeBytes!: string | null;

  @Column({ name: 'payment_method', type: 'text' })
  paymentMethod!: string;

  @Column({ name: 'amount_cents', type: 'bigint' })
  amountCents!: string;

  @Column({ type: 'text', default: 'PENDING' })
  status!: string;

  @Column({ name: 'rejection_reason', type: 'text', nullable: true })
  rejectionReason!: string | null;

  @Column({ name: 'reviewed_by_user_id', type: 'bigint', nullable: true })
  reviewedByUserId!: string | null;

  @Column({ name: 'reviewed_at', type: 'timestamptz', nullable: true })
  reviewedAt!: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
