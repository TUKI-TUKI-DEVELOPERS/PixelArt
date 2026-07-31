import { CharacterRole } from '../../../personalized/domain/character-role';

export type ResolvedCharacter = {
  assetId: number;
  name: string;
};

/**
 * Resuelve character_roles de la plantilla contra el characterMeta real del
 * DemoRequest, en el MISMO orden que character_roles — ese orden es el que
 * determina qué imagen es "PRIMERA"/"SEGUNDA" de referencia en el prompt.
 *
 * Cada persona puede tener 1-2 fotos subidas (según PHOTO_CONFIG del wizard)
 * — por defecto se usa la primera, pero el admin puede elegir cuál mandar a
 * generar (la calidad de la foto de referencia importa mucho, validado en el
 * piloto) vía `selectedAssetIds` (role.key -> assetId elegido).
 */
export function resolveReferencePhotos(
  characterRoles: CharacterRole[],
  characterMeta: Record<string, unknown>,
  selectedAssetIds?: Record<string, number>,
): ResolvedCharacter[] {
  const result: ResolvedCharacter[] = [];

  for (const role of characterRoles) {
    const value = characterMeta[role.key];
    if (Array.isArray(value)) {
      value.forEach((entry, index) => {
        const resolved = extractCharacter(entry, selectedAssetIds?.[`${role.key}[${index}]`]);
        if (resolved) result.push(resolved);
      });
    } else {
      const resolved = extractCharacter(value, selectedAssetIds?.[role.key]);
      if (resolved) result.push(resolved);
    }
  }

  return result;
}

function extractCharacter(value: unknown, preferredAssetId?: number): ResolvedCharacter | null {
  if (!value || typeof value !== 'object') return null;
  const obj = value as { name?: string; assetIds?: number[] };
  const assetId =
    preferredAssetId && obj.assetIds?.includes(preferredAssetId)
      ? preferredAssetId
      : obj.assetIds?.[0];
  if (!assetId) return null;
  return { assetId, name: obj.name ?? '' };
}
