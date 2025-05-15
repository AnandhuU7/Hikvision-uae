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
  title: 'Pro Series PTZ Cameras | Hikvision UAE',
  description: 'Professional-grade pan-tilt-zoom cameras offering precise movement control and enhanced monitoring capabilities',
};

async function fetchPTZProSeriesProducts() {
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
              equals: 'turbo-hd-products',
            },
          },
          {
            productType: {
              equals: 'ptz-camera',
            },
          },
          {
            series: {
              equals: 'pro-ptz',
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
    console.error('Error fetching PTZ Pro Series products:', error);
    return [];
  }
}

export default async function PTZProSeriesPage() {
  const products = await fetchPTZProSeriesProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Pro Series PTZ Cameras</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision&apos;s Pro Series PTZ cameras offering professional-grade pan, tilt, and zoom capabilities.
            These versatile cameras provide exceptional optical zoom, precise positioning control, and rapid response
            for comprehensive surveillance of large areas and tracking of moving subjects.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}