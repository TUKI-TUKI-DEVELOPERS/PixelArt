import { User } from '../user';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
}