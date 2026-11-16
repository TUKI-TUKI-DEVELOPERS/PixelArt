import { NotFoundException } from '@nestjs/common';
import { PATH_METADATA } from '@nestjs/common/constants';
import { PassThrough, Readable } from 'stream';
import type { Response } from 'express';
import { AdminStorageController } from './admin-storage.controller';
import { GetAdminStorageObjectUseCase } from './application/use-cases/get-admin-storage-object.use-case';

function fakeResponse() {
  const stream = new PassThrough();
  const chunks: Buffer[] = [];
  stream.on('data', (chunk: Buffer) => chunks.push(chunk));
  const finished = new Promise<void>((resolve) => stream.on('end', () => resolve()));
  const response = Object.assign(stream, { setHeader: jest.fn() }) as unknown as Response & { setHeader: jest.Mock };
  return { response, chunks, finished };
}

describe('AdminStorageController', () => {
  it('is mounted at /api/admin/storage/<key> with a wildcard key', () => {
    expect(Reflect.getMetadata(PATH_METADATA, AdminStorageController)).toBe('admin/storage');
    expect(Reflect.getMetadata(PATH_METADATA, AdminStorageController.prototype.stream)).toBe('*');
  });

  it('streams the object with the headers chosen by the use case', async () => {
    const execute = jest.fn().mockResolvedValue({
      body: Readable.from([Buffer.from('voucher-bytes')]),
      headers: { 'Content-Type': 'image/jpeg', 'Content-Security-Policy': 'sandbox' },
    });
    const controller = new AdminStorageController({ execute } as unknown as GetAdminStorageObjectUseCase);
    const { response, chunks, finished } = fakeResponse();

    await controller.stream('uploads/vouchers/31.jpg', response);
    await finished;

    expect(execute).toHaveBeenCalledWith('uploads/vouchers/31.jpg');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'image/jpeg');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Security-Policy', 'sandbox');
    expect(Buffer.concat(chunks).toString()).toBe('voucher-bytes');
  });

  it('lets use-case errors reach the exception filter before anything is written', async () => {
    const execute = jest.fn().mockRejectedValue(new NotFoundException('Archivo no encontrado'));
    const controller = new AdminStorageController({ execute } as unknown as GetAdminStorageObjectUseCase);
    const { response } = fakeResponse();

    await expect(controller.stream('uploads/vouchers/404.jpg', response)).rejects.toBeInstanceOf(NotFoundException);
    expect(response.setHeader).not.toHaveBeenCalled();
  });
});
