import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Product from '@/app/models/Product';
import { deleteFromCloudinary, getPublicIdFromUrl, uploadToCloudinary } from '@/app/utils/cloudinary';
import { Document } from 'mongoose';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../middleware/publicAuth';

interface PopulatedProduct extends Document {
  category: { slug: string; name: string };
  subcategory?: { slug: string; name: string };
  navbarCategory: { slug: string; name: string };
  slug: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const product = await Product.findById(params.id)
      .populate('navbarCategory', 'name')
      .populate('category', 'name')
      .populate('subcategory', 'name');

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export const DELETE = publicAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const product = await Product.findByIdAndDelete(params.id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
});

export const PUT = publicAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const formData = await request.formData();

    const existingProduct = await Product.findById(params.id)
      .populate('category', 'slug name')
      .populate('subcategory', 'slug name')
      .populate('navbarCategory', 'slug name')
      .lean() as unknown as PopulatedProduct;
    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const productData: any = {
      name: formData.get('name'),
      description: formData.get('description'),
      keyFeatures: JSON.parse(formData.get('keyFeatures') as string || '[]'),
      navbarCategory: formData.get('navbarCategory'),
      category: formData.get('category'),
      subcategory: formData.get('subcategory'),
    };

    // Handle image updates
    for (const imageField of ['image1', 'image2', 'image3', 'image4'] as const) {
      const newImage = formData.get(imageField) as File;
      if (newImage && newImage.size > 0) {
        // Delete old image if it exists
        const oldImageUrl = existingProduct.get(imageField);
        if (oldImageUrl) {
          const publicId = getPublicIdFromUrl(oldImageUrl);
          await deleteFromCloudinary(publicId);
        }

        // Upload new image
        const folderPath = existingProduct.subcategory
          ? `categories/${existingProduct.category.slug}/subcategories/${existingProduct.subcategory.slug}/products/${existingProduct.slug}`
          : `categories/${existingProduct.category.slug}/products/${existingProduct.slug}`;
        const imageUrl = await uploadToCloudinary(newImage, folderPath);
        productData[imageField] = imageUrl;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      productData,
      { new: true }
    );

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    );
  }
}); 