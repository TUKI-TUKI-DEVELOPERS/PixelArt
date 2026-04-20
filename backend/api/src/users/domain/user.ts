export type UserRole = 'ADMIN' | 'OPERATOR' | 'VIEWER';

export class User {
  constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly role: UserRole,
    public readonly isActive: boolean,
  ) {}
}