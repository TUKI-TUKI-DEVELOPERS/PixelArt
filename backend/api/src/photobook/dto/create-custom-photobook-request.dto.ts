import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
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

  @IsString()
  @MinLength(1)
  @Matches(/\S/, { message: 'coverTitle must not be blank' })
  @MaxLength(160)
  coverTitle: string;

  @IsIn(CUSTOM_PHOTOBOOK_COVER_MODES)
  coverMode: CustomPhotobookCoverMode;

  @IsString()
  @MaxLength(2000)
  brief: string;

  @IsArray()
  @ArrayMinSize(2)
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
  @Matches(/^(?:(?:\+?51)?9(?:[\s().-]?\d){8}|\+[1-9](?:[\s().-]?\d){7,14})$/, {
    message: 'customerPhone must be a valid Peruvian mobile number or an international number with + prefix',
  })
  @MaxLength(40)
  customerPhone: string;
}
