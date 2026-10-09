import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHmac, randomBytes } from 'crypto';
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

  async uploadPrivate(key: string, buffer: Buffer): Promise<void> {
    const secret = this.privateKey();
    const nonce = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', secret, nonce);
    cipher.setAAD(Buffer.from(key, 'utf8'));
    const ciphertext = Buffer.concat([cipher.update(buffer), cipher.final()]);
    const envelope = Buffer.concat([Buffer.from('PAPR1'), nonce, cipher.getAuthTag(), ciphertext]);
    await this.s3.send(new PutObjectCommand({ Bucket: this.bucket, Key: key, Body: envelope, ContentType: 'application/octet-stream', CacheControl: 'private, no-store, no-cache, must-revalidate' }));
  }

  async downloadPrivate(key: string): Promise<Buffer> {
    const secret = this.privateKey();
    const response = await this.s3.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
    const stream = response.Body as Readable;
    const envelope = await new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
    if (envelope.length < 33 || envelope.subarray(0, 5).toString() !== 'PAPR1') throw new Error('Invalid private object envelope');
    const decipher = createDecipheriv('aes-256-gcm', secret, envelope.subarray(5, 17));
    decipher.setAAD(Buffer.from(key, 'utf8'));
    decipher.setAuthTag(envelope.subarray(17, 33));
    return Buffer.concat([decipher.update(envelope.subarray(33)), decipher.final()]);
  }

  private privateKey(): Buffer {
    const configuredKey = process.env.PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY;
    const unavailable = () => new ServiceUnavailableException(
      'Private image storage requires PIXELART_PRIVATE_ASSET_ENCRYPTION_KEY generated from a cryptographically secure random source (for example: openssl rand -base64 32)',
    );
    if (!configuredKey || /^(default|placeholder|changeme|change-me|replace-me|your[-_ ]|pixelart_)/i.test(configuredKey.trim())) {
      throw unavailable();
    }

    const decodedKey = Buffer.from(configuredKey, 'base64');
    if (decodedKey.length !== 32 || decodedKey.toString('base64') !== configuredKey) throw unavailable();
    if (decodedKey.every((byte) => byte === decodedKey[0])) throw unavailable();
    for (let patternLength = 1; patternLength <= 16; patternLength += 1) {
      let repeatsPattern = true;
      for (let index = patternLength; index < decodedKey.length; index += 1) {
        if (decodedKey[index] !== decodedKey[index % patternLength]) {
          repeatsPattern = false;
          break;
        }
      }
      if (repeatsPattern) throw unavailable();
    }

    const byteCounts = new Map<number, number>();
    for (const byte of decodedKey) byteCounts.set(byte, (byteCounts.get(byte) ?? 0) + 1);
    if (byteCounts.size < 24) throw unavailable();
    const entropy = [...byteCounts.values()].reduce((total, count) => {
      const probability = count / decodedKey.length;
      return total - probability * Math.log2(probability);
    }, 0);
    if (entropy < 4.5) throw unavailable();

    const accessKeyId = process.env.MINIO_ACCESS_KEY || 'pixelart_access';
    const secretAccessKey = process.env.MINIO_SECRET_KEY || 'pixelart_secret_key';
    if ([accessKeyId, secretAccessKey].some((credential) => decodedKey.equals(Buffer.from(credential, 'utf8')))) {
      throw unavailable();
    }

    return createHmac('sha256', decodedKey).update('pixelart/private-image-reroll/v1').digest();
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