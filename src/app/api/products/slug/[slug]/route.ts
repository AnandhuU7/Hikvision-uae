import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Product from '@/app/models/Product';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../../middleware/publicAuth';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const product = await Product.findOne({ slug: params.slug });
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
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