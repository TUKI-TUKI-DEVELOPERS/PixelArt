import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PhotobookSlotDto } from './photobook-slot.dto';

export class PhotobookPageDto {
  @IsInt()
  pageNumber: number;

  @IsString()
  layoutKey: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotobookSlotDto)
  slots: PhotobookSlotDto[];
}
