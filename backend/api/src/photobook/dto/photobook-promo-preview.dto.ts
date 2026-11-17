import { IsBoolean, IsIn, IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

const COVER_TYPES = ['TAPA_DELGADA', 'TAPA_GRUESA'];
/** 60 sheets × 2 caras: the editor maximum. */
const MAX_PAGE_COUNT = 120;

class PhotobookPromoPreviewBaseDto {
  @IsString()
  @MaxLength(60)
  code!: string;

  @IsIn(COVER_TYPES)
  coverType!: string;

  /** Number of caras (pages) in the editor. */
  @IsInt()
  @Min(0)
  @Max(MAX_PAGE_COUNT)
  pageCount!: number;

  @IsOptional()
  @IsBoolean()
  wantsRush?: boolean;
}

export class TemplatePhotobookPromoPreviewDto extends PhotobookPromoPreviewBaseDto {
  @IsInt()
  @Min(1)
  photobookThemeId!: number;
}

export class CustomPhotobookPromoPreviewDto extends PhotobookPromoPreviewBaseDto {
  @IsInt()
  @Min(0)
  customCoverSurchargeCents!: number;
}
