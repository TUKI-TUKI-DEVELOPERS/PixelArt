import { IsString, MaxLength, MinLength } from 'class-validator';

export class RedeemCustomPhotobookEditorCodeDto {
  @IsString()
  @MinLength(12)
  @MaxLength(20)
  code!: string;
}
