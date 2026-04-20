import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
@Index('users_lower_email_uidx', { synchronize: false })
export class UserOrmEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string; // TypeORM retorna bigint como string

  @Column({ type: 'text' })
  email: string;

  @Column({ name: 'password_hash', type: 'text' })
  passwordHash: string;

  @Column({ name: 'full_name', type: 'text' })
  fullName: string;

  @Column({ type: 'text', default: 'ADMIN' })
  role: 'ADMIN' | 'OPERATOR' | 'VIEWER';

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @Column({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}