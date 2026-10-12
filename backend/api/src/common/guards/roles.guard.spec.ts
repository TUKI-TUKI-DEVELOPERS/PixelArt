import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  let reflector: { getAllAndOverride: jest.Mock };
  let guard: RolesGuard;

  const handler = () => undefined;
  class Controller {}

  function makeContext(user?: { role?: string }): ExecutionContext {
    return {
      getHandler: () => handler,
      getClass: () => Controller,
      switchToHttp: () => ({ getRequest: () => ({ user }) }),
    } as unknown as ExecutionContext;
  }

  beforeEach(() => {
    reflector = { getAllAndOverride: jest.fn() };
    guard = new RolesGuard(reflector as unknown as Reflector);
  });

  it('reads the roles metadata from handler and class via getAllAndOverride', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    guard.canActivate(makeContext());
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [handler, Controller]);
  });

  it('allows access when no roles metadata is present', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);
    expect(guard.canActivate(makeContext(undefined))).toBe(true);
  });

  it('allows access when the roles metadata is an empty array', () => {
    reflector.getAllAndOverride.mockReturnValue([]);
    expect(guard.canActivate(makeContext(undefined))).toBe(true);
  });

  it('allows access when the user role is in the required roles', () => {
    reflector.getAllAndOverride.mockReturnValue(['ADMIN', 'OPERATOR']);
    expect(guard.canActivate(makeContext({ role: 'OPERATOR' }))).toBe(true);
  });

  it('throws ForbiddenException("Missing role") when there is no user on the request', () => {
    reflector.getAllAndOverride.mockReturnValue(['ADMIN']);
    expect(() => guard.canActivate(makeContext(undefined))).toThrow(ForbiddenException);
    expect(() => guard.canActivate(makeContext(undefined))).toThrow('Missing role');
  });

  it('throws ForbiddenException("Missing role") when the user has no role', () => {
    reflector.getAllAndOverride.mockReturnValue(['ADMIN']);
    expect(() => guard.canActivate(makeContext({}))).toThrow('Missing role');
  });

  it('throws ForbiddenException("Forbidden") when the user role does not match', () => {
    reflector.getAllAndOverride.mockReturnValue(['ADMIN']);
    expect(() => guard.canActivate(makeContext({ role: 'VIEWER' }))).toThrow(ForbiddenException);
    expect(() => guard.canActivate(makeContext({ role: 'VIEWER' }))).toThrow('Forbidden');
  });
});
