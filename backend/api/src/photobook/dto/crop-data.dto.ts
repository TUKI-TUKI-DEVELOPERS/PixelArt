import { IsNumber, IsOptional } from 'class-validator';

export class CropDataDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsOptional()
  @IsNumber()
  zoom?: number;
}
