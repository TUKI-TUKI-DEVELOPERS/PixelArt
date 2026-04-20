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
import { PersonalizedModelOrmEntity } from './personalized-model.orm-entity';

@Entity('personalized_categories')
export class PersonalizedCategoryOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'cover_asset_id', type: 'bigint', nullable: true })
  coverAssetId!: string | null;

  @ManyToOne(() => AssetOrmEntity, { eager: false, nullable: true })
  @JoinColumn({ name: 'cover_asset_id' })
  coverAsset!: AssetOrmEntity | null;

  @OneToMany(() => PersonalizedModelOrmEntity, (m) => m.category)
  models!: PersonalizedModelOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
