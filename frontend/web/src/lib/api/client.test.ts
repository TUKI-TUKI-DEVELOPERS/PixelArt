import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { apiFetch, type ApiError } from './client';

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    status: 200,
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) },
  });
}

function textResponse(body: string, init?: ResponseInit): Response {
  return new Response(body, {
    status: 200,
    ...init,
    headers: { 'content-type': 'text/plain', ...(init?.headers ?? {}) },
  });
}

describe('apiFetch', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    // Deterministic base URL regardless of the shell environment.
    vi.stubEnv('API_INTERNAL_URL', undefined);
    vi.stubEnv('NEXT_PUBLIC_API_URL', undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  describe('base URL resolution', () => {
    it('falls back to http://localhost:3001 when no env vars are set', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ ok: true }));
      await apiFetch('/api/catalog');
      expect(fetchMock).toHaveBeenCalledWith(
        'http://localhost:3001/api/catalog',
        expect.anything(),
      );
    });

    it('prefers API_INTERNAL_URL over NEXT_PUBLIC_API_URL', async () => {
      vi.stubEnv('API_INTERNAL_URL', 'http://api:3001');
      vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://public:3001');
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('/api/x');
      expect(fetchMock.mock.calls[0][0]).toBe('http://api:3001/api/x');
    });

    it('uses NEXT_PUBLIC_API_URL when API_INTERNAL_URL is absent', async () => {
      vi.stubEnv('NEXT_PUBLIC_API_URL', 'http://public:3001');
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('/api/x');
      expect(fetchMock.mock.calls[0][0]).toBe('http://public:3001/api/x');
    });

    it('inserts a slash when the path does not start with one', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('api/x');
      expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3001/api/x');
    });
  });

  describe('request shaping', () => {
    it('always sends Content-Type: application/json', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('/api/x');
      const init = fetchMock.mock.calls[0][1];
      const headers = init?.headers as Headers;
      expect(headers.get('content-type')).toBe('application/json');
    });

    it('serializes the body as JSON and omits it when undefined', async () => {
      // Fresh Response per call: a Response body can only be consumed once.
      fetchMock.mockImplementation(async () => jsonResponse({}));
      await apiFetch('/api/x', { method: 'POST', body: { name: 'Ana', hojas: 25 } });
      expect(fetchMock.mock.calls[0][1]?.body).toBe('{"name":"Ana","hojas":25}');

      await apiFetch('/api/y');
      expect(fetchMock.mock.calls[1][1]?.body).toBeUndefined();
    });

    it('sets the Authorization header when a token is provided', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('/api/x', { token: 'jwt-abc' });
      const headers = fetchMock.mock.calls[0][1]?.headers as Headers;
      expect(headers.get('authorization')).toBe('Bearer jwt-abc');
    });

    it('sends no Authorization header without a token', async () => {
      fetchMock.mockResolvedValue(jsonResponse({}));
      await apiFetch('/api/x');
      const headers = fetchMock.mock.calls[0][1]?.headers as Headers;
      expect(headers.get('authorization')).toBeNull();
    });
  });

  describe('success responses', () => {
    it('parses and returns a JSON body', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ data: [{ id: 1 }], meta: null }));
      const result = await apiFetch<{ data: { id: number }[]; meta: null }>('/api/x');
      expect(result).toEqual({ data: [{ id: 1 }], meta: null });
    });

    it('returns raw text when the response is not JSON', async () => {
      fetchMock.mockResolvedValue(textResponse('pong'));
      const result = await apiFetch<string>('/api/health');
      expect(result).toBe('pong');
    });
  });

  describe('error responses', () => {
    it('throws an ApiError with the NestJS message and the full body as details', async () => {
      const nestBody = { message: 'Producto no encontrado', error: 'Not Found', statusCode: 404 };
      fetchMock.mockResolvedValue(jsonResponse(nestBody, { status: 404 }));
      await expect(apiFetch('/api/x')).rejects.toMatchObject({
        status: 404,
        message: 'Producto no encontrado',
        details: nestBody,
      } satisfies Partial<ApiError>);
    });

    it('joins a class-validator message array with commas (current behavior)', async () => {
      fetchMock.mockResolvedValue(
        jsonResponse(
          { message: ['name should not be empty', 'hojas must be a number'], statusCode: 400 },
          { status: 400 },
        ),
      );
      await expect(apiFetch('/api/x')).rejects.toMatchObject({
        status: 400,
        message: 'name should not be empty,hojas must be a number',
      });
    });

    it('falls back to the "error" field when "message" is absent', async () => {
      fetchMock.mockResolvedValue(jsonResponse({ error: 'Forbidden', statusCode: 403 }, { status: 403 }));
      await expect(apiFetch('/api/x')).rejects.toMatchObject({ status: 403, message: 'Forbidden' });
    });

    it('falls back to statusText when the JSON body is unparseable', async () => {
      fetchMock.mockResolvedValue(
        new Response('not-json{', {
          status: 500,
          statusText: 'Internal Server Error',
          headers: { 'content-type': 'application/json' },
        }),
      );
      await expect(apiFetch('/api/x')).rejects.toMatchObject({
        status: 500,
        message: 'Internal Server Error',
        details: undefined,
      });
    });

    it('uses the text body as the message for non-JSON errors', async () => {
      fetchMock.mockResolvedValue(textResponse('Bad gateway from proxy', { status: 502 }));
      await expect(apiFetch('/api/x')).rejects.toMatchObject({
        status: 502,
        message: 'Bad gateway from proxy',
      });
    });

    it('uses "Request failed" when there is no body and no statusText', async () => {
      fetchMock.mockResolvedValue(textResponse('', { status: 500 }));
      await expect(apiFetch('/api/x')).rejects.toMatchObject({
        status: 500,
        message: 'Request failed',
      });
    });
  });

  describe('network failures', () => {
    it('propagates the fetch rejection untouched', async () => {
      const networkError = new TypeError('fetch failed');
      fetchMock.mockRejectedValue(networkError);
      await expect(apiFetch('/api/x')).rejects.toBe(networkError);
    });
  });
});
