import { Injectable } from '@nestjs/common';
import { LoginUseCase } from './application/use-cases/login.use-case';

@Injectable()
export class AuthService {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  login(email: string, password: string) {
    return this.loginUseCase.execute(email, password);
  }
}