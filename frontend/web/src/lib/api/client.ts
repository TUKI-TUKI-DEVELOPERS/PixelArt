// TODO: Cliente base API - manejo errores + auth header
// frontend/web/src/lib/api/client.ts
export type ApiError = {
  status: number;
  message: string;
  details?: unknown;
};

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string | null;
};

function getBaseUrl() {
  // API_INTERNAL_URL: usado server-side en Docker (http://api:3001)
  // NEXT_PUBLIC_API_URL: usado en el browser (http://localhost:3001)
  return process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  const contentType = res.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (!res.ok) {
    let details: unknown = undefined;
    let message = res.statusText || 'Request failed';

    if (isJson) {
      const data = await res.json().catch(() => null);
      if (data && typeof data === 'object') {
        // Nest suele devolver { message, error, statusCode }
        message =
          (data as any).message?.toString?.() ??
          (data as any).error?.toString?.() ??
          message;
        details = data;
      }
    } else {
      const text = await res.text().catch(() => '');
      if (text) message = text;
    }

    const err: ApiError = { status: res.status, message, details };
    throw err;
  }

  if (!isJson) {
    // si alguna vez devuelves texto
    return (await res.text()) as unknown as T;
  }

  return (await res.json()) as T;
}