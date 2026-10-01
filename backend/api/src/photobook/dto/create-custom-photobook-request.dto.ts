import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export const CUSTOM_PHOTOBOOK_COVER_MODES = [
  'PIXELART_DESIGNED',
  'CUSTOMER_ARTWORK',
  'PHOTO_BASED',
] as const;

export type CustomPhotobookCoverMode = typeof CUSTOM_PHOTOBOOK_COVER_MODES[number];

export const CUSTOM_PHOTOBOOK_REFERENCE_SURFACES = ['FRONT_COVER', 'BACK_COVER'] as const;
export type CustomPhotobookReferenceSurface = typeof CUSTOM_PHOTOBOOK_REFERENCE_SURFACES[number];

export class CreateCustomPhotobookReferenceSlotDto {
  @IsInt()
  assetId: number;

  @IsIn(CUSTOM_PHOTOBOOK_REFERENCE_SURFACES)
  surface: CustomPhotobookReferenceSurface;

  @IsInt()
  @Min(1)
  @Max(2)
  slotIndex: number;
}

export class CreateCustomPhotobookRequestDto {
  @IsString()
  @MaxLength(100)
  occasion: string;

  @IsString()
  @MaxLength(160)
  requestedTheme: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  coverTitle?: string;

  @IsIn(CUSTOM_PHOTOBOOK_COVER_MODES)
  coverMode: CustomPhotobookCoverMode;

  @IsString()
  @MaxLength(2000)
  brief: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(4)
  @ValidateNested({ each: true })
  @Type(() => CreateCustomPhotobookReferenceSlotDto)
  referenceSlots: CreateCustomPhotobookReferenceSlotDto[];

  @IsString()
  @MaxLength(120)
  customerFullName: string;

  @IsEmail()
  @MaxLength(254)
  customerEmail: string;

  @IsString()
  @Matches(/^(?=(?:\D*\d){8,15}\D*$)\+?[0-9\s().-]+$/, {
    message: 'customerPhone must contain 8 to 15 digits and valid phone separators only',
  })
  @MaxLength(40)
  customerPhone: string;
}
