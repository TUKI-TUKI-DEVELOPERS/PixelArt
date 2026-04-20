import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('public_links')
export class PublicLinkOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id!: string;

  @Column({ name: 'link_type', type: 'text' })
  linkType!: string;

  @Column({ type: 'uuid' })
  token!: string;

  @Column({ name: 'expires_at', type: 'timestamptz' })
  expiresAt!: Date;

  @Column({ name: 'revoked_at', type: 'timestamptz', nullable: true })
  revokedAt!: Date | null;

  @Column({ name: 'demo_request_id', type: 'bigint', nullable: true })
  demoRequestId!: string | null;

  @Column({ name: 'order_id', type: 'bigint', nullable: true })
  orderId!: string | null;

  @Column({ name: 'reissued_from_id', type: 'bigint', nullable: true })
  reissuedFromId!: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt!: Date;
}
