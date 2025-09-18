import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import NavbarCategory from '@/app/models/NavbarCategory';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../../middleware/publicAuth';

export async function GET(
    request: Request,
    { params }: { params: { slug: string } }
) {
    try {
        await connectDB();
        
        // Decode the URL-encoded slug
        const decodedSlug = decodeURIComponent(params.slug);
        
        // Clean the slug - remove spaces and special characters
        const cleanSlug = decodedSlug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
        
        const category = await NavbarCategory.findOne({ slug: cleanSlug });
        
        if (!category) {
            return new Response('Not Found', { status: 404 });
        }
        
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error in navbar category route:', error);
        return new Response('Internal Server Error', { status: 500 });
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