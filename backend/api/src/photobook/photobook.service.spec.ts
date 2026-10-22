import { BadRequestException, NotFoundException } from '@nestjs/common';
import sharp from 'sharp';
import { PhotobookService } from './photobook.service';

const requestData = {
  occasion: 'Viaje',
  requestedTheme: 'Japón',
  coverTitle: 'Japón, otoño de 2026',
  coverMode: 'PIXELART_DESIGNED' as const,
  brief: 'Una cubierta sobria inspirada en el viaje, con una contratapa que continúe el recorrido.',
  referenceSlots: [
    { assetId: 7, surface: 'FRONT_COVER' as const, slotIndex: 1 },
    { assetId: 8, surface: 'FRONT_COVER' as const, slotIndex: 2 },
    { assetId: 9, surface: 'BACK_COVER' as const, slotIndex: 1 },
    { assetId: 10, surface: 'BACK_COVER' as const, slotIndex: 2 },
  ],
  customerFullName: 'Ana Cliente',
  customerEmail: 'ANA@EXAMPLE.COM',
  customerPhone: '+51 999 111 222',
};

const persistedRow = {
  id: '41',
  status: 'PENDING_REVIEW',
  occasion: 'Viaje',
  requestedTheme: 'Japón',
  coverTitle: 'Japón, otoño de 2026',
  coverMode: 'PIXELART_DESIGNED',
  brief: requestData.brief,
  customerFullName: 'Ana Cliente',
  customerEmail: 'ana@example.com',
  customerPhone: '+51 999 111 222',
  referenceAssetIds: ['7', '8', '9', '10'],
  createdAt: new Date('2026-09-28T00:00:00.000Z'),
  updatedAt: new Date('2026-09-28T00:00:00.000Z'),
};

function createHarness() {
  const manager = { query: jest.fn() };
  const dataSource = {
    transaction: jest.fn(async (callback: (transactionManager: typeof manager) => Promise<unknown>) => callback(manager)),
    query: jest.fn(),
  };
  const fileStorage = { download: jest.fn(), upload: jest.fn(), delete: jest.fn(), getPublicUrl: jest.fn((key: string) => `https://assets.test/${key}`) };
  const assetRepo = { findById: jest.fn(), save: jest.fn() };
  const assetsService = { uploadAsset: jest.fn() };
  const imageGeneration = { generateWithReferences: jest.fn(), generate: jest.fn() };
  const emailService = { queue: jest.fn() };
  const publicLinksService = { generate: jest.fn(), validate: jest.fn(), revoke: jest.fn() };
  const repo: Record<string, jest.Mock> = { getProduct: jest.fn(), createDraft: jest.fn(), updateProjectStatus: jest.fn() };
  const ordersService = { create: jest.fn(), ensurePhotobookConfigurationOrder: jest.fn().mockResolvedValue({ id: 99 }), activatePhotobookOrder: jest.fn(), findById: jest.fn() };
  const service = new PhotobookService(
    repo as any,
    fileStorage as any,
    assetRepo as any,
    assetsService as any,
    imageGeneration as any,
    ordersService as any,
    publicLinksService as any,
    emailService as any,
    dataSource as any,
  );

  return { service, manager, dataSource, fileStorage, assetRepo, assetsService, imageGeneration, ordersService, publicLinksService, emailService, repo };
}

describe('PhotobookService.createCustomRequest', () => {
  it('persists the brief and references, then queues an admin notification', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '7' }, { id: '8' }, { id: '9' }, { id: '10' }])
      .mockResolvedValueOnce([{ id: '41' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    h.dataSource.query.mockResolvedValue([persistedRow]);

    const result = await h.service.createCustomRequest(requestData);

    expect(result).toMatchObject({
      id: 41,
      customerEmail: 'ana@example.com',
      referenceAssetIds: [7, 8, 9, 10],
      status: 'PENDING_REVIEW',
    });
    expect(h.manager.query).toHaveBeenCalledTimes(10);
    expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({
      eventType: 'NEW_PHOTOBOOK_REQUEST_TO_ADMIN',
      subject: 'PixelArt — Nueva solicitud de photobook a medida',
      payload: expect.objectContaining({
        customerName: 'Ana Cliente',
        adminUrl: 'http://localhost:3000/admin/photobooks/a-medida/41',
      }),
    }));
  });

  it('accepts one customer-provided image for each cover surface', async () => {
        const h = createHarness();
        h.manager.query
          .mockResolvedValueOnce([{ id: '7' }, { id: '9' }])
          .mockResolvedValueOnce([{ id: '41' }]);
        h.dataSource.query.mockResolvedValue([{ ...persistedRow, coverMode: 'CUSTOMER_ARTWORK', selectedCoverType: 'TAPA_GRUESA', selectedSheetCount: 20, referenceAssetIds: ['7', '9'] }]);

        const result = await h.service.createCustomRequest({
          ...requestData,
          coverMode: 'CUSTOMER_ARTWORK',
          coverType: 'TAPA_GRUESA',
          sheetCount: 20,
          referenceSlots: [
            { assetId: 7, surface: 'FRONT_COVER', slotIndex: 1 },
            { assetId: 9, surface: 'BACK_COVER', slotIndex: 1 },
          ],
        });

        expect(result).toMatchObject({ referenceAssetIds: [7, 9], selectedCoverType: 'TAPA_GRUESA', selectedSheetCount: 20 });
        const insertCall = h.manager.query.mock.calls.find(([query]) => String(query).includes('INSERT INTO custom_photobook_requests'));
        expect(String(insertCall?.[0])).toContain('selected_cover_type');
        expect(insertCall?.[1]).toEqual(expect.arrayContaining(['TAPA_GRUESA', 20]));
        expect(h.manager.query).toHaveBeenCalledTimes(6);
      });

      it('requires a format selection for customer-provided cover artwork', async () => {
        const h = createHarness();

        await expect(h.service.createCustomRequest({
          ...requestData,
          coverMode: 'CUSTOMER_ARTWORK',
        })).rejects.toBeInstanceOf(BadRequestException);
        expect(h.dataSource.transaction).not.toHaveBeenCalled();
      });

      it('rejects a sheet count that is unavailable for the selected cover type', async () => {
        const h = createHarness();

        await expect(h.service.createCustomRequest({
          ...requestData,
          coverMode: 'CUSTOMER_ARTWORK',
          coverType: 'TAPA_DELGADA',
          sheetCount: 50,
        })).rejects.toBeInstanceOf(BadRequestException);
        expect(h.dataSource.transaction).not.toHaveBeenCalled();
      });

      it('rejects a reference asset that does not exist before creating the request', async () => {
    const h = createHarness();
    h.manager.query.mockResolvedValueOnce([{ id: '7' }]);

    await expect(h.service.createCustomRequest(requestData)).rejects.toBeInstanceOf(BadRequestException);
    expect(h.dataSource.query).not.toHaveBeenCalled();
    expect(h.emailService.queue).not.toHaveBeenCalled();
  });

  it('generates and persists an adaptation proposal from one selected customer artwork reference', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([{ ...persistedRow, coverMode: 'CUSTOMER_ARTWORK' }])
      .mockResolvedValueOnce([{ asset_id: '7' }])
      .mockResolvedValueOnce([]);
    h.assetRepo.findById
      .mockResolvedValueOnce({ id: 7, storageKey: 'uploads/reference-7.jpg' });
    h.fileStorage.download.mockResolvedValue(Buffer.from('reference'));
    h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('generated-cover'));
    h.assetRepo.save.mockResolvedValue({ id: 91 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '14', created_at: new Date('2026-09-28T12:00:00.000Z') }])
      .mockResolvedValueOnce([[], 0]);

    const result = await h.service.generateCustomCoverProposal(41, {
      surface: 'FRONT_COVER',
      creativeDirection: 'Luz azul suave y composición limpia.',
    });

    expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
      expect.stringContaining('Luz azul suave y composición limpia.'),
      [Buffer.from('reference')],
      '1024x1024',
    );
    expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
      expect.stringContaining('arte base obligatorio'),
      expect.any(Array),
      '1024x1024',
    );
    expect(h.fileStorage.upload).toHaveBeenCalledWith(expect.stringMatching(/front_cover-.*\.png$/), Buffer.from('generated-cover'), 'image/png');
    expect(result).toMatchObject({ id: 14, surface: 'FRONT_COVER', asset: { id: 91 } });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('DESIGN_IN_PROGRESS'), [41]);
      expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('s.slot_index = 1'), [41, 'FRONT_COVER', true]);
  });

  it('regenerates customer artwork from the original assigned front image, not the prior proposal', async () => {
        const h = createHarness();
        h.dataSource.query
          .mockResolvedValueOnce([{ ...persistedRow, coverMode: 'CUSTOMER_ARTWORK' }])
          .mockResolvedValueOnce([{ asset_id: '7' }])
          .mockResolvedValueOnce([{ id: '13', asset_id: '91', is_selected: false }]);
        h.assetRepo.findById
          .mockResolvedValueOnce({ id: 7, storageKey: 'uploads/original-artwork.jpg' })
          .mockResolvedValueOnce({ id: 91, storageKey: 'photobooks/custom-requests/41/designs/front-cover-13.png' });
        h.fileStorage.download
          .mockResolvedValueOnce(Buffer.from('original-artwork'))
          .mockResolvedValueOnce(Buffer.from('previous-proposal'));
        h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('generated-cover'));
        h.assetRepo.save.mockResolvedValue({ id: 92 });
        h.manager.query
          .mockResolvedValueOnce([{ id: '14', created_at: new Date('2026-09-28T12:00:00.000Z') }])
          .mockResolvedValueOnce([[], 0]);

        const result = await h.service.generateCustomCoverProposal(41, { surface: 'FRONT_COVER' });

        expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
          expect.not.stringContaining('ITERACIÓN DESDE LA PROPUESTA ANTERIOR'),
          [Buffer.from('original-artwork')],
          '1024x1024',
        );
        expect(result).toMatchObject({ id: 14, surface: 'FRONT_COVER', sourceDesignId: null });
      });

      it('regenerates a front cover from the immediately previous proposal', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([persistedRow])
      .mockResolvedValueOnce([{ asset_id: '7' }])
      .mockResolvedValueOnce([{ id: '14', asset_id: '91' }]);
    h.assetRepo.findById
      .mockResolvedValueOnce({ id: 7, storageKey: 'uploads/reference-7.jpg' })
      .mockResolvedValueOnce({ id: 91, storageKey: 'photobooks/custom-requests/41/designs/front-cover-14.png' });
    h.fileStorage.download.mockResolvedValue(Buffer.from('reference'));
    h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('regenerated-cover'));
    h.assetRepo.save.mockResolvedValue({ id: 92 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '15', created_at: new Date('2026-09-30T16:00:00.000Z') }])
      .mockResolvedValueOnce([[], 0]);

    const result = await h.service.generateCustomCoverProposal(41, {
      surface: 'FRONT_COVER',
      creativeDirection: 'Hazla fotorrealista, pero conserva al viajero.',
    });

    expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
      expect.stringContaining('ITERACIÓN DESDE LA PROPUESTA ANTERIOR'),
      [Buffer.from('reference'), Buffer.from('reference')],
      '1024x1024',
    );
    expect(result).toMatchObject({ id: 15, surface: 'FRONT_COVER', sourceDesignId: null });
  });

  it('cleans up the asset of a replaced front proposal using the real DELETE ... RETURNING result shape', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([persistedRow])
      .mockResolvedValueOnce([{ asset_id: '7' }])
      .mockResolvedValueOnce([{ id: '14', asset_id: '5', is_selected: false }])
      .mockResolvedValueOnce([[{ storage_key: 'photobooks/custom-requests/41/designs/front-old.png' }], 1]);
    h.assetRepo.findById
      .mockResolvedValueOnce({ id: 7, storageKey: 'uploads/reference-7.jpg' })
      .mockResolvedValueOnce({ id: 5, storageKey: 'photobooks/custom-requests/41/designs/front-old.png' });
    h.fileStorage.download.mockResolvedValue(Buffer.from('reference'));
    h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('regenerated-cover'));
    h.assetRepo.save.mockResolvedValue({ id: 92 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '15', created_at: new Date('2026-09-30T16:00:00.000Z') }])
      .mockResolvedValueOnce([[{ asset_id: '5' }], 1]);

    await h.service.generateCustomCoverProposal(41, { surface: 'FRONT_COVER', creativeDirection: 'Más contraste.' });

    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [5]);
    expect(h.dataSource.query).not.toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [NaN]);
    expect(h.fileStorage.delete).toHaveBeenCalledWith('photobooks/custom-requests/41/designs/front-old.png');
  });

  it('uses only the assigned back artwork for CUSTOMER_ARTWORK while retaining selected-front lineage', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([{ ...persistedRow, coverMode: 'CUSTOMER_ARTWORK' }])
      .mockResolvedValueOnce([{ asset_id: '9' }])
      .mockResolvedValueOnce([{ id: '14', asset_id: '91' }]);
    h.assetRepo.findById
      .mockResolvedValueOnce({ id: 9, storageKey: 'uploads/back-artwork.jpg' })
      .mockResolvedValueOnce({ id: 91, storageKey: 'designs/front.png' });
    h.fileStorage.download
      .mockResolvedValueOnce(Buffer.from('assigned-back-artwork'))
      .mockResolvedValueOnce(Buffer.from('selected-front-design'));
    h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('generated-back-cover'));
    h.assetRepo.save.mockResolvedValue({ id: 92 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '15', created_at: new Date('2026-09-28T12:00:00.000Z') }])
      .mockResolvedValueOnce([]);

    const result = await h.service.generateCustomCoverProposal(41, { surface: 'BACK_COVER' });

    expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
      expect.any(String), [Buffer.from('assigned-back-artwork')], '1024x1024',
    );
    expect(result).toMatchObject({ id: 15, sourceDesignId: 14, surface: 'BACK_COVER' });
  });

  it('requires a selected front proposal and uses it as a trusted back-cover reference', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([persistedRow])
      .mockResolvedValueOnce([{ asset_id: '7' }, { asset_id: '8' }, { asset_id: '9' }])
      .mockResolvedValueOnce([{ id: '14', asset_id: '91' }]);
    h.assetRepo.findById
      .mockResolvedValueOnce({ id: 7, storageKey: 'uploads/reference-7.jpg' })
      .mockResolvedValueOnce({ id: 8, storageKey: 'uploads/reference-8.jpg' })
      .mockResolvedValueOnce({ id: 9, storageKey: 'uploads/reference-9.jpg' })
      .mockResolvedValueOnce({ id: 91, storageKey: 'photobooks/custom-requests/41/designs/front.png' });
    h.fileStorage.download.mockResolvedValue(Buffer.from('reference'));
    h.imageGeneration.generateWithReferences.mockResolvedValue(Buffer.from('generated-back-cover'));
    h.assetRepo.save.mockResolvedValue({ id: 92 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '15', created_at: new Date('2026-09-28T12:00:00.000Z') }])
      .mockResolvedValueOnce([]);

    const result = await h.service.generateCustomCoverProposal(41, { surface: 'BACK_COVER' });

    expect(h.imageGeneration.generateWithReferences).toHaveBeenCalledWith(
      expect.stringContaining('CONTINUIDAD CON LA TAPA SELECCIONADA'),
      [Buffer.from('reference'), Buffer.from('reference'), Buffer.from('reference'), Buffer.from('reference')],
      '1024x1024',
    );
    expect(result).toMatchObject({ id: 15, sourceDesignId: 14, surface: 'BACK_COVER' });
      expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('s.surface = $2'), [41, 'BACK_COVER', false]);
  });

  it('requires at least one active reference and a direction before generating a front cover', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([persistedRow])
      .mockResolvedValueOnce([]);

    await expect(h.service.generateCustomCoverProposal(41, {
      surface: 'FRONT_COVER',
      creativeDirection: 'Composición sobria.',
    })).rejects.toBeInstanceOf(BadRequestException);

    h.dataSource.query
      .mockResolvedValueOnce([persistedRow]);
    await expect(h.service.generateCustomCoverProposal(41, { surface: 'FRONT_COVER' })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('prevents a sixth working reference inside the serialized request update', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ id: '41' }]);
    h.assetsService.uploadAsset.mockResolvedValue({ id: 93, url: 'https://assets.test/new.jpg' });
    h.manager.query
      .mockResolvedValueOnce([{ id: '41' }])
      .mockResolvedValueOnce([{ slot_count: 0 }])
      .mockResolvedValueOnce([{ count: 5 }]);

    await expect(h.service.addCustomReferenceAsset(41, {
      buffer: Buffer.from('new'),
      originalFilename: 'new.jpg',
      mimeType: 'image/jpeg',
    })).rejects.toBeInstanceOf(BadRequestException);
  });

  it('preserves the selected front cover when a fixed back reference changes', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ surface: 'BACK_COVER' }])
      .mockResolvedValueOnce([]);

    await expect(h.service.setCustomReferenceAssetActive(41, 9, false)).resolves.toEqual({ assetId: 9, isActive: false });

    const queries = h.manager.query.mock.calls.map(([query]) => String(query));
    expect(queries).toContainEqual(expect.stringContaining("surface = 'BACK_COVER'"));
    expect(queries).toContainEqual(expect.stringContaining('back_cover_asset_id = NULL'));
    expect(queries.some((query) => query.includes('front_cover_asset_id = NULL'))).toBe(false);
  });

  it('replaces a working reference with the asset upload pipeline and invalidates old cover selections', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ is_active: true }]);
    h.assetsService.uploadAsset.mockResolvedValue({ id: 93, url: 'https://assets.test/replacement.jpg' });
    h.manager.query.mockResolvedValue([]);

    await expect(h.service.replaceCustomReferenceAsset(41, 7, {
      buffer: Buffer.from('replacement'),
      originalFilename: 'whatsapp-photo.jpg',
      mimeType: 'image/jpeg',
    })).resolves.toEqual({ assetId: 93, url: 'https://assets.test/replacement.jpg', isActive: true });

    expect(h.assetsService.uploadAsset).toHaveBeenCalledWith(expect.objectContaining({
      originalFilename: 'whatsapp-photo.jpg',
      folder: 'uploads/photobooks',
    }));
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM custom_photobook_request_reference_assets'), [41, 7]);
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SET is_selected = false'), [41]);
  });

  it('selects one proposal per cover surface and records its asset on the request', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '14', surface: 'FRONT_COVER', asset_id: '91' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([[{ id: '14' }], 1]);

    await expect(h.service.selectCustomCoverProposal(41, 14)).resolves.toEqual({ id: 14, surface: 'FRONT_COVER', isSelected: true });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining("surface IN ('FRONT_COVER', 'BACK_COVER')"), [14, 41]);
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('front_cover_asset_id = $1'), ['91', 41]);
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining("link_type = 'PHOTOBOOK_COVER_APPROVAL'"), [41]);
  });

  it('selects a manual back cover without a selected front and leaves it independent', async () => {
    const h = createHarness();
    h.manager.query.mockImplementation(async (sql: string) => {
      if (sql.includes('SELECT id, surface, asset_id, source_design_id, provider')) {
        return [{ id: '15', surface: 'BACK_COVER', asset_id: '92', source_design_id: null, provider: 'manual' }];
      }
      if (sql.includes('RETURNING id')) return [{ id: '15' }];
      return [];
    });

    await expect(h.service.selectCustomCoverProposal(41, 15)).resolves.toEqual({
      id: 15,
      surface: 'BACK_COVER',
      isSelected: true,
    });
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes("surface = 'FRONT_COVER'"))).toBe(false);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET source_design_id ='))).toBe(false);
  });

  it('does not link a manual back cover to a selected front', async () => {
    const h = createHarness();
    h.manager.query.mockImplementation(async (sql: string) => {
      if (sql.includes('SELECT id, surface, asset_id, source_design_id, provider')) {
        return [{ id: '15', surface: 'BACK_COVER', asset_id: '92', source_design_id: null, provider: 'manual' }];
      }
      if (sql.includes('RETURNING id')) return [{ id: '15' }];
      return [];
    });

    await expect(h.service.selectCustomCoverProposal(41, 15)).resolves.toEqual({
      id: 15,
      surface: 'BACK_COVER',
      isSelected: true,
    });
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET source_design_id ='))).toBe(false);
  });

  it('rejects a stale back proposal that was generated from another front cover', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '15', surface: 'BACK_COVER', asset_id: '92', source_design_id: '14', provider: 'openai' }])
      .mockResolvedValueOnce([{ id: '16' }]);

    await expect(h.service.selectCustomCoverProposal(41, 15)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('issues a new private approval link only when both selected covers exist', async () => {
    const h = createHarness();
    const expiresAt = new Date('2026-10-05T12:00:00.000Z');
    h.dataSource.query
      .mockResolvedValueOnce([{ id: '41', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', front_cover_asset_id: '91', back_cover_asset_id: '92', selected_front_id: '14', selected_back_id: '15' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);
    h.publicLinksService.generate.mockResolvedValue({ token: 'cover-token', expiresAt });

    await expect(h.service.sendCustomCoverApproval(41)).resolves.toEqual({
      status: 'AWAITING_CUSTOMER',
      publicLink: { token: 'cover-token', url: 'http://localhost:3000/photobooks/a-medida/aprobar/cover-token', expiresAt },
    });
    expect(h.publicLinksService.generate).toHaveBeenCalledWith({ linkType: 'PHOTOBOOK_COVER_APPROVAL', customPhotobookRequestId: 41, ttlDays: 7 });
    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('SET resolved_at = now()'), [41]);
    expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({
      eventType: 'PHOTOBOOK_COVER_APPROVAL_SENT',
      toEmail: 'ana@example.com',
      payload: expect.objectContaining({ coverApprovalUrl: 'http://localhost:3000/photobooks/a-medida/aprobar/cover-token' }),
    }));
  });

  it('does not reset an already approved cover pair when an admin retries the approval email', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{
      id: '41', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', status: 'EDITOR_READY',
      cover_approved_at: new Date('2026-09-30T19:39:57.000Z'), front_cover_asset_id: '91', back_cover_asset_id: '92', selected_front_id: '14', selected_back_id: '15',
    }]);

    await expect(h.service.sendCustomCoverApproval(41)).rejects.toThrow('Las cubiertas ya fueron aprobadas');
    expect(h.publicLinksService.generate).not.toHaveBeenCalled();
    expect(h.emailService.queue).not.toHaveBeenCalled();
  });

  it('rejects approval delivery when the selected visual pair is incomplete', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ id: '41', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', front_cover_asset_id: '91', back_cover_asset_id: null, selected_front_id: '14', selected_back_id: null }]);

    await expect(h.service.sendCustomCoverApproval(41)).rejects.toBeInstanceOf(BadRequestException);
    expect(h.publicLinksService.generate).not.toHaveBeenCalled();
  });

  it('returns the selected pair for a valid private approval link and records the customer approval', async () => {
    const h = createHarness();
    const link = { id: 8, linkType: 'PHOTOBOOK_COVER_APPROVAL', customPhotobookRequestId: 41, expiresAt: new Date('2026-10-05T12:00:00.000Z') };
    h.publicLinksService.validate.mockResolvedValue(link);
    h.dataSource.query
      .mockResolvedValueOnce([{
        customer_full_name: 'Ana Cliente',
        cover_title: 'Japón, otoño de 2026',
        requested_theme: 'Japón',
        status: 'AWAITING_CUSTOMER',
        cover_approved_at: null,
        front_storage_key: 'photobooks/41/front.png',
        back_storage_key: 'photobooks/41/back.png',
      }]);
    h.manager.query
      .mockResolvedValueOnce([{ id: '41', linked_photobook_project_id: null, customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', customer_phone: '+51999111222', selected_cover_type: 'TAPA_GRUESA', selected_sheet_count: 20 }])
      .mockResolvedValueOnce([{ id: '1' }])
      .mockResolvedValueOnce([]);
    h.repo.getProduct.mockResolvedValue({ id: 1 });
    h.repo.createDraft.mockResolvedValue({ id: 77 });

    await expect(h.service.getCustomCoverApproval('cover-token')).resolves.toMatchObject({
      customerName: 'Ana Cliente',
      frontCoverUrl: 'https://assets.test/photobooks/41/front.png',
      backCoverUrl: 'https://assets.test/photobooks/41/back.png',
      isApproved: false,
    });
    await expect(h.service.approveCustomCover('cover-token')).resolves.toEqual({ status: 'EDITOR_READY', approved: true, linkedPhotobookProjectId: 77, orderId: 99 });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('FOR UPDATE'), [41]);
    const draftInput = h.repo.createDraft.mock.calls[0][0];
    expect(draftInput).toMatchObject({
      photobookProductId: 1,
      photobookThemeId: null,
      state: {
        source: 'custom_photobook_request',
        customPhotobookRequestId: 41,
        editorMode: 'CUSTOM_FULL_EDITOR',
        formatConfigured: true,
        coverType: 'TAPA_GRUESA',
        sheetCount: 20,
      },
    });
    expect(draftInput.state.pages).toHaveLength(40);
    expect(draftInput.state.pages[0]).toEqual({ pageNumber: 1, layoutKey: 'FULL_1', slots: [null] });
    expect(h.publicLinksService.revoke).toHaveBeenCalledWith(8);
    expect(h.ordersService.ensurePhotobookConfigurationOrder).toHaveBeenCalledWith({
      photobookProjectId: 77,
      customerFullName: 'Ana Cliente',
      customerEmail: 'ana@example.com',
      customerPhone: '+51999111222',
      baseAmountCents: 0,
    });
  });

  it('records a customer back-cover adjustment while preserving the selected front cover', async () => {
    const h = createHarness();
    h.publicLinksService.validate.mockResolvedValue({ id: 8, linkType: 'PHOTOBOOK_COVER_APPROVAL', customPhotobookRequestId: 41 });
    h.manager.query.mockResolvedValueOnce([{ id: '41', customer_full_name: 'Ana Cliente' }]);

    await expect(h.service.requestCustomCoverAdjustment('cover-token', {
      surface: 'BACK_COVER',
      message: 'Quisiera una composición más limpia detrás de la foto.',
    })).resolves.toEqual({ status: 'CHANGES_REQUESTED', adjustmentRequested: true });

    const queries = h.manager.query.mock.calls.map(([query]) => String(query));
    expect(queries).toContainEqual(expect.stringContaining('INSERT INTO custom_photobook_cover_adjustment_requests'));
    expect(queries).toContainEqual(expect.stringContaining("surface = 'BACK_COVER'"));
    expect(queries).toContainEqual(expect.stringContaining('back_cover_asset_id = NULL'));
    expect(queries.some((query) => query.includes('front_cover_asset_id = NULL'))).toBe(false);
    expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({
      eventType: 'PHOTOBOOK_COVER_CHANGES_REQUESTED_TO_ADMIN',
      payload: expect.objectContaining({
        customerName: 'Ana Cliente',
        adjustmentSurface: 'Contratapa',
      }),
    }));
  });

  it('reuses an already linked project when approval is retried', async () => {
    const h = createHarness();
    h.publicLinksService.validate.mockResolvedValue({ id: 8, linkType: 'PHOTOBOOK_COVER_APPROVAL', customPhotobookRequestId: 41 });
    h.manager.query
      .mockResolvedValueOnce([{ id: '41', linked_photobook_project_id: '77', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', customer_phone: '+51999111222' }])
      .mockResolvedValueOnce([]);

    await expect(h.service.approveCustomCover('cover-token')).resolves.toEqual({ status: 'EDITOR_READY', approved: true, linkedPhotobookProjectId: 77, orderId: 99 });

    expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringContaining('INSERT INTO photobook_projects'), expect.anything());
    expect(h.publicLinksService.revoke).toHaveBeenCalledWith(8);
  });

  it('opens a custom editor only through an active opaque session', async () => {
    const h = createHarness();
    h.dataSource.query
      .mockResolvedValueOnce([{ request_id: '41' }])
      .mockResolvedValueOnce([{
        customer_full_name: 'Ana Cliente', cover_title: 'Japón, otoño de 2026', requested_theme: 'Japón', status: 'EDITOR_READY',
        linked_photobook_project_id: '77', front_storage_key: 'photobooks/41/front.png', back_storage_key: 'photobooks/41/back.png',
      }]);

    await expect(h.service.getCustomEditorSession('opaque-session')).resolves.toMatchObject({
      customerName: 'Ana Cliente', linkedPhotobookProjectId: 77, frontCoverUrl: 'https://assets.test/photobooks/41/front.png',
    });
    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('custom_photobook_editor_sessions'), expect.any(Array));
  });

  it.each([['missing', undefined], ['invalid', 'UNKNOWN_COVER']])('rejects a 50-sheet custom format with %s coverType before writes or order creation', async (_label, coverType) => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ request_id: '41' }]);
    h.manager.query.mockResolvedValueOnce([{ id: '41', status: 'EDITOR_IN_PROGRESS', linked_photobook_project_id: '77' }]);
    const createOrder = jest.spyOn(h.service, 'createOrderFromProject');
    const pages = Array.from({ length: 100 }, (_, index) => ({ pageNumber: index + 1, layoutKey: 'FULL_1', slots: [{ id: 501 }] }));

    await expect(h.service.finalizeCustomEditor('opaque-session', {
      formatConfigured: true,
      ...(coverType === undefined ? {} : { coverType }),
      pages,
      form: { name: 'Ana Cliente', email: 'ana@example.com', phone: '+51999111222', deliveryAddress: 'Av. Principal 123', deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa' },
    })).rejects.toMatchObject({ message: 'El formato seleccionado no es válido. Elige nuevamente la tapa y cantidad de hojas.' });
    expect(h.manager.query).toHaveBeenCalledTimes(1);
    expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringMatching(/INSERT INTO|UPDATE photobook_projects|DELETE FROM photobook_/), expect.anything());
    expect(createOrder).not.toHaveBeenCalled();
    expect(h.ordersService.activatePhotobookOrder).not.toHaveBeenCalled();
    expect(h.publicLinksService.generate).not.toHaveBeenCalled();
    expect(h.emailService.queue).not.toHaveBeenCalled();
  });

      it('rejects a 10-sheet custom format before writing the project or creating an order', async () => {
        const h = createHarness();
        h.dataSource.query.mockResolvedValueOnce([{ request_id: '41' }]);
        h.manager.query.mockResolvedValueOnce([{ id: '41', status: 'EDITOR_IN_PROGRESS', linked_photobook_project_id: '77' }]);
        const createOrder = jest.spyOn(h.service, 'createOrderFromProject');
        const pages = Array.from({ length: 20 }, (_, index) => ({
          pageNumber: index + 1,
          layoutKey: 'FULL_1',
          slots: [{ id: 501 }],
        }));

        const error = await h.service.finalizeCustomEditor('opaque-session', {
          formatConfigured: true,
          coverType: 'TAPA_DELGADA',
          pages,
        }).catch((reason: unknown) => reason);

        expect(error).toBeInstanceOf(BadRequestException);
        expect(error).toMatchObject({ message: 'El formato seleccionado no es válido. Elige nuevamente la tapa y cantidad de hojas.' });

        expect(h.manager.query).toHaveBeenCalledTimes(1);
        expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SELECT id, status, linked_photobook_project_id'), [41]);
        expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringMatching(/INSERT INTO|UPDATE photobook_projects|DELETE FROM photobook_/), expect.anything());
        expect(createOrder).not.toHaveBeenCalled();
        expect(h.ordersService.activatePhotobookOrder).not.toHaveBeenCalled();
        expect(h.publicLinksService.generate).not.toHaveBeenCalled();
        expect(h.emailService.queue).not.toHaveBeenCalled();
      });

      it('rejects finalization when a selected custom-format page has no photo', async () => {
      const h = createHarness();
      h.dataSource.query.mockResolvedValueOnce([{ request_id: '41' }]);
      h.manager.query.mockResolvedValueOnce([{ id: '41', status: 'EDITOR_IN_PROGRESS', linked_photobook_project_id: '77' }]);
      const pages = Array.from({ length: 30 }, (_, index) => ({
        pageNumber: index + 1,
        layoutKey: 'FULL_1',
        slots: index === 29 ? [null] : [{ id: 501 }],
      }));

      await expect(h.service.finalizeCustomEditor('opaque-session', {
        formatConfigured: true,
        coverType: 'TAPA_DELGADA',
        pages,
      })).rejects.toBeInstanceOf(BadRequestException);
      expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringContaining('DELETE FROM photobook_project_assets'), expect.anything());
    });

    it('allows a valid unexpired editor code to create another session without revoking itself', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '1', request_id: '41' }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    await expect(h.service.redeemCustomEditorCode({ code: 'ABCD-EFGH-JKLM' })).resolves.toMatchObject({ requestId: 41, sessionToken: expect.any(String) });
    const update = h.manager.query.mock.calls.find(([query]) => String(query).includes('UPDATE custom_photobook_editor_access_codes'))?.[0] as string;
    expect(update).toContain('redeem_count = redeem_count + 1');
    expect(update).not.toContain('revoked_at =');
  });

  it('revokes previous credentials and emails a fresh code for the editor', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '41', status: 'EDITOR_IN_PROGRESS', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', linked_photobook_project_id: '77' }])
      .mockResolvedValue([]);

    await expect(h.service.sendCustomEditorCode(41)).resolves.toMatchObject({
      status: 'EDITOR_IN_PROGRESS', linkedPhotobookProjectId: 77, codeExpiresAt: expect.any(Date),
    });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('custom_photobook_editor_access_codes'), [41]);
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('custom_photobook_editor_sessions'), [41]);
    expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({
      eventType: 'PHOTOBOOK_EDITOR_CODE_SENT', toEmail: 'ana@example.com',
      payload: expect.objectContaining({ editorPortalUrl: 'http://localhost:3000/photobooks/acceso' }),
    }));
  });

  it('returns persisted proposals with their public preview URLs', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{
      id: '14',
      surface: 'FRONT_COVER',
      asset_id: '91',
      assembled_prompt: 'Prompt completo',
      provider: 'openai',
      created_at: new Date('2026-09-28T12:00:00.000Z'),
      storage_key: 'photobooks/custom-requests/41/designs/front.png',
    }]);

    await expect(h.service.listCustomCoverProposals(41)).resolves.toEqual([expect.objectContaining({
      id: 14,
      surface: 'FRONT_COVER',
      asset: { id: 91, url: 'https://assets.test/photobooks/custom-requests/41/designs/front.png' },
    })]);
  });

  it('downloads the current proposal as a PNG attachment', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ surface: 'FRONT_COVER', storage_key: 'photobooks/custom-requests/41/designs/front.png' }]);
    h.fileStorage.download.mockResolvedValue(Buffer.from('png'));

    await expect(h.service.downloadCustomCoverProposal(41, 14)).resolves.toEqual({
      buffer: Buffer.from('png'),
      filename: 'tapa-frontal-14.png',
      mimeType: 'image/png',
    });
  });

  it('removes every unselected proposal for a surface so the next generation starts clean', async () => {
    const h = createHarness();
    h.manager.query
      .mockResolvedValueOnce([{ id: '14', surface: 'FRONT_COVER', is_selected: false }])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([[{ asset_id: '91' }, { asset_id: '90' }, { asset_id: '89' }], 3]);
    h.dataSource.query
      .mockResolvedValueOnce([[{ storage_key: 'photobooks/custom-requests/41/designs/front.png' }], 1])
      .mockResolvedValueOnce([[], 0])
      .mockResolvedValueOnce([[], 0]);

    await expect(h.service.deleteCustomCoverProposal(41, 14)).resolves.toEqual({ surface: 'FRONT_COVER', deletedCount: 3 });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM custom_photobook_request_designs'), [41, 'FRONT_COVER']);
    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [91]);
    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [90]);
    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [89]);
    expect(h.fileStorage.delete).toHaveBeenCalledTimes(1);
    expect(h.fileStorage.delete).toHaveBeenCalledWith('photobooks/custom-requests/41/designs/front.png');
  });

  it('protects a selected proposal from deletion', async () => {
    const h = createHarness();
    h.manager.query.mockResolvedValueOnce([{ id: '14', surface: 'FRONT_COVER', is_selected: true }]);

    await expect(h.service.deleteCustomCoverProposal(41, 14)).rejects.toBeInstanceOf(BadRequestException);
  });

  it('finalizes a configured custom editor into a payable shared order', async () => {
    const h = createHarness();
    const pages = Array.from({ length: 30 }, (_, index) => ({ pageNumber: index + 1, layoutKey: 'FULL_1', slots: [{ id: 501 }] }));
    h.dataSource.query
      .mockResolvedValueOnce([{ request_id: '41' }])
      .mockResolvedValueOnce([]);
    h.manager.query.mockImplementation((query: string) => {
      if (query.includes('SELECT id, status, linked_photobook_project_id')) {
        return Promise.resolve([{ id: '41', status: 'EDITOR_IN_PROGRESS', linked_photobook_project_id: '77' }]);
      }
      if (query.includes('INSERT INTO photobook_pages')) return Promise.resolve([{ id: '901' }]);
      return Promise.resolve([]);
    });
    h.repo.findProjectById = jest.fn().mockResolvedValue({
      id: 77, status: 'CONFIRMED', customerFullName: 'Ana Cliente', customerEmail: 'ana@example.com', customerPhone: '+51999111222', calculatedTotalCents: 11500,
    });
    h.repo.updateProjectStatus = jest.fn();
    h.ordersService.activatePhotobookOrder.mockResolvedValue({ id: 55, totalAmountCents: 11500 });
    h.publicLinksService.generate.mockResolvedValue({ token: 'payment-token', expiresAt: new Date('2026-10-07T00:00:00.000Z') });

    await expect(h.service.finalizeCustomEditor('opaque-session', {
      formatConfigured: true,
      coverType: 'TAPA_DELGADA',
      pages,
      wantsRush: false,
      customCoverSurchargeCents: 2500,
      form: {
        name: 'Ana Cliente', email: 'ana@example.com', phone: '+51999111222', deliveryAddress: 'Av. Principal 123', deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa',
      },
    })).resolves.toMatchObject({
      projectId: 77,
      status: 'AWAITING_PAYMENT',
      order: { orderId: 55, totalAmountCents: 11500, paymentLink: { url: 'http://localhost:3000/pagar/payment-token' } },
    });
    expect(h.ordersService.activatePhotobookOrder).toHaveBeenCalledWith(expect.objectContaining({ photobookProjectId: 77 }));
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining("status = 'AWAITING_PAYMENT'"), [41]);
    const projectUpdate = h.manager.query.mock.calls.find(([query]) => String(query).includes('calculated_total_cents = $13'));
    expect(projectUpdate?.[1][12]).toBe(11500);
    expect(JSON.parse(projectUpdate?.[1][13] as string)).toMatchObject({ customCoverSurchargeCents: 2500 });
  });

  it.each([
    { label: 'missing', surcharge: undefined },
    { label: 'negative', surcharge: -1 },
    { label: 'fractional', surcharge: 2500.5 },
    { label: 'non-numeric', surcharge: '2500' },
  ])('rejects a $label custom-cover surcharge before writing or creating an order', async ({ surcharge }) => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{ request_id: '41' }]);
    h.manager.query.mockResolvedValueOnce([{ id: '41', status: 'EDITOR_IN_PROGRESS', linked_photobook_project_id: '77' }]);
    const pages = Array.from({ length: 30 }, (_, index) => ({ pageNumber: index + 1, layoutKey: 'FULL_1', slots: [{ id: 501 }] }));

    await expect(h.service.finalizeCustomEditor('opaque-session', {
      formatConfigured: true, coverType: 'TAPA_DELGADA', pages, wantsRush: false,
      customCoverSurchargeCents: surcharge,
      form: { name: 'Ana', email: 'ana@example.com', phone: '999111222', deliveryAddress: 'Av. Principal 123', deliveryDistrict: 'Yanahuara', deliveryCity: 'Arequipa', deliveryRegion: 'Arequipa', deliveryDepartment: 'Arequipa' },
    })).rejects.toBeInstanceOf(BadRequestException);

    expect(h.manager.query).toHaveBeenCalledTimes(1);
    expect(h.ordersService.activatePhotobookOrder).not.toHaveBeenCalled();
  });

  it('activates a linked configuration order and returns the shared QR payment link', async () => {
    const h = createHarness();
    h.repo.findProjectById = jest.fn().mockResolvedValue({
      id: 79,
      status: 'CONFIRMED',
      customerFullName: 'Ana Cliente',
      customerEmail: 'ana@example.com',
      customerPhone: '+51999111222',
      calculatedTotalCents: 12900,
    });
    h.repo.updateProjectStatus = jest.fn();
    h.ordersService.activatePhotobookOrder.mockResolvedValue({ id: 55, totalAmountCents: 12900 });
    h.dataSource.query.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    h.publicLinksService.generate.mockResolvedValue({ token: 'payment-token', expiresAt: new Date('2026-10-07T00:00:00.000Z') });

    await expect(h.service.createOrderFromProject(79)).resolves.toMatchObject({
      orderId: 55,
      totalAmountCents: 12900,
      paymentLink: { token: 'payment-token', url: 'http://localhost:3000/pagar/payment-token' },
    });
    expect(h.ordersService.activatePhotobookOrder).toHaveBeenCalledWith(expect.objectContaining({ photobookProjectId: 79, baseAmountCents: 12900 }));
    expect(h.repo.updateProjectStatus).toHaveBeenCalledWith(79, 'CONVERTED_TO_ORDER');
        expect(h.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({ eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN', payload: expect.objectContaining({ totalAmountCents: 12900 }) }));
        const manual = createHarness();
        manual.repo.findProjectById = jest.fn().mockResolvedValue({ id: 79, status: 'CONFIRMED', customerFullName: 'Ana Cliente', customerEmail: 'ana@example.com', customerPhone: '+51999111222', calculatedTotalCents: 12900 });
        manual.ordersService.activatePhotobookOrder.mockResolvedValue({ id: 56, totalAmountCents: 12900 });
        manual.dataSource.query.mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: '9' }]);
        manual.publicLinksService.generate.mockResolvedValue({ token: 'manual-payment-token', expiresAt: new Date('2026-10-07T00:00:00.000Z') });
        await manual.service.createOrderFromProject(79);
        expect(manual.emailService.queue).toHaveBeenCalledWith(expect.objectContaining({ eventType: 'PAYMENT_PROOF_RECEIVED_ADMIN', payload: expect.not.objectContaining({ totalAmountCents: expect.any(Number) }) }));
  });

});

describe('PhotobookService.createProject dimensions', () => {
  const baseData = {
    photobookProductId: 1,
    photobookThemeId: 3,
    customerEmail: 'ana@example.com',
    customerFullName: 'Ana Cliente',
    customerPhone: '+51999111222',
    deliveryAddress: 'Av. Siempre Viva 123',
    coverType: 'TAPA_GRUESA',
    pricePerPageCents: 0,
    rushFeeCents: 0,
    calculatedTotalCents: 0,
    pages: [{ pageNumber: 1, layoutKey: 'FULL_1', slots: [] }],
    assetIds: [],
  };

  function mockProductAndPersistence(h: ReturnType<typeof createHarness>, allowsCustomDimensions: boolean) {
    h.repo.getProduct.mockResolvedValue({ id: 1, name: 'Cuadrado 22x22', minPages: 1, pricePerPageCents: 250, allowsCustomDimensions });
    h.repo.createProject = jest.fn().mockResolvedValue({ id: 9 });
    h.repo.findProjectById = jest.fn().mockRejectedValue(new Error('skip auto order creation'));
  }

  it('drops submitted custom dimensions for the square 22x22 product so the PDF stays square', async () => {
    const h = createHarness();
    mockProductAndPersistence(h, false);

    await h.service.createProject({ ...baseData, customWidthCm: 21, customHeightCm: 29.7 } as any);

    expect(h.repo.createProject).toHaveBeenCalledWith(expect.objectContaining({ customWidthCm: undefined, customHeightCm: undefined }));
  });

  it('keeps custom dimensions only for products that allow them', async () => {
    const h = createHarness();
    mockProductAndPersistence(h, true);

    await h.service.createProject({ ...baseData, customWidthCm: 30, customHeightCm: 20 } as any);

    expect(h.repo.createProject).toHaveBeenCalledWith(expect.objectContaining({ customWidthCm: 30, customHeightCm: 20 }));
  });

  it('still requires both dimensions when the product allows custom dimensions', async () => {
    const h = createHarness();
    mockProductAndPersistence(h, true);

    await expect(h.service.createProject({ ...baseData, customWidthCm: 30 } as any)).rejects.toBeInstanceOf(BadRequestException);
    expect(h.repo.createProject).not.toHaveBeenCalled();
  });
});

describe('PhotobookService.uploadCustomCoverArtwork', () => {
  it('validates print dimensions and stores manual artwork without invoking image generation', async () => {
    const h = createHarness();
    const image = await sharp({
      create: { width: 2500, height: 2500, channels: 3, background: '#804187' },
    }).png().toBuffer();
    const createdAt = new Date('2026-10-21T12:00:00.000Z');
    h.dataSource.query.mockResolvedValueOnce([{ id: '41' }]);
    h.assetsService.uploadAsset.mockResolvedValue({
      id: 91,
      storageKey: 'uploads/photobooks/final-cover.png',
      url: 'https://assets.test/final-cover.png',
      width: 2500,
      height: 2500,
    });
    h.manager.query
      .mockResolvedValueOnce([{ id: '14', created_at: createdAt }])
      .mockResolvedValueOnce([[], 0])
      .mockResolvedValueOnce([[], 1]);

    const result = await h.service.uploadCustomCoverArtwork(41, 'FRONT_COVER', {
      buffer: image,
      originalFilename: 'tapa-final.png',
      mimeType: 'image/png',
    });

    expect(h.assetsService.uploadAsset).toHaveBeenCalledWith(expect.objectContaining({
      originalFilename: 'tapa-final.png',
      mimeType: 'image/png',
      folder: 'uploads/photobooks',
    }));
    expect(result).toMatchObject({
      id: 14,
      surface: 'FRONT_COVER',
      isSelected: false,
      provider: 'manual',
      dimensions: { width: 2500, height: 2500 },
      asset: { id: 91, url: 'https://assets.test/final-cover.png' },
    });
    expect(h.imageGeneration.generateWithReferences).not.toHaveBeenCalled();
    expect(h.fileStorage.delete).not.toHaveBeenCalled();
  });

  it('cleans up the asset of a replaced unselected proposal using the real DELETE ... RETURNING result shape', async () => {
    const h = createHarness();
    const image = await sharp({
      create: { width: 2500, height: 2500, channels: 3, background: '#804187' },
    }).png().toBuffer();
    h.dataSource.query
      .mockResolvedValueOnce([{ id: '41' }])
      .mockResolvedValueOnce([[{ storage_key: 'uploads/photobooks/previous-cover.png' }], 1]);
    h.assetsService.uploadAsset.mockResolvedValue({
      id: 91,
      storageKey: 'uploads/photobooks/final-cover.png',
      url: 'https://assets.test/final-cover.png',
      width: 2500,
      height: 2500,
    });
    h.manager.query
      .mockResolvedValueOnce([{ id: '14', created_at: new Date('2026-10-21T12:00:00.000Z') }])
      .mockResolvedValueOnce([[{ asset_id: '5' }], 1])
      .mockResolvedValueOnce([[], 1]);

    await h.service.uploadCustomCoverArtwork(41, 'FRONT_COVER', {
      buffer: image,
      originalFilename: 'tapa-final.png',
      mimeType: 'image/png',
    });

    expect(h.dataSource.query).toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [5]);
    expect(h.dataSource.query).not.toHaveBeenCalledWith(expect.stringContaining('DELETE FROM assets'), [NaN]);
    expect(h.fileStorage.delete).toHaveBeenCalledWith('uploads/photobooks/previous-cover.png');
  });
});

describe('PhotobookService.applyReferenceAsCustomCover', () => {
  async function makeImage(width: number, height: number) {
    return sharp({
      create: { width, height, channels: 3, background: '#804187' },
    }).png().toBuffer();
  }

  function mockReference(
    h: ReturnType<typeof createHarness>,
    assetId = 77,
    surface: 'FRONT_COVER' | 'BACK_COVER' = 'FRONT_COVER',
  ) {
    h.dataSource.query.mockImplementation(async (sql: string) => {
      if (sql.includes('FROM custom_photobook_request_reference_assets')) {
        return [{ storage_key: 'uploads/photobooks/customer-cover.png', width: 2500, height: 2500 }];
      }
      return [[], 0];
    });
    h.fileStorage.download.mockResolvedValue(undefined);
    h.manager.query.mockImplementation(async (sql: string) => {
      if (sql.includes('INSERT INTO custom_photobook_request_designs')) {
        return [{ id: '14', created_at: new Date('2026-10-21T12:00:00.000Z') }];
      }
      if (sql.startsWith('SELECT id, surface, asset_id, source_design_id, provider')) {
        return [{ id: '14', surface, asset_id: String(assetId), source_design_id: null, provider: 'manual' }];
      }
      if (sql.includes('RETURNING id')) return [{ id: '14' }];
      return [];
    });
  }

  it('reuses and selects a valid reference asset without uploading or deleting it', async () => {
    const h = createHarness();
    const image = await makeImage(2500, 2500);
    mockReference(h);
    h.fileStorage.download.mockResolvedValue(image);

    const result = await h.service.applyReferenceAsCustomCover(41, 77, 'FRONT_COVER');

    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining("VALUES ($1, $2, $3, NULL, $4, 'manual')"),
      [41, 'FRONT_COVER', 77, 'Foto del cliente usada tal cual; no se utilizó generación con IA.'],
    );
    expect(result).toMatchObject({
      id: 14,
      surface: 'FRONT_COVER',
      isSelected: true,
      provider: 'manual',
      asset: { id: 77, url: 'https://assets.test/uploads/photobooks/customer-cover.png' },
      dimensions: { width: 2500, height: 2500 },
    });
    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining('SET is_selected = true'),
      [14, 41],
    );
    expect(h.assetsService.uploadAsset).not.toHaveBeenCalled();
    expect(h.fileStorage.delete).not.toHaveBeenCalled();
  });

  it('rejects a non-square reference with the custom-artwork validation message and inserts nothing', async () => {
    const h = createHarness();
    const image = await makeImage(3000, 2000);
    mockReference(h);
    h.fileStorage.download.mockResolvedValue(image);

    await expect(h.service.applyReferenceAsCustomCover(41, 77, 'FRONT_COVER')).rejects.toThrow(
      'La imagen debe ser cuadrada y medir al menos 2500 × 2500 px para una tapa de 22 × 22 cm. El archivo recibido mide 3000 × 2000 px.',
    );
    expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringContaining('INSERT INTO custom_photobook_request_designs'), expect.anything());
  });

  it('rejects an asset that is not a reference of this request', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([]);

    await expect(h.service.applyReferenceAsCustomCover(41, 77, 'FRONT_COVER'))
      .rejects.toThrow(new NotFoundException('La referencia no pertenece a esta solicitud'));
    expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringContaining('INSERT INTO custom_photobook_request_designs'), expect.anything());
  });

  it('selects a back reference independently without requiring or linking a front cover', async () => {
    const h = createHarness();
    const image = await makeImage(2500, 2500);
    mockReference(h, 77, 'BACK_COVER');
    h.fileStorage.download.mockResolvedValue(image);

    const result = await h.service.applyReferenceAsCustomCover(41, 77, 'BACK_COVER');

    expect(result).toMatchObject({ surface: 'BACK_COVER', sourceDesignId: null, isSelected: true });
    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining("VALUES ($1, $2, $3, NULL, $4, 'manual')"),
      [41, 'BACK_COVER', 77, 'Foto del cliente usada tal cual; no se utilizó generación con IA.'],
    );
    expect(h.dataSource.query).not.toHaveBeenCalledWith(expect.stringContaining("surface = 'FRONT_COVER'"), expect.anything());
    expect(h.manager.query).not.toHaveBeenCalledWith(expect.stringContaining('SET source_design_id ='), expect.anything());
  });
});

describe('PhotobookService cover selection independence', () => {
  function mockSelection(
    h: ReturnType<typeof createHarness>,
    design: { id: string; surface: 'FRONT_COVER' | 'BACK_COVER'; asset_id: string; source_design_id: string | null; provider: string },
    selectedBack: { id: string; source_design_id: string | null; provider: string } | null = null,
    selectedFront: { id: string } | null = null,
  ) {
    h.manager.query.mockImplementation(async (sql: string) => {
      if (sql.includes('SELECT id, surface, asset_id, source_design_id, provider')) return [design];
      if (sql.includes("surface = 'BACK_COVER'") && sql.includes('is_selected = true')) return selectedBack ? [selectedBack] : [];
      if (sql.includes("surface = 'FRONT_COVER'") && sql.includes('is_selected = true')) return selectedFront ? [selectedFront] : [];
      if (sql.includes('RETURNING id')) return [{ id: design.id }];
      return [];
    });
  }

  it('preserves an independently selected manual back cover when selecting a new front', async () => {
    const h = createHarness();
    mockSelection(h, { id: '20', surface: 'FRONT_COVER', asset_id: '101', source_design_id: null, provider: 'openai' }, {
      id: '30', source_design_id: null, provider: 'manual',
    });

    await expect(h.service.selectCustomCoverProposal(41, 20)).resolves.toMatchObject({ surface: 'FRONT_COVER', isSelected: true });
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET back_cover_asset_id = NULL'))).toBe(false);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).startsWith('UPDATE ') && String(sql).includes("surface = 'BACK_COVER'"))).toBe(false);
  });

  it('removes an AI-derived back cover when it belongs to a different front', async () => {
    const h = createHarness();
    mockSelection(h, { id: '20', surface: 'FRONT_COVER', asset_id: '101', source_design_id: null, provider: 'openai' }, {
      id: '30', source_design_id: '10', provider: 'openai',
    });

    await h.service.selectCustomCoverProposal(41, 20);

    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining('SET is_selected = false'),
      ['30', 41],
    );
    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining('SET back_cover_asset_id = NULL'),
      [41],
    );
  });

  it('preserves an AI-derived back cover already based on the newly selected front', async () => {
    const h = createHarness();
    mockSelection(h, { id: '20', surface: 'FRONT_COVER', asset_id: '101', source_design_id: null, provider: 'openai' }, {
      id: '30', source_design_id: '20', provider: 'openai',
    });

    await h.service.selectCustomCoverProposal(41, 20);

    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET back_cover_asset_id = NULL'))).toBe(false);
  });

  it('selects a manual back cover without a front and never writes source_design_id', async () => {
    const h = createHarness();
    mockSelection(h, { id: '30', surface: 'BACK_COVER', asset_id: '102', source_design_id: null, provider: 'manual' });

    await expect(h.service.selectCustomCoverProposal(41, 30)).resolves.toMatchObject({ surface: 'BACK_COVER', isSelected: true });
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes("surface = 'FRONT_COVER'"))).toBe(false);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET source_design_id ='))).toBe(false);
  });

  it('still requires a selected front for an AI-derived back cover', async () => {
    const h = createHarness();
    mockSelection(h, { id: '30', surface: 'BACK_COVER', asset_id: '102', source_design_id: '20', provider: 'openai' });

    await expect(h.service.selectCustomCoverProposal(41, 30)).rejects.toThrow(
      'Selecciona primero la tapa frontal para poder elegir la contratapa',
    );
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET is_selected = true'))).toBe(false);
  });

  it('allows approval when the selected back cover is independent', async () => {
    const h = createHarness();
    const expiresAt = new Date('2026-10-05T12:00:00.000Z');
    h.dataSource.query.mockResolvedValueOnce([{
      id: '41', customer_full_name: 'Ana Cliente', customer_email: 'ana@example.com', status: 'DESIGN_IN_PROGRESS',
      cover_approved_at: null, front_cover_asset_id: '101', back_cover_asset_id: '102', selected_front_id: '20', selected_back_id: '30',
    }]).mockResolvedValue([]);
    h.publicLinksService.generate.mockResolvedValue({ token: 'independent-cover-token', expiresAt });

    await expect(h.service.sendCustomCoverApproval(41)).resolves.toMatchObject({ status: 'AWAITING_CUSTOMER' });
    expect(h.dataSource.query.mock.calls[0][0]).toContain("back_design.provider = 'manual' OR back_design.source_design_id = front_design.id");
    expect(h.publicLinksService.generate).toHaveBeenCalled();
  });

  function mockDeselect(
    h: ReturnType<typeof createHarness>,
    design: { id: string; surface: 'FRONT_COVER' | 'BACK_COVER'; is_selected: boolean } | null,
    request: { status: string; cover_approved_at: Date | null } | null = { status: 'DESIGN_IN_PROGRESS', cover_approved_at: null },
    derivedBack: { id: string } | null = null,
  ) {
    h.manager.query.mockImplementation(async (sql: string) => {
      if (sql.includes('SELECT id, surface, is_selected')) return design ? [design] : [];
      if (sql.includes('SELECT status, cover_approved_at')) return request ? [request] : [];
      if (sql.includes("provider <> 'manual'") && sql.includes('source_design_id = $2')) return derivedBack ? [derivedBack] : [];
      return [];
    });
  }

  it('deselects only the front when the selected back cover is independent', async () => {
    const h = createHarness();
    mockDeselect(h, { id: '20', surface: 'FRONT_COVER', is_selected: true });

    await expect(h.service.deselectCustomCoverProposal(41, 20)).resolves.toEqual({
      id: 20, surface: 'FRONT_COVER', isSelected: false, removedDerivedBackCover: false,
    });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SET front_cover_asset_id = NULL'), [41]);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET back_cover_asset_id = NULL'))).toBe(false);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).startsWith('UPDATE ') && String(sql).includes("surface = 'BACK_COVER'"))).toBe(false);
  });

  it('also deselects an AI-derived back cover linked to the removed front', async () => {
    const h = createHarness();
    mockDeselect(h, { id: '20', surface: 'FRONT_COVER', is_selected: true }, undefined, { id: '30' });

    await expect(h.service.deselectCustomCoverProposal(41, 20)).resolves.toMatchObject({ removedDerivedBackCover: true });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SET back_cover_asset_id = NULL'), [41]);
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SET is_selected = false'), ['30', 41]);
  });

  it('deselects only the back cover when requested', async () => {
    const h = createHarness();
    mockDeselect(h, { id: '30', surface: 'BACK_COVER', is_selected: true });

    await expect(h.service.deselectCustomCoverProposal(41, 30)).resolves.toEqual({
      id: 30, surface: 'BACK_COVER', isSelected: false, removedDerivedBackCover: false,
    });
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('SET back_cover_asset_id = NULL'), [41]);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).includes('SET front_cover_asset_id = NULL'))).toBe(false);
  });

  it('returns an awaiting approval request to design in progress when a cover is deselected', async () => {
    const h = createHarness();
    mockDeselect(h, { id: '30', surface: 'BACK_COVER', is_selected: true }, { status: 'AWAITING_CUSTOMER', cover_approved_at: null });

    await h.service.deselectCustomCoverProposal(41, 30);

    expect(h.manager.query).toHaveBeenCalledWith(
      expect.stringContaining("SET status = 'DESIGN_IN_PROGRESS'"),
      [41],
    );
    expect(h.manager.query).toHaveBeenCalledWith(expect.stringContaining('UPDATE public_links'), [41]);
  });

  it.each([
    ['EDITOR_READY', null],
    ['DESIGN_IN_PROGRESS', new Date('2026-10-01T00:00:00.000Z')],
  ])('blocks deselection after approval (status %s)', async (status, coverApprovedAt) => {
    const h = createHarness();
    mockDeselect(h, { id: '20', surface: 'FRONT_COVER', is_selected: true }, { status, cover_approved_at: coverApprovedAt });

    await expect(h.service.deselectCustomCoverProposal(41, 20)).rejects.toBeInstanceOf(BadRequestException);
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).startsWith('UPDATE '))).toBe(false);
  });

  it('rejects a design that is not selected', async () => {
    const h = createHarness();
    mockDeselect(h, { id: '20', surface: 'FRONT_COVER', is_selected: false });

    await expect(h.service.deselectCustomCoverProposal(41, 20)).rejects.toThrow('Esta propuesta no está seleccionada');
    expect(h.manager.query.mock.calls.some(([sql]) => String(sql).startsWith('UPDATE '))).toBe(false);
  });

  it('returns not found for a design owned by another request', async () => {
    const h = createHarness();
    mockDeselect(h, null);

    await expect(h.service.deselectCustomCoverProposal(41, 20))
      .rejects.toThrow(new NotFoundException('La propuesta no pertenece a esta solicitud'));
    expect(h.manager.query).toHaveBeenCalledTimes(1);
  });
});

describe('PhotobookService.downloadCustomReferenceAsset', () => {
  it('downloads the original customer reference and preserves its file type', async () => {
    const h = createHarness();
    h.dataSource.query.mockResolvedValueOnce([{
      storage_key: 'uploads/photobooks/customer-cover.jpg',
      original_filename: 'tapa-cliente.jpg',
      mime_type: 'image/jpeg',
    }]);
    h.fileStorage.download.mockResolvedValue(Buffer.from('customer-artwork'));

    await expect(h.service.downloadCustomReferenceAsset(41, 7)).resolves.toEqual({
      buffer: Buffer.from('customer-artwork'),
      filename: 'tapa-cliente.jpg',
      mimeType: 'image/jpeg',
    });
    expect(h.fileStorage.download).toHaveBeenCalledWith('uploads/photobooks/customer-cover.jpg');
  });
});
