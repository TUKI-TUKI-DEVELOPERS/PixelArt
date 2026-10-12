import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PublicLink } from '../../../public-links/domain/public-link';
import { SubmitCheckoutUseCase, SubmitCheckoutInput } from './submit-checkout.use-case';

const ORDER_ID = 100;
const DEMO_REQUEST_ID = 55;
const MODEL_ID = 9;
const HOUR_MS = 60 * 60 * 1000;

const EXPECTED_ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || 'luccano5@hotmail.com';
const FRONTEND_BASE = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

function makeLink(overrides: { linkType?: string; orderId?: number | null } = {}): PublicLink {
  return new PublicLink(
    7,
    overrides.linkType ?? 'CHECKOUT',
    'tok-123',
    new Date(Date.now() + HOUR_MS),
    null,
    null,
    overrides.orderId !== undefined ? overrides.orderId : ORDER_ID,
    null,
    new Date(),
  );
}

const baseOrder = {
  id: ORDER_ID,
  demoRequestId: DEMO_REQUEST_ID,
  personalizedModelId: MODEL_ID,
  customerFullName: 'Cliente Test',
  totalAmountCents: 28900,
  currency: 'PEN',
};

type Harness = {
  useCase: SubmitCheckoutUseCase;
  publicLinksService: { validate: jest.Mock; revoke: jest.Mock };
  ordersService: { findById: jest.Mock; updateExtraTemplates: jest.Mock; advanceStatus: jest.Mock };
  fileStorage: { upload: jest.Mock };
  emailService: { queue: jest.Mock };
  query: jest.Mock;
};

function makeHarness(options: {
  link?: PublicLink;
  order?: Record<string, unknown> | null;
  updatedOrder?: Record<string, unknown> | null;
  existingProofRows?: unknown[];
  validTemplateCount?: number;
  originalSelections?: Array<{ template_id: string }>;
} = {}): Harness {
  const link = options.link ?? makeLink();
  const order = options.order !== undefined ? options.order : baseOrder;
  const updatedOrder = options.updatedOrder !== undefined ? options.updatedOrder : order;

  const publicLinksService = { validate: jest.fn().mockResolvedValue(link), revoke: jest.fn() };
  const ordersService = {
    findById: jest.fn().mockResolvedValueOnce(order).mockResolvedValueOnce(updatedOrder),
    updateExtraTemplates: jest.fn(),
    advanceStatus: jest.fn(),
  };
  const fileStorage = { upload: jest.fn() };
  const emailService = { queue: jest.fn() };

  const query = jest.fn(async (sql: string) => {
    if (sql.includes('SELECT id FROM payment_proofs')) return options.existingProofRows ?? [];
    if (sql.includes('FROM personalized_templates')) {
      return [{ count: options.validTemplateCount }];
    }
    if (sql.includes('FROM demo_template_selections')) {
      return options.originalSelections ?? [
        { template_id: '1' },
        { template_id: '2' },
        { template_id: '3' },
      ];
    }
    return [];
  });

  const useCase = new SubmitCheckoutUseCase(
    publicLinksService as any,
    ordersService as any,
    fileStorage as any,
    emailService as any,
    { query } as any,
  );

  return { useCase, publicLinksService, ordersService, fileStorage, emailService, query };
}

function makeInput(overrides: Partial<SubmitCheckoutInput> = {}): SubmitCheckoutInput {
  return {
    token: 'tok-123',
    additionalTemplateIds: [4, 5, 6, 7, 8, 9, 10],
    packageType: 'STANDARD',
    paymentBuffer: Buffer.from('voucher-bytes'),
    originalFilename: 'voucher.jpg',
    mimeType: 'image/jpeg',
    ...overrides,
  };
}

describe('SubmitCheckoutUseCase — link and order guards', () => {
  it('rejects a link that is not of type CHECKOUT', async () => {
    const h = makeHarness({ link: makeLink({ linkType: 'DEMO_VIEW' }) });
    await expect(h.useCase.execute(makeInput())).rejects.toThrow(BadRequestException);
    await expect(h.useCase.execute(makeInput())).rejects.toThrow('Link de checkout inválido');
  });

  it('rejects a CHECKOUT link without an orderId', async () => {
    const h = makeHarness({ link: makeLink({ orderId: null }) });
    await expect(h.useCase.execute(makeInput())).rejects.toThrow('Link de checkout inválido');
  });

  it('throws NotFoundException when the order does not exist', async () => {
    const h = makeHarness({ order: null });
    await expect(h.useCase.execute(makeInput())).rejects.toThrow(NotFoundException);
  });

  it('rejects an order without an associated demo request', async () => {
    const h = makeHarness({ order: { ...baseOrder, demoRequestId: null } });
    await expect(h.useCase.execute(makeInput())).rejects.toThrow('Orden sin demo request asociada');
  });

  it('rejects when a payment proof was already submitted', async () => {
    const h = makeHarness({ existingProofRows: [{ id: 1 }] });
    await expect(h.useCase.execute(makeInput())).rejects.toThrow(
      'Ya se envió el comprobante para esta orden',
    );
    expect(h.fileStorage.upload).not.toHaveBeenCalled();
  });
});

describe('SubmitCheckoutUseCase — template count rule', () => {
  it('requires exactly 7 additional templates for STANDARD', async () => {
    const h = makeHarness();
    await expect(
      h.useCase.execute(makeInput({ additionalTemplateIds: [4, 5, 6] })),
    ).rejects.toThrow('Debes seleccionar 7 plantillas adicionales para el paquete STANDARD');
  });

  it('requires exactly 12 additional templates for PREMIUM', async () => {
    const h = makeHarness();
    await expect(
      h.useCase.execute(makeInput({ packageType: 'PREMIUM', additionalTemplateIds: [4, 5, 6, 7, 8, 9, 10] })),
    ).rejects.toThrow('Debes seleccionar 12 plantillas adicionales para el paquete PREMIUM');
  });

  it('rejects too many templates as well', async () => {
    const h = makeHarness();
    await expect(
      h.useCase.execute(makeInput({ additionalTemplateIds: [4, 5, 6, 7, 8, 9, 10, 11] })),
    ).rejects.toThrow(BadRequestException);
  });
});

describe('SubmitCheckoutUseCase — template ownership rule', () => {
  it('rejects when some selected template does not belong to the model', async () => {
    const h = makeHarness({ validTemplateCount: 6 }); // 7 sent, only 6 valid
    await expect(h.useCase.execute(makeInput())).rejects.toThrow(
      'Alguna plantilla seleccionada no pertenece al modelo de tu solicitud',
    );
    expect(h.ordersService.updateExtraTemplates).not.toHaveBeenCalled();
    expect(h.fileStorage.upload).not.toHaveBeenCalled();
  });

  it('queries ownership with the selected ids and the order model id', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    await h.useCase.execute(makeInput());
    const ownershipCall = h.query.mock.calls.find(([sql]) => sql.includes('FROM personalized_templates'));
    expect(ownershipCall[1]).toEqual([[4, 5, 6, 7, 8, 9, 10], MODEL_ID]);
  });
});

describe('SubmitCheckoutUseCase — happy paths', () => {
  it('STANDARD: never charges extra templates and completes the full flow', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    const result = await h.useCase.execute(makeInput());

    expect(h.ordersService.updateExtraTemplates).not.toHaveBeenCalled();
    expect(h.publicLinksService.revoke).toHaveBeenCalledWith(7);
    expect(h.ordersService.advanceStatus).toHaveBeenCalledWith(
      ORDER_ID,
      'UNDER_PAYMENT_REVIEW',
      'Comprobante enviado por el cliente',
    );
    expect(result).toEqual({
      success: true,
      totalAmountCents: 28900,
      currency: 'PEN',
      message: 'Pedido confirmado. Tu comprobante será revisado pronto.',
    });
  });

  it('PREMIUM: charges the extra templates fee of 4000 centavos before reloading the order', async () => {
    const updatedOrder = { ...baseOrder, totalAmountCents: 32900 };
    const h = makeHarness({
      validTemplateCount: 12,
      updatedOrder,
    });
    const result = await h.useCase.execute(
      makeInput({ packageType: 'PREMIUM', additionalTemplateIds: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15] }),
    );

    expect(h.ordersService.updateExtraTemplates).toHaveBeenCalledWith(ORDER_ID, 4000);
    expect(result.totalAmountCents).toBe(32900);
  });

  it('inserts the 3 original demo selections plus every additional template', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    await h.useCase.execute(makeInput());

    const inserts = h.query.mock.calls.filter(([sql]) =>
      sql.includes('INSERT INTO order_template_selections'),
    );
    expect(inserts).toHaveLength(10);
    expect(inserts.map(([, params]) => params)).toEqual([
      [ORDER_ID, 1],
      [ORDER_ID, 2],
      [ORDER_ID, 3],
      [ORDER_ID, 4],
      [ORDER_ID, 5],
      [ORDER_ID, 6],
      [ORDER_ID, 7],
      [ORDER_ID, 8],
      [ORDER_ID, 9],
      [ORDER_ID, 10],
    ]);
  });

  it('uploads the voucher as jpg for non-png mime types', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    const input = makeInput({ mimeType: 'image/jpeg' });
    await h.useCase.execute(input);
    expect(h.fileStorage.upload).toHaveBeenCalledWith(
      `uploads/vouchers/${ORDER_ID}.jpg`,
      input.paymentBuffer,
      'image/jpeg',
    );
  });

  it('uploads the voucher as png when the mime type contains png', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    await h.useCase.execute(makeInput({ mimeType: 'image/png' }));
    expect(h.fileStorage.upload).toHaveBeenCalledWith(
      `uploads/vouchers/${ORDER_ID}.png`,
      expect.any(Buffer),
      'image/png',
    );
  });

  it('records the payment proof with the reloaded total, size and YAPE_QR method', async () => {
    const updatedOrder = { ...baseOrder, totalAmountCents: 31000 };
    const h = makeHarness({ validTemplateCount: 7, updatedOrder });
    const input = makeInput();
    await h.useCase.execute(input);

    const proofInsert = h.query.mock.calls.find(([sql]) => sql.includes('INSERT INTO payment_proofs'));
    expect(proofInsert[1]).toEqual([
      ORDER_ID,
      `uploads/vouchers/${ORDER_ID}.jpg`,
      'voucher.jpg',
      'image/jpeg',
      input.paymentBuffer.length,
      'YAPE_QR',
      31000,
    ]);
  });

  it('queues the admin notification email with the order data', async () => {
    const h = makeHarness({ validTemplateCount: 7 });
    await h.useCase.execute(makeInput());

    expect(h.emailService.queue).toHaveBeenCalledWith({
      eventType: 'NEW_PAYMENT_TO_ADMIN',
      orderId: ORDER_ID,
      toEmail: EXPECTED_ADMIN_EMAIL,
      subject: 'PixelArt — Nuevo comprobante de pago para revisar',
      payload: {
        customerName: 'Cliente Test',
        totalAmountCents: 28900,
        adminUrl: `${FRONTEND_BASE}/admin/ordenes/${ORDER_ID}`,
      },
    });
  });
});
