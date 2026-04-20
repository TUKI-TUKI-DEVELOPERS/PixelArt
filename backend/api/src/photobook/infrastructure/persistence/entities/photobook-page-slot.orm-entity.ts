import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('photobook_page_slots')
export class PhotobookPageSlotOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'page_id', type: 'bigint' })
  pageId!: string;

  @Column({ name: 'asset_id', type: 'bigint' })
  assetId!: string;

  @Column({ name: 'slot_index', type: 'int' })
  slotIndex!: number;

  @Column({ name: 'crop_data', type: 'jsonb', nullable: true })
  cropData!: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
