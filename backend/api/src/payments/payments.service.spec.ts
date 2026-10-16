import { PaymentsService } from './payments.service';

describe('PaymentsService custom photobook payments', () => {
  function createManualPricingHarness() {
    const expiresAt = new Date('2026-10-22T12:00:00.000Z');
    const publicLinks = { validate: jest.fn().mockResolvedValue({ linkType: 'PAYMENT_UPLOAD', orderId: 41, expiresAt }) };
    const order = {
      id: 41, channel: 'PHOTOBOOK', status: 'AWAITING_PAYMENT_PROOF', photobookProjectId: 77,
      customerFullName: 'Ana Cliente', customerEmail: 'ana@example.com', totalAmountCents: 15000, currency: 'PEN',
    };
    const orders = { findById: jest.fn().mockResolvedValue(order), advanceStatus: jest.fn() };
    const repo = { findByOrderId: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue({ id: 12, status: 'PENDING' }) };
    const fileStorage = { upload: jest.fn(), delete: jest.fn() };
    const queuedEmails = new Set<string>();
    const emailService: { queue: jest.Mock; queueOnce: jest.Mock } = {
      queue: jest.fn(),
      queueOnce: jest.fn(async (data: any) => {
        const key = `${data.eventType}:${data.orderId}:${data.toEmail}`;
        if (queuedEmails.has(key)) return;
        await emailService.queue(data);
        queuedEmails.add(key);
      }),
    };
    const dataSource = { query: jest.fn((sql: string) => Promise.resolve(sql.includes('custom_photobook_requests') ? [{ id: '9' }] : [])) };
    const service = new PaymentsService(repo as any, publicLinks as any, orders as any, fileStorage as any, emailService as any, dataSource as any);
    return { service, dataSource, emailService, repo, order, orders, fileStorage };
  }

  it('marks custom photobook links as manually priced', async () => {
    const h = createManualPricingHarness();
    const info = await h.service.getPaymentInfo('payment-token');
    expect(info).toMatchObject({ orderId: 41, manualPricing: true });
    expect(info).not.toHaveProperty('totalAmountCents');
    expect(h.dataSource.query).toHaveBeenCalledWith('SELECT id FROM custom_photobook_requests WHERE linked_photobook_project_id = $1 LIMIT 1', [77]);
  });

  it('stores a null amount for manually priced proofs', async () => {
    const h = createManualPricingHarness();
    await h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png');
    expect(h.repo.create).toHaveBeenCalledWith(expect.objectContaining({ amountCents: null }));
  });

  it('retains the real amount for standard orders', async () => {
    const h = createManualPricingHarness();
    h.order.photobookProjectId = null;
    await h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png');
    expect(h.repo.create).toHaveBeenCalledWith(expect.objectContaining({ amountCents: 15000 }));
    expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({ payload: expect.objectContaining({ totalAmountCents: 15000 }) }));
  });

  it('notifies admin and customer without calculated amount', async () => {
    const h = createManualPricingHarness();
    await h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png');
    expect(h.emailService.queue).toHaveBeenCalledTimes(2);
    for (const call of h.emailService.queue.mock.calls) {
      expect(call[0].payload).not.toHaveProperty('totalAmountCents');
    }
  });

  it('reuses persisted proof to retry transition and notifications without duplicates', async () => {
    const h = createManualPricingHarness();
    const proof = { id: 12, status: 'PENDING' };
    h.repo.create.mockResolvedValue(proof);
    h.repo.findByOrderId.mockResolvedValueOnce(null).mockResolvedValue(proof);
    h.orders.advanceStatus.mockRejectedValueOnce(new Error('status failure'));
    h.emailService.queue.mockResolvedValue(undefined);
    await expect(h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png')).rejects.toThrow('status failure');
    await expect(h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png')).resolves.toMatchObject({ id: 12 });
    expect(h.repo.create).toHaveBeenCalledTimes(1);
    expect(h.fileStorage.upload).toHaveBeenCalledTimes(1);
    expect(h.emailService.queue).toHaveBeenCalledTimes(2);
  });

  it('retries a failed customer notification without re-queuing the admin event', async () => {
    const h = createManualPricingHarness();
    const proof = { id: 12, status: 'PENDING' };
    h.repo.create.mockResolvedValue(proof);
    h.repo.findByOrderId.mockResolvedValueOnce(null).mockResolvedValue(proof);
    let customerAttempts = 0;
    h.dataSource.query.mockImplementation((sql: string) => Promise.resolve(
      sql.includes('custom_photobook_requests') ? [{ id: '9' }] : [],
    ));
    h.emailService.queue.mockImplementation(async (data: any) => {
      if (data.eventType === 'CUSTOM_PHOTOBOOK_PAYMENT_RECEIVED_TO_CUSTOMER') {
        customerAttempts += 1;
        if (customerAttempts === 1) throw new Error('outbox unavailable');
      }
    });

    await expect(h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png')).rejects.toThrow('outbox unavailable');
    await expect(h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png')).resolves.toMatchObject({ id: 12 });

    expect(h.emailService.queue.mock.calls.filter(([data]) => data.eventType === 'CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN')).toHaveLength(1);
    expect(customerAttempts).toBe(2);
    expect(h.fileStorage.upload).toHaveBeenCalledTimes(1);
  });

  it('deletes uploaded object when proof persistence fails', async () => {
    const h = createManualPricingHarness();
    h.repo.create.mockRejectedValue(new Error('persistence failure'));
    await expect(h.service.uploadVoucher('payment-token', Buffer.from('voucher'), 'voucher.png', 'image/png')).rejects.toThrow('persistence failure');
    expect(h.fileStorage.delete).toHaveBeenCalledWith(expect.stringMatching(/^uploads\/vouchers\/41-.+\.jpg$/));
  });
});
