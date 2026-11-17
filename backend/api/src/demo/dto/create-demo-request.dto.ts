import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateDemoRequestData } from '../domain/ports/demo-repository.port';

const trim = ({ value }: { value: unknown }) => (typeof value === 'string' ? value.trim() : value);

/**
 * Body of the public POST /api/demo/requests (customer wizard).
 * Structural limits only; business rules (max 3 templates, max 20 photos)
 * stay in CreateDemoRequestUseCase with their customer-facing messages.
 */
export class CreateDemoRequestDto implements CreateDemoRequestData {
  @Type(() => Number) @IsInt() @Min(1)
  catalogBookId: number;

  @Type(() => Number) @IsInt() @Min(1)
  catalogBookVariantId: number;

  @Type(() => Number) @IsInt() @Min(1)
  personalizedCategoryId: number;

  @Type(() => Number) @IsInt() @Min(1)
  personalizedModelId: number;

  @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(120)
  customerFullName: string;

  @Transform(trim) @IsEmail() @MaxLength(254)
  customerEmail: string;

  @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(30)
  customerPhone: string;

  @Transform(trim) @IsString() @IsNotEmpty() @MaxLength(300)
  shippingAddressLine1: string;

  @IsOptional() @IsString() @MaxLength(300)
  shippingAddressLine2?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  shippingCity?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  shippingRegion?: string | null;

  @IsOptional() @IsString() @MaxLength(500)
  shippingReference?: string | null;

  @IsOptional() @IsString() @MaxLength(40)
  deliveryDate?: string | null;

  @IsOptional() @IsBoolean()
  wantsRush?: boolean;

  @IsOptional() @IsIn(['STANDARD', 'PREMIUM'])
  packagePreference?: string;

  @IsBoolean()
  wantsCustomDedication: boolean;

  @IsOptional() @IsString() @MaxLength(4000)
  dedicationText?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  recipientName?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  recipientNickname?: string | null;

  @IsOptional() @IsString() @MaxLength(120)
  dedicatorName?: string | null;

  @IsOptional() @IsString() @MaxLength(20)
  genderDirection?: string | null;

  @IsOptional() @IsObject()
  characterMeta?: Record<string, unknown> | null;

  @IsOptional() @IsString() @MaxLength(2000)
  messageOptional?: string | null;

  @IsArray() @ArrayMaxSize(10) @Type(() => Number) @IsInt({ each: true }) @Min(1, { each: true })
  templateIds: number[];

  @IsArray() @ArrayMaxSize(50) @Type(() => Number) @IsInt({ each: true }) @Min(1, { each: true })
  assetIds: number[];
}
