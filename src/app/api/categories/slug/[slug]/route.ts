import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Category from '@/app/models/Category';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../../middleware/publicAuth';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        const category = await Category.findOne({ slug: params.slug });
        
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        
        return NextResponse.json(category);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
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