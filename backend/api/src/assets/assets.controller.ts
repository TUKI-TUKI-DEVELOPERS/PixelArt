import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThrottlerGuard, Throttle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  /**
   * POST /api/assets/upload — Admin upload (JWT required)
   */
  @Post('upload')
  @UseGuards(JwtAuthGuard, ThrottlerGuard)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.assetsService.uploadAsset({
      buffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      folder: folder || 'uploads/customers',
    });
  }

  /**
   * POST /api/assets/upload-public — Public upload (rate limited, no JWT)
   * Para clientes que suben fotos desde wizards públicos.
   */
  @Post('upload-public')
  @UseGuards(ThrottlerGuard)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @UseInterceptors(FileInterceptor('file'))
  async uploadPublic(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    // Public uploads only allowed to specific folders
    const allowedFolders = ['uploads/customers', 'uploads/photobooks'];
    const targetFolder = folder && allowedFolders.includes(folder) ? folder : 'uploads/customers';
    return this.assetsService.uploadAsset({
      buffer: file.buffer,
      originalFilename: file.originalname,
      mimeType: file.mimetype,
      folder: targetFolder,
    });
  }

  @Get('by-key/url')
  getUrlByStorageKey(@Query('key') key: string) {
    if (!key) {
      throw new BadRequestException('Query parameter "key" is required');
    }
    return this.assetsService.getAssetUrlByStorageKey(key);
  }

  @Get(':id/url')
  getUrl(@Param('id') id: string) {
    return this.assetsService.getAssetUrl(id);
  }
}
