import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('site_config')
export class SiteConfigOrmEntity {
  @PrimaryColumn({ type: 'text' })
  key!: string;

  @Column({ type: 'jsonb' })
  value!: Record<string, unknown>;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ name: 'updated_by_user_id', type: 'bigint', nullable: true })
  updatedByUserId!: string | null;
}
