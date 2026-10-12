import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';
import { CustomPhotobookCoverSurface } from '../domain/services/build-custom-photobook-cover-prompt';

export class GenerateCustomPhotobookCoverProposalDto {
  @IsIn(['FRONT_COVER', 'BACK_COVER'])
  surface: CustomPhotobookCoverSurface;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  creativeDirection?: string;
}
