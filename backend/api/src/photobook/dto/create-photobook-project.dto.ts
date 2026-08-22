import { IsArray, IsBoolean, IsEmail, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProjectData } from '../domain/ports/photobook-repository.port';
import { PhotobookPageDto } from './photobook-page.dto';

export class CreatePhotobookProjectDto implements CreateProjectData {
  @IsInt()
  photobookProductId: number;

  @IsInt()
  photobookThemeId: number;

  @IsEmail()
  customerEmail: string;

  @IsString()
  customerFullName: string;

  @IsString()
  customerPhone: string;

  @IsString()
  deliveryAddress: string;

  @IsOptional()
  @IsString()
  deliveryDistrict?: string;

  @IsOptional()
  @IsString()
  deliveryCity?: string;

  @IsOptional()
  @IsString()
  deliveryDepartment?: string;

  @IsOptional()
  @IsString()
  deliveryRegion?: string;

  @IsOptional()
  @IsString()
  desiredDeliveryDate?: string;

  @IsOptional()
  @IsString()
  coverTitle?: string;

  @IsOptional()
  @IsString()
  customerDni?: string;

  @IsOptional()
  @IsNumber()
  customWidthCm?: number;

  @IsOptional()
  @IsNumber()
  customHeightCm?: number;

  @IsString()
  coverType: string;

  @IsOptional()
  @IsBoolean()
  wantsRush?: boolean;

  // El precio siempre se recalcula en el servidor (ver photobook.service.ts),
  // así que estos tres campos se aceptan si vienen pero nunca se confían.
  @IsOptional()
  @IsNumber()
  pricePerPageCents: number;

  @IsOptional()
  @IsNumber()
  rushFeeCents: number;

  @IsOptional()
  @IsNumber()
  calculatedTotalCents: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PhotobookPageDto)
  pages: PhotobookPageDto[];

  @IsArray()
  @IsInt({ each: true })
  assetIds: number[];

  @IsOptional()
  @IsString()
  draftToken?: string;
}
