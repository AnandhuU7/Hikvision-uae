import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import SubCategory from '@/app/models/SubCategory';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { publicAuthMiddleware, AuthenticatedRequest } from '../middleware/publicAuth';

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || searchParams.get('categoryId');
        
        console.log('Fetching subcategories for category:', category);
        
        let query = {};
        if (category) {
            query = { category: category };
        }
        
        const subcategories = await SubCategory.find(query)
            .sort({ createdAt: -1 });
        
        console.log('Found subcategories:', subcategories.length);
            
        return NextResponse.json(subcategories);
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return NextResponse.json(
            { error: 'Failed to fetch subcategories' }, 
            { status: 500 }
        );
    }
}

export const POST = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
    try {
        await connectDB();
        const formData = await request.formData();
        
        // Handle image upload using Cloudinary
        const image = formData.get('image') as File;
        let imageUrl = '';
        
        if (image && image instanceof File) {
            try {
                // Convert file to base64
                const bytes = await image.arrayBuffer();
                const buffer = Buffer.from(bytes);
                const base64File = buffer.toString('base64');
                const dataURI = `data:${image.type};base64,${base64File}`;

                // Upload to Cloudinary
                const slug = formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
                const uploadResult = await uploadToCloudinary(image, `categories/${formData.get('category')}/subcategories/${slug}`);
                imageUrl = uploadResult;
            } catch (error) {
                console.error('Error uploading image:', error);
                throw new Error('Failed to upload image');
            }
        }

        // Create data object with Cloudinary URL
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            description: formData.get('description') as string,
            isActive: formData.get('isActive') === 'true',
            image: imageUrl
        };

        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const subcategory = await SubCategory.create({
            ...data,
            slug
        });

        return NextResponse.json(subcategory, { status: 201 });
    } catch (error: any) {
        console.error('SubCategory creation error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create subcategory' },
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