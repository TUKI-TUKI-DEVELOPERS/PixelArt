import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY, UserRepositoryPort } from '../../domain/ports/user-repository.port';
import { User } from '../../domain/user';

@Injectable()
export class FindUserByEmailUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepositoryPort,
  ) {}

  execute(email: string): Promise<User | null> {
    return this.users.findByEmail(email);
  }
}