import { GUARDS_METADATA } from '@nestjs/common/constants';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PhotobookAdminController } from './photobook-admin.controller';

describe('PhotobookAdminController', () => {
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
    ] as const;

    for (const method of protectedMethods) {
      const guards = Reflect.getMetadata(GUARDS_METADATA, PhotobookAdminController.prototype[method]) as unknown[];
      expect(guards).toContain(JwtAuthGuard);
    }
  });
});
