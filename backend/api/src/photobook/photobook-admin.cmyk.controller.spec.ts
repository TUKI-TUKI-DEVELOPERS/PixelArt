import { PhotobookAdminController } from './photobook-admin.controller';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { ROLES_KEY } from '../common/decorators/roles.decorator';

describe('photobook CMYK download routes', () => {
  const pdf = { renderCmykSource: jest.fn().mockResolvedValue(Buffer.from('rgb-pdf')) };
  const converter = { convert: jest.fn().mockResolvedValue(Buffer.from('%PDF-1.7')) };
  const controller = Object.create(PhotobookAdminController.prototype) as any;
  controller.pdfService = pdf;
  controller.cmykPdfConverter = converter;

  beforeEach(() => { jest.clearAllMocks(); });

  it('requires authenticated admin/operator authorization metadata', () => {
    const handler = PhotobookAdminController.prototype.downloadProjectCmyk;
    expect(Reflect.getMetadata('__guards__', handler)).toEqual([JwtAuthGuard, RolesGuard]);
    expect(Reflect.getMetadata(ROLES_KEY, handler)).toEqual(['ADMIN', 'OPERATOR']);
  });

  it.each(['covers', 'interior'])('downloads %s as a PDF attachment without mutating the standard render', async (part) => {
    const response = { setHeader: jest.fn(), send: jest.fn() };
    await controller.downloadProjectCmyk('8', part, response);
    expect(pdf.renderCmykSource).toHaveBeenCalledWith(8, part);
    expect(converter.convert).toHaveBeenCalledWith(Buffer.from('rgb-pdf'));
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Disposition', expect.stringMatching(new RegExp(`8-${part}.*\\.pdf`)));
    expect(response.send).toHaveBeenCalledWith(Buffer.from('%PDF-1.7'));
  });
});
