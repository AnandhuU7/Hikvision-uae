import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Category from '@/app/models/Category';
import { notFound } from 'next/navigation';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../middleware/publicAuth';


export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        
        const category = await Category.findOne({ slug: params.id })
            .populate('navbarCategory')
            .exec();
        
        if (!category) {
            notFound();
        }
        
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Failed to fetch category' 
        }, { status: 500 });
    }
}

export const PUT = publicAuthMiddleware(async (
    request: AuthenticatedRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();
        const formData = await request.formData();
        
        // Get form data
        const data: {
            name: string;
            navbarCategory: string;
            description: string;
            image?: string;
        } = {
            name: formData.get('name') as string,
            navbarCategory: formData.get('navbarCategory') as string,
            description: formData.get('description') as string,
        };

        // Handle image upload
        const image = formData.get('image') as File;
        if (image && image.size > 0) {
            try {
                const imageUrl = await uploadToCloudinary(image, `category/${data.name}`);
                data.image = imageUrl;
            } catch (error) {
                console.error('Image upload error:', error);
                throw new Error('Failed to upload image');
            }
        }

        // Create slug from name
        const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

        const category = await Category.findByIdAndUpdate(
            params.id,
            { ...data, slug },
            { new: true, runValidators: true }
        );

        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error: Error | unknown) {
        console.error('Category update error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update category' },
            { status: 500 }
        );
    }
});

export const DELETE = publicAuthMiddleware(async (
    request: AuthenticatedRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();
        const category = await Category.findByIdAndDelete(params.id);
        if (!category) {

            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}); 