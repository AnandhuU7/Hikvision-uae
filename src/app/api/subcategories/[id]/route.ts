import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import SubCategory from '@/app/models/SubCategory';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../middleware/publicAuth';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    // First try to find by slug
    let subcategory = await SubCategory.findOne({ slug: params.id })
      .populate('category')
      .exec();
      
    // If not found by slug, try to find by ID
    if (!subcategory) {
      subcategory = await SubCategory.findById(params.id)
        .populate('category')
        .exec();
    }

    if (!subcategory) {
      return NextResponse.json({ error: 'SubCategory not found' }, { status: 404 });
    }
    
    return NextResponse.json(subcategory);
  } catch (error) {
    console.error('Error fetching subcategory:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to fetch subcategory' 
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
      category: string;
      description: string;
      isActive: boolean;
      image?: string;
    } = {
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      description: formData.get('description') as string,
      isActive: formData.get('isActive') === 'true',
    };

    // Handle image upload if present
    const image = formData.get('image') as File;
    if (image && image.size > 0) {
        try {
            const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const imageUrl = await uploadToCloudinary(image, `categories/${data.category}/subcategories/${slug}`);
            data.image = imageUrl;
            console.log('Image uploaded successfully:', imageUrl);
        } catch (error) {
            console.error('Image upload error:', error);
            throw new Error('Failed to upload image');
        }
    }

    // Create slug from name
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const subcategory = await SubCategory.findByIdAndUpdate(
      params.id,
      { ...data, slug },
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return NextResponse.json({ error: 'SubCategory not found' }, { status: 404 });
    }

    return NextResponse.json(subcategory);
  } catch (error: any) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update subcategory' },
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
    const subcategory = await SubCategory.findByIdAndDelete(params.id);
    if (!subcategory) {
      return NextResponse.json({ error: 'SubCategory not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete subcategory' }, { status: 500 });
  }
}); 