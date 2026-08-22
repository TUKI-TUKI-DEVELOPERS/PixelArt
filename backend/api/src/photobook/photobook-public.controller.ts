import { Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PhotobookService } from './photobook.service';
import { CreatePhotobookProjectDto } from './dto/create-photobook-project.dto';
import { CreatePhotobookDraftDto } from './dto/create-photobook-draft.dto';
import { UpdatePhotobookDraftDto } from './dto/update-photobook-draft.dto';

@Controller('photobook')
export class PhotobookPublicController {
  constructor(private readonly service: PhotobookService) {}

  @Get('themes')
  listThemes() { return this.service.listThemes(); }

  @Get('products')
  listProducts() { return this.service.listProducts(); }

  @Post('projects')
  createProject(@Body() body: CreatePhotobookProjectDto) {
    const { draftToken, ...data } = body;
    return this.service.createProject(data, draftToken);
  }

  @Post('drafts')
  createDraft(@Body() body: CreatePhotobookDraftDto) {
    return this.service.createDraft(body.photobookProductId, body.photobookThemeId, body.state ?? {});
  }

  @Put('drafts/:token')
  async updateDraft(@Param('token') token: string, @Body() body: UpdatePhotobookDraftDto) {
    const updated = await this.service.updateDraftState(token, body.state ?? {});
    if (!updated) throw new NotFoundException('Borrador no encontrado');
    return { ok: true };
  }

  @Get('drafts/:token')
  async getDraft(@Param('token') token: string) {
    const draft = await this.service.getDraft(token);
    if (!draft) throw new NotFoundException('Borrador no encontrado');
    return draft;
  }
}
