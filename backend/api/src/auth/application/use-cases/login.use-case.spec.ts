import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.use-case';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

const compareMock = bcrypt.compare as unknown as jest.Mock;

describe('LoginUseCase', () => {
  let findUserByEmail: { execute: jest.Mock };
  let tokenGenerator: { signAccessToken: jest.Mock };
  let useCase: LoginUseCase;

  const activeUser = {
    id: '42',
    email: 'admin@pixelart.pe',
    role: 'ADMIN',
    isActive: true,
    passwordHash: 'hashed-password',
  };

  beforeEach(() => {
    findUserByEmail = { execute: jest.fn() };
    tokenGenerator = { signAccessToken: jest.fn() };
    useCase = new LoginUseCase(findUserByEmail as any, tokenGenerator as any);
  });

  it('throws UnauthorizedException for an unknown email without comparing passwords', async () => {
    findUserByEmail.execute.mockResolvedValue(null);

    await expect(useCase.execute('nobody@pixelart.pe', 'secret')).rejects.toThrow(
      UnauthorizedException,
    );
    await expect(useCase.execute('nobody@pixelart.pe', 'secret')).rejects.toThrow(
      'Invalid credentials',
    );
    expect(compareMock).not.toHaveBeenCalled();
    expect(tokenGenerator.signAccessToken).not.toHaveBeenCalled();
  });

  it('throws UnauthorizedException for an inactive user without comparing passwords', async () => {
    findUserByEmail.execute.mockResolvedValue({ ...activeUser, isActive: false });

    await expect(useCase.execute(activeUser.email, 'secret')).rejects.toThrow('Invalid credentials');
    expect(compareMock).not.toHaveBeenCalled();
  });

  it('throws UnauthorizedException when the password does not match', async () => {
    findUserByEmail.execute.mockResolvedValue(activeUser);
    compareMock.mockResolvedValue(false);

    await expect(useCase.execute(activeUser.email, 'wrong')).rejects.toThrow('Invalid credentials');
    expect(compareMock).toHaveBeenCalledWith('wrong', 'hashed-password');
    expect(tokenGenerator.signAccessToken).not.toHaveBeenCalled();
  });

  it('returns the signed access token on success', async () => {
    findUserByEmail.execute.mockResolvedValue(activeUser);
    compareMock.mockResolvedValue(true);
    tokenGenerator.signAccessToken.mockResolvedValue('jwt-token');

    const result = await useCase.execute(activeUser.email, 'secret');

    expect(findUserByEmail.execute).toHaveBeenCalledWith(activeUser.email);
    expect(result).toEqual({ accessToken: 'jwt-token' });
  });

  it('signs a payload with numeric sub, email and role', async () => {
    findUserByEmail.execute.mockResolvedValue(activeUser);
    compareMock.mockResolvedValue(true);
    tokenGenerator.signAccessToken.mockResolvedValue('jwt-token');

    await useCase.execute(activeUser.email, 'secret');

    // user.id arrives as a string (BIGINT) and is coerced to number for the JWT.
    expect(tokenGenerator.signAccessToken).toHaveBeenCalledWith({
      sub: 42,
      email: 'admin@pixelart.pe',
      role: 'ADMIN',
    });
  });
});
