import { EmailWorkerService } from './email-worker.service';

async function renderEmail(eventType: string, payload: Record<string, unknown>): Promise<string> {
  const row = { id: '1', event_type: eventType, to_email: 'ana@example.com', subject: 'Subject', payload, attempts: 0 };
  const manager = { query: jest.fn() };
  manager.query
    .mockResolvedValueOnce([row]) // claim pending rows
    .mockResolvedValueOnce([]); // mark claimed
  const dataSource = {
    transaction: jest.fn(async (callback: (manager: any) => Promise<unknown>) => callback(manager)),
    query: jest.fn().mockResolvedValue([]),
  };
  const emailSender = { send: jest.fn().mockResolvedValue(undefined) };
  const worker = new EmailWorkerService(dataSource as any, emailSender as any);

  await worker.tick();

  expect(emailSender.send).toHaveBeenCalledTimes(1);
  return emailSender.send.mock.calls[0][2] as string;
}

describe('EmailWorkerService template rendering', () => {
  it('escapes the admin-typed rejection reason', async () => {
    const html = await renderEmail('PAYMENT_REJECTED_TO_CUSTOMER', {
      customerName: 'Ana',
      rejectionReason: '<b>Monto</b> incorrecto <script>alert(1)</script>',
    });

    expect(html).toContain('&lt;b&gt;Monto&lt;/b&gt; incorrecto &lt;script&gt;alert(1)&lt;/script&gt;');
    expect(html).not.toContain('<script>');
  });

  it('keeps the default rejection reason when none is given', async () => {
    const html = await renderEmail('PAYMENT_REJECTED_TO_CUSTOMER', { customerName: 'Ana' });

    expect(html).toContain('No especificado');
  });

  it('escapes the action URL so it cannot break out of the href attribute', async () => {
    const html = await renderEmail('UNIFIED_CHECKOUT_SENT', {
      customerName: 'Ana',
      checkoutUrl: 'https://pixelart.pe/checkout/abc?a=1&b="><img src=x>',
    });

    expect(html).toContain('href="https://pixelart.pe/checkout/abc?a=1&amp;b=&quot;&gt;&lt;img src=x&gt;"');
    expect(html).not.toContain('<img src=x>');
  });

  it('escapes the delivery date and the link expiry', async () => {
    const approved = await renderEmail('PAYMENT_APPROVED_TO_CUSTOMER', {
      customerName: 'Ana',
      estimatedDeliveryDate: '<i>15 de diciembre</i>',
    });
    const coverApproval = await renderEmail('PHOTOBOOK_COVER_APPROVAL_SENT', {
      customerName: 'Ana',
      coverApprovalUrl: 'https://pixelart.pe/aprobar/abc',
      expiresAt: '<u>20/11/2026</u>',
    });

    expect(approved).toContain('&lt;i&gt;15 de diciembre&lt;/i&gt;');
    expect(coverApproval).toContain('&lt;u&gt;20/11/2026&lt;/u&gt;');
  });
});
