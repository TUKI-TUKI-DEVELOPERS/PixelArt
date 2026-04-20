import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('feedback')
export class FeedbackOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'order_id', type: 'bigint' })
  orderId!: string;

  @Column({ name: 'model_id', type: 'bigint', nullable: true })
  modelId!: string | null;

  @Column({ name: 'rating_x2', type: 'smallint' })
  ratingX2!: number;

  @Column({ type: 'text', nullable: true })
  comment!: string | null;

  @Column({ name: 'redirected_to_google', type: 'boolean', default: false })
  redirectedToGoogle!: boolean;

  @Column({ name: 'photobook_theme_id', type: 'bigint', nullable: true })
  photobookThemeId!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
