import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photobook_renders')
export class PhotobookRenderOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'project_id', type: 'bigint', unique: true })
  projectId!: string;

  @Column({ name: 'pdf_storage_key', type: 'text' })
  pdfStorageKey!: string;

  @CreateDateColumn({ name: 'generated_at', type: 'timestamptz' })
  generatedAt!: Date;
}
