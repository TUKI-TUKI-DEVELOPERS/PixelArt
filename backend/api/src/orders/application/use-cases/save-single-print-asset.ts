import { DataSource } from 'typeorm';
import { FileStoragePort } from '../../../assets/domain/ports/file-storage.port';

export type SinglePrintAssetType = 'COVER' | 'BACK_COVER' | 'ADDON';

export type SavePrintAssetOutput = { storageKey: string; url: string };

/** Sube y registra un asset "único por orden" (template_id NULL — Portada,
 * Contraportada, Add-on) como PENDING_REVIEW. Extraído de
 * GenerateOrderCoverUseCase para reusarlo también en GenerateOrderAddonUseCase
 * — misma constraint ON CONFLICT (order_id, asset_type) WHERE template_id IS
 * NULL, mismo storage-key pattern e INSERT que ya usa el upload manual
 * (orders.controller.ts → uploadPrintAsset). */
export async function savePrintAssetSingle(
  dataSource: DataSource,
  fileStorage: FileStoragePort,
  orderId: number,
  assetType: SinglePrintAssetType,
  buffer: Buffer,
): Promise<SavePrintAssetOutput> {
  const storageKey = `custom-books/print-assets/${orderId}/${assetType.toLowerCase()}.png`;
  await fileStorage.upload(storageKey, buffer, 'image/png', 'public, max-age=60, must-revalidate');

  await dataSource.query(
    `INSERT INTO order_print_assets (order_id, asset_type, template_id, slot_index, page_part, storage_key, original_filename, mime_type, size_bytes, status)
     VALUES ($1, $2, NULL, NULL, 'ONLY', $3, NULL, 'image/png', $4, 'PENDING_REVIEW')
     ON CONFLICT (order_id, asset_type) WHERE template_id IS NULL
     DO UPDATE SET storage_key = $3, mime_type = 'image/png', size_bytes = $4, status = 'PENDING_REVIEW', uploaded_at = now()`,
    [orderId, assetType, storageKey, buffer.length],
  );

  return { storageKey, url: fileStorage.getPublicUrl(storageKey) };
}
