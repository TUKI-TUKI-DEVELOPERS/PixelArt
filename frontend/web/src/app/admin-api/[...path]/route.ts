import { NextRequest } from 'next/server';
import { proxyAdminApiRequest } from '@/lib/server/admin-proxy';

type RouteContext = { params: Promise<{ path: string[] }> };

/**
 * /admin-api/<path> -> Nest /api/admin/<path> with the admin cookie as Bearer
 * auth. More specific /admin-api routes (orders, photobook, assets) win over
 * this catch-all in the App Router.
 */
async function proxyAdminRequest(request: NextRequest, { params }: RouteContext): Promise<Response> {
  const { path } = await params;
  return proxyAdminApiRequest(request, { prefix: '/api/admin', segments: path });
}

export const GET = proxyAdminRequest;
export const POST = proxyAdminRequest;
export const PUT = proxyAdminRequest;
export const PATCH = proxyAdminRequest;
export const DELETE = proxyAdminRequest;
