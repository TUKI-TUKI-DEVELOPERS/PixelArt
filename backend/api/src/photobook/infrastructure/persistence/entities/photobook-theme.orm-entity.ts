import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('photobook_themes')
export class PhotobookThemeOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'cover_preview_key', type: 'text' })
  coverPreviewKey!: string;

  @Column({ name: 'cover_template_key', type: 'text' })
  coverTemplateKey!: string;

  @Column({ name: 'back_cover_key', type: 'text', nullable: true })
  backCoverKey!: string | null;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
