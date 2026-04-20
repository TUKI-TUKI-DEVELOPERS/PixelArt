import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('demo_template_selections')
export class DemoTemplateSelectionOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'demo_request_id', type: 'bigint' })
  demoRequestId!: string;

  @Column({ name: 'template_id', type: 'bigint' })
  templateId!: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
