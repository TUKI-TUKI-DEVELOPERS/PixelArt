import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';

describe('OrdersService custom photobook lifecycle', () => {
  function createHarness() {
    const repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findByPublicToken: jest.fn(),
      updateStatus: jest.fn(),
      updateExtraTemplates: jest.fn(),
      ensurePhotobookConfigurationOrder: jest.fn(),
      activatePhotobookOrder: jest.fn(),
      getStatusEvents: jest.fn(),
    };
    return { repo, service: new OrdersService(repo as any) };
  }

  it('moves a configuration order to awaiting payment once the photobook is complete', async () => {
    const h = createHarness();
    h.repo.findById.mockResolvedValue({ id: 41, status: 'CONFIGURING_PHOTOBOOK' });

    await expect(h.service.advanceStatus(41, 'AWAITING_PAYMENT_PROOF', 'Editor completed')).resolves.toEqual({
      orderId: 41,
      oldStatus: 'CONFIGURING_PHOTOBOOK',
      newStatus: 'AWAITING_PAYMENT_PROOF',
    });
    expect(h.repo.updateStatus).toHaveBeenCalledWith(41, 'AWAITING_PAYMENT_PROOF', 'Editor completed');
  });

  it('does not allow a configuration order to skip payment', async () => {
    const h = createHarness();
    h.repo.findById.mockResolvedValue({ id: 41, status: 'CONFIGURING_PHOTOBOOK' });

    await expect(h.service.advanceStatus(41, 'IN_PRODUCTION')).rejects.toBeInstanceOf(BadRequestException);
  });

  it('delegates configuration and activation operations to the persistence port', async () => {
    const h = createHarness();
    const input = {
      photobookProjectId: 79,
      customerFullName: 'Ana Cliente',
      customerEmail: 'ana@example.com',
      customerPhone: '+51999111222',
      baseAmountCents: 12900,
    };
    h.repo.ensurePhotobookConfigurationOrder.mockResolvedValue({ id: 7 });
    h.repo.activatePhotobookOrder.mockResolvedValue({ id: 7, status: 'AWAITING_PAYMENT_PROOF' });

    await expect(h.service.ensurePhotobookConfigurationOrder(input)).resolves.toEqual({ id: 7 });
    await expect(h.service.activatePhotobookOrder(input)).resolves.toEqual({ id: 7, status: 'AWAITING_PAYMENT_PROOF' });
  });
});
