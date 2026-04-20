import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AssetOrmEntity } from '../../../../assets/infrastructure/persistence/entities/asset.orm-entity';
import { CatalogBookVariantOrmEntity } from './catalog-book-variant.orm-entity';

@Entity('catalog_books')
export class CatalogBookOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'product_type', type: 'text' })
  productType!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @Column({ type: 'text', default: 'PEN' })
  currency!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'cover_asset_id', type: 'bigint', nullable: true })
  coverAssetId!: string | null;

  @ManyToOne(() => AssetOrmEntity, { eager: false, nullable: true })
  @JoinColumn({ name: 'cover_asset_id' })
  coverAsset!: AssetOrmEntity | null;

  @OneToMany(() => CatalogBookVariantOrmEntity, (v) => v.catalogBook)
  variants!: CatalogBookVariantOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
