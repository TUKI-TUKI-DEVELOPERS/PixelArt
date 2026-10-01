import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, act, cleanup } from '@testing-library/react';

// Compression is exercised elsewhere; here it must be a pass-through so the
// uploaded File is the exact one handed to uploadFiles.
vi.mock('@/lib/compressImage', () => ({
  compressImage: vi.fn(async (file: File) => file),
}));

import { usePhotoUpload, type UploadedPhoto } from './usePhotoUpload';

type UploadApiResponse = {
  id: number;
  storageKey: string;
  contentHash: string;
  url: string;
  thumbnailUrl?: string | null;
  width?: number | null;
  height?: number | null;
};

function assetData(id: number): UploadApiResponse {
  return {
    id,
    storageKey: `uploads/customers/asset-${id}.jpg`,
    contentHash: `hash-${id}`,
    url: `http://cdn.local/asset-${id}.jpg`,
  };
}

// The hook only reads `ok` and `json()` from the response.
function okResponse(data: UploadApiResponse): Response {
  return { ok: true, json: async () => data } as unknown as Response;
}

function errorResponse(message: string): Response {
  return { ok: false, json: async () => ({ message }) } as unknown as Response;
}

function imageFile(name: string): File {
  return new File(['pixel-data'], name, { type: 'image/jpeg' });
}

describe('usePhotoUpload', () => {
  const fetchMock = vi.fn<typeof fetch>();
  let objectUrlCounter = 0;
  const createObjectURLMock = vi.fn(() => `blob:mock-${++objectUrlCounter}`);
  const revokeObjectURLMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    // jsdom does not implement object URLs; the hook needs both statics.
    URL.createObjectURL = createObjectURLMock;
    URL.revokeObjectURL = revokeObjectURLMock;
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it('ignores non-image files entirely (no fetch, no state change)', async () => {
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([new File(['text'], 'notes.txt', { type: 'text/plain' })]);
    });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(result.current.photos).toEqual([]);
    expect(result.current.uploading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('accepts a file with an empty MIME type but a known image extension', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(1)));
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([new File(['x'], 'IMG_0001.HEIC', { type: '' })]);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(result.current.photos).toHaveLength(1);
  });

  it('uploads via the public endpoint with the folder in the query string', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(1)));
    const { result } = renderHook(() => usePhotoUpload('uploads/otros'));
    const file = imageFile('a.jpg');
    await act(async () => {
      await result.current.uploadFiles([file]);
    });

    expect(fetchMock.mock.calls[0][0]).toBe('/api/assets/upload-public?folder=uploads%2Fotros');
    const init = fetchMock.mock.calls[0][1];
    expect(init?.method).toBe('POST');
    const body = init?.body as FormData;
    const sent = body.get('file');
    expect(sent).toBeInstanceOf(File);
    expect((sent as File).name).toBe('a.jpg');
  });

  it('maps a successful upload into an UploadedPhoto with a local preview URL', async () => {
    fetchMock
      .mockResolvedValueOnce(okResponse(assetData(1)))
      .mockResolvedValueOnce(okResponse(assetData(2)));
    const { result } = renderHook(() => usePhotoUpload());

    await act(async () => {
      await result.current.uploadFiles([imageFile('a.jpg'), imageFile('b.jpg')]);
    });

    expect(result.current.photos).toHaveLength(2);
    expect(result.current.uploading).toBe(false);
    expect(result.current.progress).toBe(100);
    expect(result.current.error).toBeNull();

    const photoA = result.current.photos.find((p) => p.originalFilename === 'a.jpg');
    expect(photoA).toMatchObject({
      id: 1,
      storageKey: 'uploads/customers/asset-1.jpg',
      contentHash: 'hash-1',
      url: 'http://cdn.local/asset-1.jpg',
      thumbnailUrl: null,
      width: null,
      height: null,
    });
    expect(photoA?.preview).toMatch(/^blob:mock-/);

    const uids = result.current.photos.map((p) => p.uid);
    expect(new Set(uids).size).toBe(2);
  });

  it('keeps successes and surfaces the first error when a batch partially fails', async () => {
    fetchMock
      .mockResolvedValueOnce(okResponse(assetData(1)))
      .mockResolvedValueOnce(errorResponse('Archivo demasiado grande'));
    const { result } = renderHook(() => usePhotoUpload());

    await act(async () => {
      await result.current.uploadFiles([imageFile('ok.jpg'), imageFile('big.jpg')]);
    });

    expect(result.current.photos).toHaveLength(1);
    expect(result.current.error).toBe('Archivo demasiado grande');
    expect(result.current.uploading).toBe(false);
  });

  it('falls back to "Upload failed" when the error body is not JSON', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => {
        throw new Error('not json');
      },
    } as unknown as Response);
    const { result } = renderHook(() => usePhotoUpload());

    await act(async () => {
      await result.current.uploadFiles([imageFile('a.jpg')]);
    });

    expect(result.current.photos).toHaveLength(0);
    expect(result.current.error).toBe('Upload failed');
  });

  it('clearError resets the error', async () => {
    fetchMock.mockResolvedValue(errorResponse('boom'));
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([imageFile('a.jpg')]);
    });
    expect(result.current.error).toBe('boom');

    act(() => {
      result.current.clearError();
    });
    expect(result.current.error).toBeNull();
  });

  it('flags a re-upload of already-present content (same asset id) as a pending duplicate', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(7)));
    const { result } = renderHook(() => usePhotoUpload());

    await act(async () => {
      await result.current.uploadFiles([imageFile('original.jpg')]);
    });
    await act(async () => {
      await result.current.uploadFiles([imageFile('copy.jpg')]);
    });

    expect(result.current.photos).toHaveLength(1);
    expect(result.current.pendingDuplicates).toHaveLength(1);
    expect(result.current.pendingDuplicates[0].existingFilename).toBe('original.jpg');
    expect(result.current.pendingDuplicates[0].photo.originalFilename).toBe('copy.jpg');
  });

  it('does NOT flag duplicates within the same batch (current behavior)', async () => {
    // Dedupe only compares against photos already in state, so two identical
    // files selected in one picker both get added silently.
    fetchMock.mockResolvedValue(okResponse(assetData(9)));
    const { result } = renderHook(() => usePhotoUpload());

    await act(async () => {
      await result.current.uploadFiles([imageFile('a.jpg'), imageFile('a-copy.jpg')]);
    });

    expect(result.current.photos).toHaveLength(2);
    expect(result.current.pendingDuplicates).toHaveLength(0);
  });

  it('resolveDuplicate("add") moves the duplicate into photos', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(7)));
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([imageFile('original.jpg')]);
    });
    await act(async () => {
      await result.current.uploadFiles([imageFile('copy.jpg')]);
    });

    const duplicateUid = result.current.pendingDuplicates[0].photo.uid;
    act(() => {
      result.current.resolveDuplicate(duplicateUid, 'add');
    });

    expect(result.current.pendingDuplicates).toHaveLength(0);
    expect(result.current.photos).toHaveLength(2);
    expect(result.current.photos[1].originalFilename).toBe('copy.jpg');
  });

  it('resolveDuplicate("skip") discards the duplicate and revokes its preview', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(7)));
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([imageFile('original.jpg')]);
    });
    await act(async () => {
      await result.current.uploadFiles([imageFile('copy.jpg')]);
    });

    const pending = result.current.pendingDuplicates[0];
    act(() => {
      result.current.resolveDuplicate(pending.photo.uid, 'skip');
    });

    expect(result.current.pendingDuplicates).toHaveLength(0);
    expect(result.current.photos).toHaveLength(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith(pending.photo.preview);
  });

  it('removePhoto drops the photo and revokes its object URL', async () => {
    fetchMock.mockResolvedValue(okResponse(assetData(1)));
    const { result } = renderHook(() => usePhotoUpload());
    await act(async () => {
      await result.current.uploadFiles([imageFile('a.jpg')]);
    });

    const photo = result.current.photos[0];
    act(() => {
      result.current.removePhoto(photo.uid);
    });

    expect(result.current.photos).toHaveLength(0);
    expect(revokeObjectURLMock).toHaveBeenCalledWith(photo.preview);
  });

  it('restorePhotos assigns fresh uids and uses the CDN url as preview', () => {
    const { result } = renderHook(() => usePhotoUpload());
    const restored: Omit<UploadedPhoto, 'uid'>[] = [
      {
        id: 3,
        storageKey: 'uploads/customers/asset-3.jpg',
        contentHash: 'hash-3',
        url: 'http://cdn.local/asset-3.jpg',
        thumbnailUrl: null,
        width: 1200,
        height: 800,
        originalFilename: 'restored.jpg',
        preview: '',
      },
    ];

    act(() => {
      result.current.restorePhotos(restored);
    });

    expect(result.current.photos).toHaveLength(1);
    expect(result.current.photos[0].uid).toBeGreaterThan(0);
    expect(result.current.photos[0].preview).toBe('http://cdn.local/asset-3.jpg');
  });

  it('never runs more than 3 uploads concurrently (MAX_CONCURRENT pool)', async () => {
    let active = 0;
    let maxActive = 0;
    let nextId = 100;
    fetchMock.mockImplementation(async () => {
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 0));
      active -= 1;
      return okResponse(assetData(nextId++));
    });

    const { result } = renderHook(() => usePhotoUpload());
    const files = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'].map(imageFile);
    await act(async () => {
      await result.current.uploadFiles(files);
    });

    expect(fetchMock).toHaveBeenCalledTimes(5);
    expect(maxActive).toBe(3);
    expect(result.current.photos).toHaveLength(5);
    expect(result.current.progress).toBe(100);
  });
});
