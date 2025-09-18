import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../middleware/publicAuth';

export async function GET(
  request: Request,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    const filepath = path.join('/tmp/uploads', filename);

    const file = await readFile(filepath);
    
    // Determine content type based on file extension
    const ext = path.extname(filename).toLowerCase();
    const contentType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
    }[ext] || 'application/octet-stream';

    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('File not found', { status: 404 });
  }
}

// Method not allowed for other HTTP methods
export const POST = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
});

export const PUT = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
});

export const DELETE = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
});

export const PATCH = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
}); 