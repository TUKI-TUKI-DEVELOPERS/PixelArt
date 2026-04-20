import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('photobook_pages')
export class PhotobookPageOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'project_id', type: 'bigint' })
  projectId!: string;

  @Column({ name: 'page_number', type: 'int' })
  pageNumber!: number;

  @Column({ name: 'layout_key', type: 'text' })
  layoutKey!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
