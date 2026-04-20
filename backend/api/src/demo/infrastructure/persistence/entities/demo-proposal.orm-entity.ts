import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('demo_proposals')
export class DemoProposalOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'demo_request_id', type: 'bigint' })
  demoRequestId!: string;

  @Column({ name: 'template_id', type: 'bigint' })
  templateId!: string;

  @Column({ name: 'output_storage_key', type: 'text' })
  outputStorageKey!: string;

  @Column({ name: 'protection_mode', type: 'text', default: 'WATERMARK' })
  protectionMode!: string;

  @Column({ name: 'is_watermarked', type: 'boolean', default: true })
  isWatermarked!: boolean;

  @Column({ name: 'generated_by_user_id', type: 'bigint', nullable: true })
  generatedByUserId!: string | null;

  @CreateDateColumn({ name: 'generated_at', type: 'timestamptz' })
  generatedAt!: Date;
}
