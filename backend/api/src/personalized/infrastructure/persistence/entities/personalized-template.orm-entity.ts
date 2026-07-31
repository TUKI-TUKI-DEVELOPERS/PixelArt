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
import { CharacterRole } from '../../../domain/character-role';

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

  @Column({ name: 'gender_direction', type: 'varchar', length: 20, nullable: true })
  genderDirection!: string | null;

  @Column({ name: 'scene_visual', type: 'text', nullable: true })
  sceneVisual!: string | null;

  @Column({ name: 'background_details', type: 'text', nullable: true })
  backgroundDetails!: string | null;

  @Column({ name: 'magic_effects', type: 'text', nullable: true })
  magicEffects!: string | null;

  @Column({ name: 'lighting_color', type: 'text', nullable: true })
  lightingColor!: string | null;

  @Column({ name: 'poem_template', type: 'text', nullable: true })
  poemTemplate!: string | null;

  @Column({ name: 'character_roles', type: 'jsonb', nullable: true })
  characterRoles!: CharacterRole[] | null;

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
