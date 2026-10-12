import { BadRequestException } from '@nestjs/common';
import { CreateOrderFromDemoUseCase } from './create-order-from-demo.use-case';

const DEMO_REQUEST_ID = 55;
const ORDER_ID = 200;
const FRONTEND_BASE = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

const baseDetail = {
  status: 'PROPOSALS_SENT',
  catalogBookVariantId: 3,
  personalizedModelId: 9,
  customerFullName: 'Cliente Test',
  customerEmail: 'cliente@example.com',
  customerPhone: '+51 999 999 999',
  wantsRush: false,
  deliveryDate: new Date('2026-10-01T00:00:00Z'),
};

const createdOrder = { id: ORDER_ID, totalAmountCents: 8900 };
const generatedLink = {
  token: 'link-token',
  expiresAt: new Date('2026-09-18T00:00:00Z'),
};

type Harness = {
  useCase: CreateOrderFromDemoUseCase;
  demoRepo: { findById: jest.Mock };
  ordersService: { create: jest.Mock };
  publicLinksService: { generate: jest.Mock };
  emailService: { queue: jest.Mock };
  query: jest.Mock;
};

function makeHarness(options: {
  detail?: Record<string, unknown> | null;
  variantRows?: unknown[];
} = {}): Harness {
  const detail = options.detail !== undefined ? options.detail : baseDetail;

  const demoRepo = { findById: jest.fn().mockResolvedValue(detail) };
  const ordersService = { create: jest.fn().mockResolvedValue(createdOrder) };
  const publicLinksService = { generate: jest.fn().mockResolvedValue(generatedLink) };
  const emailService = { queue: jest.fn() };
  const query = jest.fn().mockResolvedValue(options.variantRows ?? [{ base_price_cents: '8900' }]);

  const useCase = new CreateOrderFromDemoUseCase(
    demoRepo as any,
    ordersService as any,
    publicLinksService as any,
    emailService as any,
    { query } as any,
  );

  return { useCase, demoRepo, ordersService, publicLinksService, emailService, query };
}

describe('CreateOrderFromDemoUseCase — guards', () => {
  it('rejects when the demo request does not exist', async () => {
    const h = makeHarness({ detail: null });
    await expect(h.useCase.execute(DEMO_REQUEST_ID)).rejects.toThrow(BadRequestException);
    await expect(h.useCase.execute(DEMO_REQUEST_ID)).rejects.toThrow('Demo request no encontrada');
    expect(h.ordersService.create).not.toHaveBeenCalled();
  });

  it('rejects any status other than PROPOSALS_SENT', async () => {
    for (const status of ['NEW', 'IN_PRODUCTION', 'COMPLETED']) {
      const h = makeHarness({ detail: { ...baseDetail, status } });
      await expect(h.useCase.execute(DEMO_REQUEST_ID)).rejects.toThrow(
        'Las propuestas deben estar enviadas primero',
      );
      expect(h.ordersService.create).not.toHaveBeenCalled();
    }
  });
});

describe('CreateOrderFromDemoUseCase — order creation', () => {
  it('creates a CUSTOM_BOOK order with the variant base price and demo data', async () => {
    const h = makeHarness();
    await h.useCase.execute(DEMO_REQUEST_ID);

    expect(h.query).toHaveBeenCalledWith(expect.stringContaining('FROM catalog_book_variants'), [3]);
    expect(h.ordersService.create).toHaveBeenCalledWith({
      channel: 'CUSTOM_BOOK',
      demoRequestId: DEMO_REQUEST_ID,
      catalogBookVariantId: 3,
      personalizedModelId: 9,
      customerFullName: 'Cliente Test',
      customerEmail: 'cliente@example.com',
      customerPhone: '+51 999 999 999',
      baseAmountCents: 8900,
      rushFeeCents: 0,
      estimatedDeliveryDate: baseDetail.deliveryDate,
    });
  });

  it('charges the 2500 centavos rush fee only when the demo wants rush', async () => {
    const h = makeHarness({ detail: { ...baseDetail, wantsRush: true } });
    await h.useCase.execute(DEMO_REQUEST_ID);
    expect(h.ordersService.create).toHaveBeenCalledWith(
      expect.objectContaining({ rushFeeCents: 2500 }),
    );
  });

  it('defaults the base amount to 0 when the variant is not found', async () => {
    const h = makeHarness({ variantRows: [] });
    await h.useCase.execute(DEMO_REQUEST_ID);
    expect(h.ordersService.create).toHaveBeenCalledWith(
      expect.objectContaining({ baseAmountCents: 0 }),
    );
  });

  it('passes undefined as delivery date when the demo has none', async () => {
    const h = makeHarness({ detail: { ...baseDetail, deliveryDate: null } });
    await h.useCase.execute(DEMO_REQUEST_ID);
    expect(h.ordersService.create).toHaveBeenCalledWith(
      expect.objectContaining({ estimatedDeliveryDate: undefined }),
    );
  });
});

describe('CreateOrderFromDemoUseCase — payment link and email', () => {
  it('generates a PAYMENT_UPLOAD link for the new order', async () => {
    const h = makeHarness();
    await h.useCase.execute(DEMO_REQUEST_ID);
    expect(h.publicLinksService.generate).toHaveBeenCalledWith({
      linkType: 'PAYMENT_UPLOAD',
      orderId: ORDER_ID,
    });
  });

  it('queues the payment link email to the customer', async () => {
    const h = makeHarness();
    await h.useCase.execute(DEMO_REQUEST_ID);
    expect(h.emailService.queue).toHaveBeenCalledWith({
      eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN',
      demoRequestId: DEMO_REQUEST_ID,
      orderId: ORDER_ID,
      toEmail: 'cliente@example.com',
      subject: 'PixelArt — Link de pago para tu libro',
      payload: {
        customerName: 'Cliente Test',
        paymentUrl: `${FRONTEND_BASE}/pagar/link-token`,
        totalAmountCents: 8900,
      },
    });
  });

  it('returns the order id, total and payment link details', async () => {
    const h = makeHarness();
    const result = await h.useCase.execute(DEMO_REQUEST_ID);
    expect(result).toEqual({
      orderId: ORDER_ID,
      totalAmountCents: 8900,
      paymentLink: {
        token: 'link-token',
        url: `${FRONTEND_BASE}/pagar/link-token`,
        expiresAt: generatedLink.expiresAt,
      },
    });
  });
});
