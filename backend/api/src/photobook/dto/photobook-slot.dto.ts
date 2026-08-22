import { IsInt, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CropDataDto } from './crop-data.dto';

export class PhotobookSlotDto {
  @IsInt()
  assetId: number;

  @IsInt()
  slotIndex: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CropDataDto)
  cropData?: CropDataDto | null;
}
