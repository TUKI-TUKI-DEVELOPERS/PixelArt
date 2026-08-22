import { IsObject, IsOptional } from 'class-validator';

export class UpdatePhotobookDraftDto {
  @IsOptional()
  @IsObject()
  state?: Record<string, unknown>;
}
