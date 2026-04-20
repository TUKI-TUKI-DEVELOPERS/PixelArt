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
