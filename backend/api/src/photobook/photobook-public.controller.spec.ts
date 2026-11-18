import { HEADERS_METADATA } from '@nestjs/common/constants';
import { PhotobookPublicController } from './photobook-public.controller';

describe('PhotobookPublicController', () => {
  it.each(['getCustomEditorSession', 'getCustomEditorDraft'] as const)(
    'marks %s as not cacheable because it returns the customer contact data',
    (method) => {
      const headers = Reflect.getMetadata(HEADERS_METADATA, PhotobookPublicController.prototype[method]);

      expect(headers).toEqual(expect.arrayContaining([{ name: 'Cache-Control', value: 'no-store' }]));
    },
  );
});
