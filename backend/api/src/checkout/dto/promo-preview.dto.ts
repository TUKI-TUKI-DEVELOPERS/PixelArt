import { IsIn, IsString, MaxLength } from 'class-validator';
import { CheckoutPackage } from '../domain/checkout-pricing';

export class PromoPreviewDto {
  @IsString()
  @MaxLength(60)
  code!: string;

  @IsIn(['STANDARD', 'PREMIUM'])
  package!: CheckoutPackage;
}
