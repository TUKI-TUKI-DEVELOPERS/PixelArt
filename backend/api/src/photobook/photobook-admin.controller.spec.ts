import { GUARDS_METADATA } from '@nestjs/common/constants';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PhotobookAdminController } from './photobook-admin.controller';

describe('PhotobookAdminController', () => {
  it('delegates reference cover selection with numeric ids and the requested surface', async () => {
    const service = { applyReferenceAsCustomCover: jest.fn().mockResolvedValue({ id: 14, isSelected: true }) };
    const controller = new PhotobookAdminController(service as any, {} as any, {} as any, {} as any);

    await expect(controller.applyReferenceAsCustomCover('41', '77', 'FRONT_COVER')).resolves.toEqual({ id: 14, isSelected: true });
    expect(service.applyReferenceAsCustomCover).toHaveBeenCalledWith(41, 77, 'FRONT_COVER');
  });

  it('delegates cover deselection with numeric ids', async () => {
    const service = { deselectCustomCoverProposal: jest.fn().mockResolvedValue({ id: 14, isSelected: false }) };
    const controller = new PhotobookAdminController(service as any, {} as any, {} as any, {} as any);

    await expect(controller.deselectCustomCoverProposal('41', '14')).resolves.toEqual({ id: 14, isSelected: false });
    expect(service.deselectCustomCoverProposal).toHaveBeenCalledWith(41, 14);
  });

  it('protects every custom-request admin endpoint with JWT authentication', () => {
    const protectedMethods = [
      'listCustomRequests',
      'getCustomRequest',
      'generateCustomCoverProposal',
      'listCustomCoverProposals',
      'downloadCustomCoverProposal',
      'deleteCustomCoverProposal',
      'selectCustomCoverProposal',
      'sendCustomCoverApproval',
      'sendCustomEditorCode',
      'listCustomReferenceAssets',
      'addCustomReferenceAsset',
      'replaceCustomReferenceAsset',
      'setCustomReferenceAssetActive',
      'applyReferenceAsCustomCover',
      'deselectCustomCoverProposal',
    ] as const;

    for (const method of protectedMethods) {
      const guards = Reflect.getMetadata(GUARDS_METADATA, PhotobookAdminController.prototype[method]) as unknown[];
      expect(guards).toContain(JwtAuthGuard);
    }
  });
});
