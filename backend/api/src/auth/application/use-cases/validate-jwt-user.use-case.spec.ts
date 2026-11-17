import { UnauthorizedException } from '@nestjs/common';
import { User } from '../../../users/domain/user';
import { ValidateJwtUserUseCase } from './validate-jwt-user.use-case';

describe('ValidateJwtUserUseCase', () => {
  const findUserById = { execute: jest.fn() };
  const useCase = new ValidateJwtUserUseCase(findUserById as never);

  beforeEach(() => findUserById.execute.mockReset());

  it('returns the principal with the CURRENT database role, not the role baked into the token', async () => {
    findUserById.execute.mockResolvedValue(new User(7, 'ops@pixelart.pe', 'hash', 'OPERATOR', true));

    await expect(useCase.execute({ sub: 7, email: 'ops@pixelart.pe', role: 'ADMIN' })).resolves.toEqual({
      sub: 7,
      email: 'ops@pixelart.pe',
      role: 'OPERATOR',
    });
    expect(findUserById.execute).toHaveBeenCalledWith(7);
  });

  it('rejects a token whose user no longer exists', async () => {
    findUserById.execute.mockResolvedValue(null);
    await expect(useCase.execute({ sub: 7, email: 'gone@pixelart.pe', role: 'ADMIN' })).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('rejects a token whose user was deactivated', async () => {
    findUserById.execute.mockResolvedValue(new User(7, 'ops@pixelart.pe', 'hash', 'ADMIN', false));
    await expect(useCase.execute({ sub: 7, email: 'ops@pixelart.pe', role: 'ADMIN' })).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it.each([undefined, null, 'abc', 0, -1, 1.5])('rejects a malformed subject %p without querying', async (sub) => {
    await expect(useCase.execute({ sub, email: 'x@pixelart.pe', role: 'ADMIN' } as never)).rejects.toBeInstanceOf(UnauthorizedException);
    expect(findUserById.execute).not.toHaveBeenCalled();
  });
});
