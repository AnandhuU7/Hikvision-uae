import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Category from '@/app/models/Category';
import mongoose from 'mongoose';
import { config } from '../config';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { publicAuthMiddleware, AuthenticatedRequest } from '../middleware/publicAuth';

export { config };

export async function GET(request: Request) {
    try {
        await connectDB();
        
        // Get the URL object
        const { searchParams } = new URL(request.url);
        
        // Get the navbarCategory parameter
        const navbarCategory = searchParams.get('navbarCategory');
        
        // Build query based on whether navbarCategory is provided
        const query = navbarCategory ? { navbarCategory } : {};
        
        // Fetch categories with the filter
        const categories = await Category.find(query).sort({ createdAt: -1 });
        
        return NextResponse.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

export const POST = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
    try {
        console.log('Starting category POST request');
        await connectDB();
        console.log('Database connected');
        
        const formData = await request.formData();
        console.log('Form data received:', formData);
        
        const name = formData.get('name') as string;
        const navbarCategory = formData.get('navbarCategory') as string;
        const description = formData.get('description') as string;
        const image = formData.get('image') as File;

        // Validate that navbarCategory exists
        const navbarCategoryExists = await mongoose.model('NavbarCategory').findById(navbarCategory);
        if (!navbarCategoryExists) {
            return NextResponse.json({ error: 'Invalid navbar category' }, { status: 400 });
        }

        // Create slug from name
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        // Handle image upload if present
        let imageUrl = '';
        if (image) {
            imageUrl = await uploadToCloudinary(image, `categories/${slug}`);
        }

        // Create new category
        const category = await Category.create({
            name,
            navbarCategory,
            description,
            slug,
            image: imageUrl,
            isActive: true
        });

        return NextResponse.json(category, { status: 201 });
    } catch (error: any) {
        console.error('Detailed error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create category' },
            { status: 500 }
        );
    }
});

// Method not allowed for other HTTP methods
export const PUT = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
});

export const DELETE = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
});

export const PATCH = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
}); 