import { Body, Controller, Get, Header, Headers, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { PromoPreviewThrottle, PublicCreateThrottle } from '../common/decorators/throttle.decorators';
import { PhotobookService } from './photobook.service';
import { CreatePhotobookProjectDto } from './dto/create-photobook-project.dto';
import { CreatePhotobookDraftDto } from './dto/create-photobook-draft.dto';
import { UpdatePhotobookDraftDto } from './dto/update-photobook-draft.dto';
import { CreateCustomPhotobookRequestDto } from './dto/create-custom-photobook-request.dto';
import { RequestCustomPhotobookCoverAdjustmentDto } from './dto/request-custom-photobook-cover-adjustment.dto';
import { RedeemCustomPhotobookEditorCodeDto } from './dto/redeem-custom-photobook-editor-code.dto';
import { CustomPhotobookPromoPreviewDto, TemplatePhotobookPromoPreviewDto } from './dto/photobook-promo-preview.dto';

@Controller('photobook')
export class PhotobookPublicController {
  constructor(private readonly service: PhotobookService) {}

  @Get('themes')
  listThemes() { return this.service.listThemes(); }

  @Get('products')
  listProducts() { return this.service.listProducts(); }

  @Post('custom-requests')
  @PublicCreateThrottle(10)
  createCustomRequest(@Body() body: CreateCustomPhotobookRequestDto) {
    return this.service.createCustomRequest(body);
  }

  @Get('custom-requests/cover-approval/:token')
  getCustomCoverApproval(@Param('token') token: string) {
    return this.service.getCustomCoverApproval(token);
  }

  @Post('custom-requests/cover-approval/:token/approve')
  approveCustomCover(@Param('token') token: string) {
    return this.service.approveCustomCover(token);
  }

  @Post('custom-requests/cover-approval/:token/adjustments')
  requestCustomCoverAdjustment(@Param('token') token: string, @Body() body: RequestCustomPhotobookCoverAdjustmentDto) {
    return this.service.requestCustomCoverAdjustment(token, body);
  }

  @Post('custom-editor/access')
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  async redeemCustomEditorCode(
    @Body() body: RedeemCustomPhotobookEditorCodeDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const session = await this.service.redeemCustomEditorCode(body);
    response.cookie('pixelart_custom_editor_session', session.sessionToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: session.expiresAt.getTime() - Date.now(),
      path: '/api/photobook/custom-editor',
    });
    return { ok: true };
  }

  @Get('custom-editor/session')
  @Header('Cache-Control', 'no-store')
  getCustomEditorSession(@Headers('cookie') cookieHeader?: string) {
    return this.service.getCustomEditorSession(this.getCustomEditorSessionToken(cookieHeader));
  }

  @Get('custom-editor/draft')
  @Header('Cache-Control', 'no-store')
  getCustomEditorDraft(@Headers('cookie') cookieHeader?: string) {
    return this.service.getCustomEditorDraft(this.getCustomEditorSessionToken(cookieHeader));
  }

  @Put('custom-editor/draft')
  saveCustomEditorDraft(@Headers('cookie') cookieHeader: string | undefined, @Body() body: { state?: Record<string, unknown> }) {
    return this.service.saveCustomEditorDraft(this.getCustomEditorSessionToken(cookieHeader), body.state ?? {});
  }

  @Post('custom-editor/finalize')
  finalizeCustomEditor(
    @Headers('cookie') cookieHeader: string | undefined,
    @Body() body: { state?: Record<string, unknown>; promoCode?: unknown },
  ) {
    const promoCode = typeof body.promoCode === 'string' ? body.promoCode : undefined;
    return this.service.finalizeCustomEditor(this.getCustomEditorSessionToken(cookieHeader), body.state ?? {}, promoCode);
  }

  @Post('custom-editor/promo-preview')
  @PromoPreviewThrottle()
  previewCustomEditorPromo(@Headers('cookie') cookieHeader: string | undefined, @Body() body: CustomPhotobookPromoPreviewDto) {
    return this.service.previewCustomEditorPromo(this.getCustomEditorSessionToken(cookieHeader), {
      code: body.code,
      coverType: body.coverType,
      pageCount: body.pageCount,
      wantsRush: Boolean(body.wantsRush),
      customCoverSurchargeCents: body.customCoverSurchargeCents,
    });
  }

  @Post('promo-preview')
  @PromoPreviewThrottle()
  previewTemplatePromo(@Body() body: TemplatePhotobookPromoPreviewDto) {
    return this.service.previewTemplatePromo({
      code: body.code,
      themeId: body.photobookThemeId,
      coverType: body.coverType,
      pageCount: body.pageCount,
      wantsRush: Boolean(body.wantsRush),
    });
  }

  private getCustomEditorSessionToken(cookieHeader?: string) {
    const token = cookieHeader
      ?.split(';')
      .map((part) => part.trim())
      .find((part) => part.startsWith('pixelart_custom_editor_session='))
      ?.split('=')[1];
    if (!token) throw new NotFoundException('No encontramos una sesión activa de editor');
    return decodeURIComponent(token);
  }

  @Post('projects')
  @PublicCreateThrottle(10)
  createProject(@Body() body: CreatePhotobookProjectDto) {
    const { draftToken, promoCode, ...data } = body;
    return this.service.createProject(data, draftToken, promoCode);
  }

  @Post('drafts')
  @PublicCreateThrottle(10)
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
