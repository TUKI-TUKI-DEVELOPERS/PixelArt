import { Injectable, Logger } from '@nestjs/common';
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileStoragePort } from '../../domain/ports/file-storage.port';

@Injectable()
export class MinioStorageService extends FileStoragePort {
  private readonly logger = new Logger(MinioStorageService.name);
  private readonly s3: S3Client;
  private readonly bucket: string;

  constructor() {
    super();
    const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
    const port = process.env.MINIO_PORT || '9000';
    const accessKeyId = process.env.MINIO_ACCESS_KEY || 'pixelart_access';
    const secretAccessKey = process.env.MINIO_SECRET_KEY || 'pixelart_secret_key';
    this.bucket = process.env.MINIO_BUCKET || 'pixelart-assets';
    const useSSL = (process.env.MINIO_USE_SSL || 'false') === 'true';

    this.s3 = new S3Client({
      region: process.env.MINIO_REGION || 'us-east-1',
      endpoint: `${useSSL ? 'https' : 'http'}://${endpoint}:${port}`,
      credentials: { accessKeyId, secretAccessKey },
      forcePathStyle: true, // CLAVE para MinIO
    });
  }

  /**
   * Sube un archivo a MinIO.
   */
  async upload(key: string, buffer: Buffer, mimeType: string, cacheControl?: string): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
      CacheControl: cacheControl ?? 'public, max-age=31536000, immutable',
    });
    await this.s3.send(command);
    this.logger.log(`Uploaded: ${key} (${buffer.length} bytes)`);
  }

  /**
   * Verifica si el objeto realmente existe en MinIO — no confiar ciegamente en
   * que una fila de `assets` con ese storageKey implica que el archivo está ahí
   * (puede haberse perdido por un reset manual del volumen de MinIO).
   */
  async exists(key: string): Promise<boolean> {
    try {
      await this.s3.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch (err) {
      const code = (err as { name?: string; $metadata?: { httpStatusCode?: number } })?.name;
      if (code === 'NotFound' || code === 'NoSuchKey') return false;
      throw err;
    }
  }

  async delete(key: string): Promise<void> {
    const command = new DeleteObjectCommand({ Bucket: this.bucket, Key: key });
    await this.s3.send(command);
    this.logger.log(`Deleted: ${key}`);
  }

  /**
   * URL firmada (temporal). Útil si tu bucket NO es público o si quieres control.
   */
  async getSignedGetUrl(storageKey: string, expiresInSeconds = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: storageKey,
    });

    return getSignedUrl(this.s3, command, { expiresIn: expiresInSeconds });
  }

  /**
   * URL pública directa (solo si el bucket/policy permite lectura pública).
   * En tu docker-compose ya pusiste: mc anonymous set download
   */
  async download(key: string): Promise<Buffer> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    const response = await this.s3.send(command);
    const stream = response.Body as Readable;
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }

  getPublicUrl(storageKey: string): string {
    // Relativa al origen de la app — pasa por el rewrite /assets/:path* de
    // next.config.ts, que proxea server-side hacia MinIO (interno, nunca
    // expuesto directo en prod). Antes devolvía una URL absoluta a
    // MINIO_PUBLIC_HOST:PORT (típicamente "localhost") — funcionaba solo
    // en la máquina de quien tuviera un MinIO local corriendo en ese puerto,
    // rota para cualquier otro usuario real, y bloqueada por el navegador
    // como "mixed content" en páginas HTTPS.
    // Normalizar a NFD (macOS almacena archivos en NFD) y encodear cada segmento
    // para manejar acentos, espacios y caracteres especiales
    const encodedKey = storageKey
      .normalize('NFD')
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');
    return `/assets/${encodedKey}`;
  }
}