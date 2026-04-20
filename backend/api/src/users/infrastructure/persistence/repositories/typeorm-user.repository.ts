import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from '../../../domain/ports/user-repository.port';
import { User } from '../../../domain/user';
import { UserOrmEntity } from '../entities/user.orm-entity';

@Injectable()
export class TypeOrmUserRepository implements UserRepositoryPort {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const row = await this.repo
      .createQueryBuilder('u')
      .where('LOWER(u.email) = LOWER(:email)', { email })
      .getOne();

    if (!row) return null;

    return new User(
      Number(row.id),
      row.email,
      row.passwordHash,
      row.role as any,
      row.isActive,
    );
  }
}