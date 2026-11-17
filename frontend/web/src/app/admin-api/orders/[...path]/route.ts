import { NextRequest } from 'next/server';
import { proxyAdminApiRequest } from '@/lib/server/admin-proxy';

type RouteContext = { params: Promise<{ path: string[] }> };

async function proxyOrdersRequest(request: NextRequest, { params }: RouteContext): Promise<Response> {
  const { path } = await params;
  return proxyAdminApiRequest(request, { prefix: '/api/admin/orders', segments: path });
}

export const GET = proxyOrdersRequest;
export const POST = proxyOrdersRequest;
export const PUT = proxyOrdersRequest;
export const PATCH = proxyOrdersRequest;
export const DELETE = proxyOrdersRequest;
