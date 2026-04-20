import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('assets')
export class AssetOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string; // bigint en PG → TypeORM lo maneja como string

  @Column({ name: 'storage_key', type: 'text' })
  storageKey!: string;

  @Column({ name: 'original_filename', type: 'text', nullable: true })
  originalFilename!: string | null;

  @Column({ name: 'mime_type', type: 'text', nullable: true })
  mimeType!: string | null;

  @Column({ name: 'size_bytes', type: 'bigint', nullable: true })
  sizeBytes!: string | null; // bigint → string

  @Column({ name: 'width', type: 'int', nullable: true })
  width!: number | null;

  @Column({ name: 'height', type: 'int', nullable: true })
  height!: number | null;

  @Column({ name: 'content_hash', type: 'text' })
  contentHash!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}