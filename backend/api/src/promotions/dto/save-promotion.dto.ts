import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsISO8601,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ELIGIBILITY_KINDS, EligibilityKind } from '../domain/eligibility-target';

export class EligibilityTargetDto {
  @IsIn(ELIGIBILITY_KINDS as unknown as string[])
  kind!: EligibilityKind;

  @IsOptional()
  @IsInt()
  @Min(1)
  refId?: number | null;
}

/** Coded promotion (percent only). Fixed-amount discounts are not accepted. */
export class SavePromotionDto {
  @IsString()
  @MaxLength(60)
  code!: string;

  @IsInt()
  @Min(1)
  @Max(100)
  percent!: number;

  @IsISO8601()
  validFrom!: string;

  @IsISO8601()
  validUntil!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(200)
  @ValidateNested({ each: true })
  @Type(() => EligibilityTargetDto)
  eligibility!: EligibilityTargetDto[];
}
