/**
 * Normalizes the result of a raw `DELETE/UPDATE ... RETURNING` query to its rows.
 *
 * With the Postgres driver, TypeORM's raw `query()` (DataSource and
 * EntityManager) returns `[rows, affectedCount]` when the command is DELETE or
 * UPDATE, and plain `rows` for every other command (see
 * `PostgresQueryRunner.query` in typeorm). Mapping that tuple as if it were
 * the rows yields `undefined`/`NaN` values instead of the returned columns.
 */
export function returningRows<T>(result: unknown): T[] {
  if (!Array.isArray(result)) return [];
  if (result.length === 2 && Array.isArray(result[0]) && typeof result[1] === 'number') {
    return result[0] as T[];
  }
  return result as T[];
}
