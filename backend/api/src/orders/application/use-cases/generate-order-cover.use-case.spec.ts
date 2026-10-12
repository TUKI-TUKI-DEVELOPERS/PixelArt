import { GenerateOrderCoverUseCase } from './generate-order-cover.use-case';
import { buildCoverPrompt, buildBackCoverPrompt } from '../../../personalized/domain/services/build-cover-prompt';

jest.mock('../../../personalized/domain/services/build-cover-prompt', () => ({
  buildCoverPrompt: jest.fn(() => 'cover prompt'), buildBackCoverPrompt: jest.fn(() => 'back prompt'), COVER_SIZE: 'size',
}));
jest.mock('../../../demo/domain/services/resolve-reference-photos', () => ({ resolveReferencePhotos: () => [{ assetId: 1 }] }));
jest.mock('../../infrastructure/pdf/composite-logo', () => ({ compositeLogo: jest.fn(async (image) => Buffer.concat([image, Buffer.from('-logo')])) }));
jest.mock('./save-single-print-asset', () => ({ savePrintAssetSingle: jest.fn(async (_ds, _storage, _id, _type, image) => ({ storageKey: 'final', url: 'url', image })) }));

const model: any = { id: '3', name: 'Book', coverSceneVisual: 'scene', backCoverTagline: 'tagline', backCoverScene: 'back scene' };
const category: any = { backCoverHashtag: '#book' };

describe('GenerateOrderCoverUseCase image reroll', () => {
  let useCase: GenerateOrderCoverUseCase;
  let storage: any;
  let generator: any;
  let db: any;
  let queryRows: any[];
  beforeEach(() => {
    queryRows = [];
    storage = { download: jest.fn(async (key) => Buffer.from(key)), uploadPrivate: jest.fn(async () => undefined), downloadPrivate: jest.fn(async () => { throw new Error('missing'); }) };
    generator = { generate: jest.fn(async () => Buffer.from('new-base')), generateWithReferences: jest.fn(async (_prompt, refs) => Buffer.concat(refs)) };
    db = { query: jest.fn(async (sql: string) => sql.includes('SELECT storage_key') ? queryRows : [{ id: 1 }]) };
    const orders: any = { findById: async () => ({ demoRequestId: 2, personalizedModelId: 3 }) };
    const personalized: any = { findModelById: async () => model, findCategoryById: async () => category, findTemplatesByModel: async () => [{ characterRoles: [{ key: 'hero', label: 'Hero' }] }], findSharedBlocks: async () => [] };
    const assets: any = { findById: async () => ({ storageKey: 'character' }) };
    useCase = new GenerateOrderCoverUseCase(orders, personalized, assets, storage, generator, db);
    (useCase as any).resolveOrderContext = async () => ({ orderId: 9, demoRow: { character_meta: { hero: [1] } }, model, category });
    (useCase as any).downloadReferences = async () => [Buffer.from('character')];
  });

  it('removes only the terminal Adulto marker from the printed cover title', async () => {
    model.name = 'Siempre Serás Parte de Mí Adulto';
    await useCase.generateCover({ orderId: 9, selectedAssetIds: { hero: 1 } });
    expect((buildCoverPrompt as jest.Mock).mock.calls.at(-1)[0].title).toBe('SIEMPRE SERÁS PARTE DE MÍ');
    expect(model.name).toBe('Siempre Serás Parte de Mí Adulto');
  });

  it('uses clean cover base before selected character references and adds explicit reference roles', async () => {
    const clean = Buffer.from('clean');
    storage.downloadPrivate.mockResolvedValueOnce(clean).mockResolvedValueOnce(Buffer.from(JSON.stringify({ version: 1, orderId: 9, assetType: 'COVER', storageKey: 'final-key', sourceSha256: require('crypto').createHash('sha256').update(clean).digest('hex'), finalSha256: require('crypto').createHash('sha256').update(clean).digest('hex') })));
    db.query.mockImplementation(async (sql: string) => sql.includes('SELECT storage_key') ? [{ storage_key: 'final-key' }] : [{ id: 1 }]);
    storage.download.mockResolvedValueOnce(clean);
    await useCase.generateCover({ orderId: 9, selectedAssetIds: { hero: 1 } });
    expect(generator.generateWithReferences.mock.calls[0][1]).toEqual([clean, Buffer.from('character')]);
    expect((buildCoverPrompt as jest.Mock).mock.calls.at(-1)[0].refinementPrompt).toContain('reference image 1');
    expect(storage.uploadPrivate.mock.calls[0][1]).toEqual(Buffer.concat([clean, Buffer.from('character')]));
  });

  it('uses only the prior base for back-cover edits and adds reference role instructions', async () => {
    const clean = Buffer.from('clean back');
    storage.downloadPrivate.mockResolvedValueOnce(clean).mockResolvedValueOnce(Buffer.from(JSON.stringify({ version: 1, orderId: 9, assetType: 'BACK_COVER', storageKey: 'back-key', sourceSha256: require('crypto').createHash('sha256').update(clean).digest('hex'), finalSha256: require('crypto').createHash('sha256').update(clean).digest('hex') })));
    db.query.mockImplementation(async (sql: string) => sql.includes('SELECT storage_key') ? [{ storage_key: 'back-key' }] : [{ id: 1 }]);
    storage.download.mockResolvedValueOnce(clean);
    await useCase.generateBackCover({ orderId: 9 });
    expect(generator.generateWithReferences).toHaveBeenCalledWith(expect.any(String), [clean], 'size');
    expect((buildBackCoverPrompt as jest.Mock).mock.calls.at(-1)[0].refinementPrompt).toContain('reference image 1');
  });

  it('falls back to fresh generation when no previous print asset exists', async () => {
    await useCase.generateBackCover({ orderId: 9 });
    expect(generator.generate).toHaveBeenCalled();
    expect(generator.generateWithReferences).not.toHaveBeenCalled();
  });

  it('falls back when the encrypted manifest hash does not match the final asset', async () => {
    db.query.mockImplementation(async (sql: string) => sql.includes('SELECT storage_key') ? [{ storage_key: 'old-key' }] : [{ id: 1 }]);
    storage.download.mockResolvedValueOnce(Buffer.from('stale final'));
    storage.downloadPrivate.mockResolvedValueOnce(Buffer.from('clean source')).mockResolvedValueOnce(Buffer.from(JSON.stringify({
      version: 1, orderId: 9, assetType: 'BACK_COVER', storageKey: 'old-key', sourceSha256: 'wrong', finalSha256: 'wrong',
    })));
    await useCase.generateBackCover({ orderId: 9 });
    expect(generator.generate).toHaveBeenCalled();
    expect(generator.generateWithReferences).not.toHaveBeenCalled();
  });

  it.each([
    ['orderId', { orderId: 10, assetType: 'BACK_COVER' }],
    ['assetType', { orderId: 9, assetType: 'COVER' }],
  ])('rejects a valid-hash prior source with mismatched %s and generates fresh', async (_identity, identity) => {
    const clean = Buffer.from('clean source');
    const finalImage = Buffer.from('final image');
    const hash = (image: Buffer) => require('crypto').createHash('sha256').update(image).digest('hex');
    db.query.mockImplementation(async (sql: string) => sql.includes('SELECT storage_key') ? [{ storage_key: 'old-key' }] : [{ id: 1 }]);
    storage.download.mockResolvedValueOnce(finalImage);
    storage.downloadPrivate.mockResolvedValueOnce(clean).mockResolvedValueOnce(Buffer.from(JSON.stringify({
      version: 1, ...identity, storageKey: 'old-key', sourceSha256: hash(clean), finalSha256: hash(finalImage),
    })));

    await useCase.generateBackCover({ orderId: 9 });

    expect(generator.generate).toHaveBeenCalled();
    expect(generator.generateWithReferences).not.toHaveBeenCalled();
  });

  it.each(['missing', 'unavailable'])('falls back to fresh generation when a private sidecar is %s', async (condition) => {
    db.query.mockImplementation(async (sql: string) => sql.includes('SELECT storage_key') ? [{ storage_key: 'old-key' }] : [{ id: 1 }]);
    storage.download.mockResolvedValueOnce(Buffer.from('final image'));
    if (condition === 'unavailable') storage.downloadPrivate.mockRejectedValueOnce(new Error('private storage unavailable'));

    await useCase.generateBackCover({ orderId: 9 });

    expect(generator.generate).toHaveBeenCalled();
    expect(generator.generateWithReferences).not.toHaveBeenCalled();
  });

  it('keeps successful image generation when private sidecar writes fail', async () => {
    storage.uploadPrivate.mockRejectedValue(new Error('private storage unavailable'));

    await expect(useCase.generateBackCover({ orderId: 9 })).resolves.toEqual({ storageKey: 'final', url: 'url', image: expect.any(Buffer) });
    expect(generator.generate).toHaveBeenCalled();
  });
});
