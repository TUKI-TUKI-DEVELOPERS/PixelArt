import { OrdersAdminController } from './orders.controller';

describe('personalized-book CMYK download routes', () => {
  const converter = { convert: jest.fn().mockResolvedValue(Buffer.from('%PDF-1.7')) };
  const pdf = { renderCmykSource: jest.fn().mockResolvedValue(Buffer.from('rgb-pdf')) };
  const controller = Object.create(OrdersAdminController.prototype) as any;
  controller.ordersService = { findById: jest.fn().mockResolvedValue({ channel: 'CUSTOM_BOOK' }) };
  controller.customBookPdfService = pdf;
  controller.cmykPdfConverter = converter;

  beforeEach(() => { jest.clearAllMocks(); });

  it.each(['covers', 'interior'])('downloads %s as an authorized PDF attachment without changing source output', async (part) => {
    const response = { setHeader: jest.fn(), send: jest.fn() };
    await controller.downloadCustomBookCmyk('42', part, response);
    expect(controller.ordersService.findById).toHaveBeenCalledWith(42);
    expect(pdf.renderCmykSource).toHaveBeenCalledWith(42, part);
    expect(converter.convert).toHaveBeenCalledWith(Buffer.from('rgb-pdf'));
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Disposition', expect.stringMatching(new RegExp(`42-${part}.*\\.pdf`)));
    expect(response.send).toHaveBeenCalledWith(Buffer.from('%PDF-1.7'));
  });
});
