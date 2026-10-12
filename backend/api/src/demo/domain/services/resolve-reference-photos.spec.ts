import { resolveReferencePhotos } from './resolve-reference-photos';

describe('resolveReferencePhotos', () => {
  it('resolves a single role to its first uploaded asset by default', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }],
      { recipient: { name: 'Diego', assetIds: [11, 12] } },
    );
    expect(result).toEqual([{ assetId: 11, name: 'Diego' }]);
  });

  it('preserves the character_roles order, not the meta object order', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }, { key: 'dedicator' }],
      {
        dedicator: { name: 'Ana', assetIds: [22] },
        recipient: { name: 'Diego', assetIds: [11] },
      },
    );
    expect(result.map((r) => r.name)).toEqual(['Diego', 'Ana']);
  });

  it('expands array values into one character per entry, in array order', () => {
    const result = resolveReferencePhotos(
      [{ key: 'hijos', min: 1, max: 3 }],
      {
        hijos: [
          { name: 'Mateo', assetIds: [31] },
          { name: 'Sofía', assetIds: [32] },
        ],
      },
    );
    expect(result).toEqual([
      { assetId: 31, name: 'Mateo' },
      { assetId: 32, name: 'Sofía' },
    ]);
  });

  it('honors an admin-selected asset when it belongs to the character', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }],
      { recipient: { name: 'Diego', assetIds: [11, 12] } },
      { recipient: 12 },
    );
    expect(result).toEqual([{ assetId: 12, name: 'Diego' }]);
  });

  it('falls back to the first asset when the selected id is not in assetIds', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }],
      { recipient: { name: 'Diego', assetIds: [11, 12] } },
      { recipient: 999 },
    );
    expect(result).toEqual([{ assetId: 11, name: 'Diego' }]);
  });

  it('uses indexed keys ("role[i]") for admin selections inside arrays', () => {
    const result = resolveReferencePhotos(
      [{ key: 'hijos' }],
      {
        hijos: [
          { name: 'Mateo', assetIds: [31, 33] },
          { name: 'Sofía', assetIds: [32, 34] },
        ],
      },
      { 'hijos[1]': 34 },
    );
    expect(result).toEqual([
      { assetId: 31, name: 'Mateo' },
      { assetId: 34, name: 'Sofía' },
    ]);
  });

  it('skips roles missing from characterMeta', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }, { key: 'pet' }],
      { recipient: { name: 'Diego', assetIds: [11] } },
    );
    expect(result).toEqual([{ assetId: 11, name: 'Diego' }]);
  });

  it('skips non-object and asset-less entries', () => {
    const result = resolveReferencePhotos(
      [{ key: 'recipient' }, { key: 'dedicator' }, { key: 'pet' }],
      {
        recipient: 'not-an-object',
        dedicator: { name: 'Ana' },
        pet: { name: 'Toby', assetIds: [] },
      },
    );
    expect(result).toEqual([]);
  });

  it('defaults the name to an empty string', () => {
    const result = resolveReferencePhotos([{ key: 'recipient' }], { recipient: { assetIds: [11] } });
    expect(result).toEqual([{ assetId: 11, name: '' }]);
  });

  it('returns an empty list for no roles', () => {
    expect(resolveReferencePhotos([], { recipient: { assetIds: [1] } })).toEqual([]);
  });
});
