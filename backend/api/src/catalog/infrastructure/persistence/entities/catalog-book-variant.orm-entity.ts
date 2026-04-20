import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CatalogBookOrmEntity } from './catalog-book.orm-entity';

@Entity('catalog_book_variants')
export class CatalogBookVariantOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'catalog_book_id', type: 'bigint' })
  catalogBookId!: string;

  @Column({ name: 'cover_type', type: 'text' })
  coverType!: string;

  @Column({ name: 'base_price_cents', type: 'bigint' })
  basePriceCents!: string;

  @ManyToOne(() => CatalogBookOrmEntity, (b) => b.variants)
  @JoinColumn({ name: 'catalog_book_id' })
  catalogBook!: CatalogBookOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
