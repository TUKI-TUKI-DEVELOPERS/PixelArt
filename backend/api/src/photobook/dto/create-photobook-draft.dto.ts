import { IsInt, IsObject, IsOptional } from 'class-validator';

export class CreatePhotobookDraftDto {
  @IsInt()
  photobookProductId: number;

  @IsInt()
  photobookThemeId: number;

  @IsOptional()
  @IsObject()
  state?: Record<string, unknown>;
}
