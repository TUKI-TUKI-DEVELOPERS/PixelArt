import { NotFoundException } from '@nestjs/common';
import { OrdersAdminController } from './orders.controller';

describe('OrdersAdminController payment review and print asset writes', () => {
  function createHarness() {
    const order = { id: 41, channel: 'PHOTOBOOK', status: 'UNDER_PAYMENT_REVIEW', photobookProjectId: 77, customerEmail: 'ana@example.com', customerFullName: 'Ana Cliente', estimatedDeliveryDate: null };
    const ordersService = { advanceStatus: jest.fn(), findById: jest.fn().mockResolvedValue(order) };
    const paymentsService = { reviewPayment: jest.fn().mockResolvedValue({ status: 'APPROVED' }) };
    const emailService = { queue: jest.fn(), queueOnce: jest.fn() };
    const photobookPdfService = { generateAndStore: jest.fn().mockResolvedValue(undefined) };
    const fileStorage = { delete: jest.fn() };
    // TypeORM returns [rows, affectedCount] for raw UPDATE/DELETE ... RETURNING on Postgres.
    const dataSource = { query: jest.fn().mockResolvedValue([[], 0]) };
    const controller = new OrdersAdminController(
      ordersService as any, paymentsService as any, emailService as any, photobookPdfService as any,
      {} as any, {} as any, {} as any, {} as any, fileStorage as any, dataSource as any, {} as any,
    );
    return { controller, order, ordersService, paymentsService, emailService, photobookPdfService, fileStorage, dataSource };
  }

  it('runs the approval side effects once for a fresh approval', async () => {
    const h = createHarness();

    await expect(h.controller.reviewPayment('41', { action: 'APPROVE' })).resolves.toEqual({ status: 'APPROVED' });

    expect(h.ordersService.advanceStatus).toHaveBeenCalledWith(41, 'PAYMENT_VERIFIED', 'Pago aprobado por admin');
    expect(h.emailService.queueOnce).toHaveBeenCalledTimes(1);
    expect(h.emailService.queueOnce).toHaveBeenCalledWith(expect.objectContaining({ eventType: 'PAYMENT_APPROVED_TO_CUSTOMER', orderId: 41 }));
    expect(h.emailService.queue).not.toHaveBeenCalled();
    expect(h.photobookPdfService.generateAndStore).toHaveBeenCalledWith(77);
  });

  it('resumes the pending side effects when a previous approval failed half way', async () => {
    const h = createHarness();
    h.paymentsService.reviewPayment.mockResolvedValue({ status: 'APPROVED', alreadyReviewed: true });

    await expect(h.controller.reviewPayment('41', { action: 'APPROVE' })).resolves.toEqual({ status: 'APPROVED', alreadyReviewed: true });

    expect(h.ordersService.advanceStatus).toHaveBeenCalledWith(41, 'PAYMENT_VERIFIED', 'Pago aprobado por admin');
    expect(h.emailService.queueOnce).toHaveBeenCalledWith(expect.objectContaining({ eventType: 'PAYMENT_APPROVED_TO_CUSTOMER', orderId: 41 }));
    expect(h.photobookPdfService.generateAndStore).toHaveBeenCalledWith(77);
  });

  it('skips every side effect when the approval was already completed (double click)', async () => {
    const h = createHarness();
    h.paymentsService.reviewPayment.mockResolvedValue({ status: 'APPROVED', alreadyReviewed: true });
    h.ordersService.findById.mockResolvedValue({ ...h.order, status: 'PAYMENT_VERIFIED' });

    await expect(h.controller.reviewPayment('41', { action: 'APPROVE' })).resolves.toEqual({ status: 'APPROVED', alreadyReviewed: true });

    expect(h.ordersService.advanceStatus).not.toHaveBeenCalled();
    expect(h.emailService.queue).not.toHaveBeenCalled();
    expect(h.emailService.queueOnce).not.toHaveBeenCalled();
    expect(h.dataSource.query).not.toHaveBeenCalled();
    expect(h.photobookPdfService.generateAndStore).not.toHaveBeenCalled();
  });

  it('queues the rejection email at most once, also on a repeated rejection', async () => {
    const h = createHarness();
    h.paymentsService.reviewPayment.mockResolvedValue({ status: 'REJECTED', alreadyReviewed: true });

    await h.controller.reviewPayment('41', { action: 'REJECT', rejectionReason: 'Voucher no válido' });

    expect(h.emailService.queue).not.toHaveBeenCalled();
    expect(h.emailService.queueOnce).toHaveBeenCalledWith(expect.objectContaining({ eventType: 'PAYMENT_REJECTED_TO_CUSTOMER', orderId: 41 }));
    expect(h.ordersService.advanceStatus).not.toHaveBeenCalled();
  });

  it('counts confirmed print assets from the UPDATE ... RETURNING rows', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValue([[{ id: '1' }, { id: '2' }, { id: '3' }], 3]);

    await expect(h.controller.confirmPrintAssets('41')).resolves.toEqual({ confirmed: 3 });
  });

  it('returns 404 when deleting a print asset that does not exist', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValue([[], 0]);

    await expect(h.controller.deletePrintAsset('41', '9')).rejects.toBeInstanceOf(NotFoundException);
    expect(h.fileStorage.delete).not.toHaveBeenCalled();
  });

  it('deletes the stored file of a removed print asset', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValue([[{ storage_key: 'orders/41/template-3.png' }], 1]);

    await expect(h.controller.deletePrintAsset('41', '9')).resolves.toEqual({ deleted: true });
    expect(h.fileStorage.delete).toHaveBeenCalledWith('orders/41/template-3.png');
  });
});
