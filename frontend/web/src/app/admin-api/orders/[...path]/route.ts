import { NextRequest, NextResponse } from 'next/server';

type RouteContext = { params: Promise<{ path: string[] }> };

export async function proxyOrdersRequest(request: NextRequest, { params }: RouteContext): Promise<Response> {
  const token = request.cookies.get('pa_admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'No autenticado' }, { status: 401 });

  const { path } = await params;
  if (!Array.isArray(path) || path.some((part) => !part || part === '.' || part === '..')) {
    return NextResponse.json({ message: 'Ruta inválida' }, { status: 400 });
  }

  const apiBase = process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://api:3001';
  const upstreamUrl = new URL(
    `/api/admin/orders${path.length ? `/${path.map((part) => encodeURIComponent(part)).join('/')}` : ''}${new URL(request.url).search}`,
    apiBase,
  );
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);

  const hasBody = request.method !== 'GET' && request.method !== 'HEAD';
  const init: RequestInit & { duplex?: 'half' } = {
    method: request.method,
    headers,
    cache: 'no-store',
  };
  if (hasBody && request.body) {
    init.body = request.body;
    init.duplex = 'half';
  }

  const upstream = await fetch(upstreamUrl, init);
  const responseHeaders = new Headers();
  const upstreamContentType = upstream.headers.get('content-type');
  if (upstreamContentType) responseHeaders.set('content-type', upstreamContentType);
  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export const GET = proxyOrdersRequest;
export const POST = proxyOrdersRequest;
export const PUT = proxyOrdersRequest;
export const PATCH = proxyOrdersRequest;
export const DELETE = proxyOrdersRequest;
