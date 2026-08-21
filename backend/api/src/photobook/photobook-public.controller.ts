import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { PhotobookService } from './photobook.service';
import { CreateProjectData } from './domain/ports/photobook-repository.port';

type CreateProjectBody = CreateProjectData & { draftToken?: string };
type CreateDraftBody = { photobookProductId: number; photobookThemeId: number; state: Record<string, unknown> };
type UpdateDraftBody = { state: Record<string, unknown> };

@Controller('photobook')
export class PhotobookPublicController {
  constructor(private readonly service: PhotobookService) {}

  @Get('themes')
  listThemes() { return this.service.listThemes(); }

  @Get('products')
  listProducts() { return this.service.listProducts(); }

  @Post('projects')
  createProject(@Body() body: CreateProjectBody) {
    const { draftToken, ...data } = body;
    return this.service.createProject(data, draftToken);
  }

  @Post('drafts')
  createDraft(@Body() body: CreateDraftBody) {
    if (!body.photobookProductId || !body.photobookThemeId) {
      throw new BadRequestException('photobookProductId y photobookThemeId son requeridos');
    }
    return this.service.createDraft(body.photobookProductId, body.photobookThemeId, body.state ?? {});
  }

  @Put('drafts/:token')
  async updateDraft(@Param('token') token: string, @Body() body: UpdateDraftBody) {
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
