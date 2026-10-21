import { EmailService, QueueEmailData } from './email.service';

describe('EmailService.queueOnce', () => {
  it('requeues a FAILED event without inserting a duplicate', async () => {
    const manager = { query: jest.fn() };
    manager.query
      .mockResolvedValueOnce([]) // advisory lock
      .mockResolvedValueOnce([{ id: '91', status: 'FAILED' }]);
    const dataSource = { transaction: jest.fn(async (callback: (manager: any) => Promise<void>) => callback(manager)) };
    const service = new EmailService(dataSource as any);
    const email: QueueEmailData = {
      eventType: 'CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN',
      orderId: 41,
      toEmail: 'admin@example.com',
      subject: 'Payment proof retry',
      payload: { customerName: 'Ana' },
    };

    await service.queueOnce(email);

    expect(manager.query).toHaveBeenCalledWith(
      expect.stringContaining("SET status = 'PENDING'"),
      expect.arrayContaining([email.subject, JSON.stringify(email.payload), '91']),
    );
    expect(manager.query.mock.calls.filter(([sql]) => String(sql).includes('INSERT INTO email_outbox'))).toHaveLength(0);
  });

  it('serializes retries and inserts only when no matching outbox event exists', async () => {
    const manager = { query: jest.fn() };
    manager.query
      .mockResolvedValueOnce([]) // advisory lock
      .mockResolvedValueOnce([]) // no existing event
      .mockResolvedValueOnce([]) // insert
      .mockResolvedValueOnce([]) // advisory lock on retry
      .mockResolvedValueOnce([{ id: '91', status: 'PENDING' }]) // existing pending event
      .mockResolvedValueOnce([]) // advisory lock
      .mockResolvedValueOnce([{ id: '92', status: 'SENT' }]); // existing sent event
    const dataSource = { transaction: jest.fn(async (callback: (manager: any) => Promise<void>) => callback(manager)) };
    const service = new EmailService(dataSource as any);
    const email: QueueEmailData = {
      eventType: 'CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN',
      orderId: 41,
      toEmail: 'admin@example.com',
      subject: 'Payment proof',
      payload: { customerName: 'Ana' },
    };

    await service.queueOnce(email);
    await service.queueOnce(email);
    await service.queueOnce(email);

    expect(dataSource.transaction).toHaveBeenCalledTimes(3);
    expect(manager.query).toHaveBeenCalledWith('SELECT pg_advisory_xact_lock(hashtext($1))', ['CUSTOM_PHOTOBOOK_PAYMENT_TO_ADMIN:41:admin@example.com']);
    expect(manager.query.mock.calls.filter(([sql]) => String(sql).includes('INSERT INTO email_outbox'))).toHaveLength(1);
  });
});
