import { NextRequest } from 'next/server';
import { proxyOrdersRequest } from './[...path]/route';

const rootContext = { params: Promise.resolve({ path: [] as string[] }) };

export const GET = (request: NextRequest) => proxyOrdersRequest(request, rootContext);
export const POST = (request: NextRequest) => proxyOrdersRequest(request, rootContext);
export const PUT = (request: NextRequest) => proxyOrdersRequest(request, rootContext);
export const PATCH = (request: NextRequest) => proxyOrdersRequest(request, rootContext);
export const DELETE = (request: NextRequest) => proxyOrdersRequest(request, rootContext);
