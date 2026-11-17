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

    return row ? this.toDomain(row) : null;
  }

  async findById(id: number): Promise<User | null> {
    const row = await this.repo.findOne({ where: { id: String(id) } });
    return row ? this.toDomain(row) : null;
  }

  private toDomain(row: UserOrmEntity): User {
    return new User(
      Number(row.id),
      row.email,
      row.passwordHash,
      row.role,
      row.isActive,
    );
  }
}