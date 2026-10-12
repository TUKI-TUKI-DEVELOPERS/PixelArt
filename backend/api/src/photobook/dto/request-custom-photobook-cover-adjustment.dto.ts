import { IsIn, IsString, MaxLength, MinLength } from 'class-validator';

export const CUSTOM_PHOTOBOOK_COVER_ADJUSTMENT_SURFACES = [
  'FRONT_COVER',
  'BACK_COVER',
  'BOTH',
] as const;

export type CustomPhotobookCoverAdjustmentSurface = typeof CUSTOM_PHOTOBOOK_COVER_ADJUSTMENT_SURFACES[number];

export class RequestCustomPhotobookCoverAdjustmentDto {
  @IsIn(CUSTOM_PHOTOBOOK_COVER_ADJUSTMENT_SURFACES)
  surface!: CustomPhotobookCoverAdjustmentSurface;

  @IsString()
  @MinLength(5)
  @MaxLength(1200)
  message!: string;
}
