import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('order_status_events')
export class OrderStatusEventOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'order_id', type: 'bigint' })
  orderId!: string;

  @Column({ name: 'old_status', type: 'text', nullable: true })
  oldStatus!: string | null;

  @Column({ name: 'new_status', type: 'text' })
  newStatus!: string;

  @Column({ name: 'changed_by_user_id', type: 'bigint', nullable: true })
  changedByUserId!: string | null;

  @Column({ type: 'text', nullable: true })
  note!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
