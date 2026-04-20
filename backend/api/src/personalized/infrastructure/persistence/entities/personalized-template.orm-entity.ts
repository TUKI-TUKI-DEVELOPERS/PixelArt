import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PersonalizedModelOrmEntity } from './personalized-model.orm-entity';

@Entity('personalized_templates')
export class PersonalizedTemplateOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'model_id', type: 'bigint' })
  modelId!: string;

  @Column({ type: 'text', nullable: true })
  name!: string | null;

  @Column({ name: 'template_preview_key', type: 'text' })
  templatePreviewKey!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive!: boolean;

  @ManyToOne(() => PersonalizedModelOrmEntity, (m) => m.templates)
  @JoinColumn({ name: 'model_id' })
  model!: PersonalizedModelOrmEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt!: Date;
}
