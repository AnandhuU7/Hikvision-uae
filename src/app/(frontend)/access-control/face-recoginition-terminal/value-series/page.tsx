import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ProductFilter } from '@/components/ProductFilter';
import type { Product as PayloadProduct } from '@/payload-types';

// Define the expected Product type for the ProductFilter component
interface Product {
  id: string;
  title: string;
  description?: string;
  heroImage?: {
    url: string;
  };
  slug: string;
  meta?: {
    description?: string;
  };
}

export const metadata = {
  title: 'Value Series Face Recognition Terminals | Hikvision UAE',
  description: 'Cost-effective face recognition terminals with essential features for standard access control applications',
};

async function fetchFaceRecognitionValueSeriesProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Query products with specific series and type
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      where: {
        and: [
          {
            mainCategory: {
              equals: 'access-control',
            },
          },
          {
            productType: {
              equals: 'face-recognition-terminal',
            },
          },
          {
            series: {
              equals: 'value-series',
            },
          },
        ],
      },
      limit: 100,
    });
    
    // Transform the products to match the expected Product interface
    const products: Product[] = result.docs.map((product: PayloadProduct) => ({
      id: product.id,
      title: product.title,
      description: product.shortDescription || product.meta?.description || '',
      heroImage: typeof product.heroImage === 'string'
        ? { url: product.heroImage }
        : product.heroImage && typeof product.heroImage === 'object' && 'url' in product.heroImage && product.heroImage.url
          ? { url: product.heroImage.url as string }
          : undefined,
      slug: product.slug,
      meta: {
        description: product.meta?.description as string | undefined
      }
    }));
    
    return products;
  } catch (error) {
    console.error('Error fetching Face Recognition Value Series products:', error);
    return [];
  }
}

export default async function FaceRecognitionValueSeriesPage() {
  const products = await fetchFaceRecognitionValueSeriesProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Value Series Face Recognition Terminals</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Value Series Face Recognition Terminals, offering affordable biometric access control 
            solutions with reliable performance. These cost-effective terminals provide essential face recognition features 
            for small businesses, residential buildings, and standard office environments.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}