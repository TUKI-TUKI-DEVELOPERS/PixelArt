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
import { PersonalizedCategoryOrmEntity } from './personalized-category.orm-entity';
import { PersonalizedTemplateOrmEntity } from './personalized-template.orm-entity';

@Entity('personalized_models')
export class PersonalizedModelOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'category_id', type: 'bigint' })
  categoryId!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ name: 'cover_asset_id', type: 'bigint', nullable: true })
  coverAssetId!: string | null;

  @ManyToOne(() => AssetOrmEntity, { eager: false, nullable: true })
  @JoinColumn({ name: 'cover_asset_id' })
  coverAsset!: AssetOrmEntity | null;

  @ManyToOne(() => PersonalizedCategoryOrmEntity, (c) => c.models)
  @JoinColumn({ name: 'category_id' })
  category!: PersonalizedCategoryOrmEntity;

  @OneToMany(() => PersonalizedTemplateOrmEntity, (t) => t.model)
  templates!: PersonalizedTemplateOrmEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
