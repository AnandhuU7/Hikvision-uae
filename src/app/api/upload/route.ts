import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { adminAuthMiddleware, AuthenticatedRequest } from '../middleware/adminAuth';

export const POST = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Upload to Cloudinary and get secure URL
    const imageUrl = await uploadToCloudinary(file, 'general');

    return NextResponse.json(
      { filepath: imageUrl },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to upload file' },
      { status: 500 }
    );
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 