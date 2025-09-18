import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Product from '@/app/models/Product';
import { config } from '../config';
import { uploadToCloudinary } from '@/app/utils/cloudinary';
import { publicAuthMiddleware, AuthenticatedRequest } from '../middleware/publicAuth';

export { config };

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const subcategoryId = searchParams.get('subcategory');

    let query = {};
    if (subcategoryId) {
      query = { subcategory: subcategoryId };
    }

    const products = await Product.find(query)
      .populate('navbarCategory', 'name')
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const POST = publicAuthMiddleware(async (request: AuthenticatedRequest) => {
  try {
    console.log('Starting product POST request');
    await connectDB();
    console.log('Database connected');
    const formData = await request.formData();
    console.log('Form data received:', formData);
    
    // Handle image uploads first
    const imageUrls: { [key: string]: string } = {};
    
    // Process images sequentially using async/await
    for (const imageField of ['image1', 'image2', 'image3', 'image4']) {
      const imageFile = formData.get(imageField) as File;
      if (imageFile && imageFile.size > 0) {
        try {
          const categoryName = formData.get('category');
          const subcategoryName = formData.get('subcategory');
          const productName = formData.get('name');
          
          const productSlug = formData.get('name')?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-');
          const folderPath = `categories/${categoryName}/subcategories/${subcategoryName}/products/${productSlug}`;
          const uploadResult = await uploadToCloudinary(imageFile, folderPath);
          
          imageUrls[imageField] = uploadResult;
        } catch (error) {
          console.error(`Error uploading ${imageField}:`, error);
          throw new Error(`Failed to upload ${imageField}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
    }

    // Create the product data object
    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      keyFeatures: JSON.parse(formData.get('keyFeatures') as string || '[]'),
      navbarCategory: formData.get('navbarCategory'),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
      image1: imageUrls.image1,
      image2: imageUrls.image2 || '',
      image3: imageUrls.image3 || '',
      image4: imageUrls.image4 || '',
      slug: (formData.get('name') as string).toLowerCase().replace(/[^a-z0-9]+/g, '-')
    };

    // Create the product in the database
    const product = await Product.create(productData);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create product' },
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