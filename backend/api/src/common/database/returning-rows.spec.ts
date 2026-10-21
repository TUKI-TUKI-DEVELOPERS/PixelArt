import { returningRows } from './returning-rows';

describe('returningRows', () => {
  it('unwraps the [rows, affectedCount] tuple TypeORM returns for DELETE/UPDATE', () => {
    expect(returningRows<{ asset_id: string }>([[{ asset_id: '5' }, { asset_id: '6' }], 2])).toEqual([
      { asset_id: '5' },
      { asset_id: '6' },
    ]);
  });

  it('returns an empty list when DELETE/UPDATE affected no rows', () => {
    expect(returningRows([[], 0])).toEqual([]);
  });

  it('passes plain row arrays through unchanged', () => {
    const rows = [{ id: '14' }];
    expect(returningRows(rows)).toBe(rows);
  });

  it('keeps a plain two-row result that is not a tuple', () => {
    expect(returningRows([{ id: '1' }, { id: '2' }])).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('returns an empty list for a missing result', () => {
    expect(returningRows(undefined)).toEqual([]);
    expect(returningRows(null)).toEqual([]);
  });
});
