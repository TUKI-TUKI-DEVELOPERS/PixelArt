import { Injectable } from '@nestjs/common';
import { GetCheckoutInfoUseCase } from './application/use-cases/get-checkout-info.use-case';
import { SubmitCheckoutUseCase, SubmitCheckoutInput } from './application/use-cases/submit-checkout.use-case';

@Injectable()
export class CheckoutService {
  constructor(
    private readonly getInfoUseCase: GetCheckoutInfoUseCase,
    private readonly submitUseCase: SubmitCheckoutUseCase,
  ) {}

  getInfo(token: string) { return this.getInfoUseCase.execute(token); }
  submit(input: SubmitCheckoutInput) { return this.submitUseCase.execute(input); }
}
