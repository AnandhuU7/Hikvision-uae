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
  title: 'Special Series DVRs | Hikvision UAE',
  description: 'Specialized digital video recorders designed for unique surveillance applications and industry-specific requirements',
};

async function fetchSpecialSeriesDVRProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
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
              equals: 'dvr',
            },
          },
          {
            series: {
              equals: 'special-series',
            },
          },
        ],
      },
      limit: 100,
    });
    
    // Transform the products to match the expected Product interface
    const transformedProducts: Product[] = result.docs.map((product: PayloadProduct) => ({
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
        description: product.meta?.description || undefined
      }
    }));
    
    return transformedProducts;
  } catch (error) {
    console.error('Error fetching Special Series DVR products:', error);
    return [];
  }
}

export default async function SpecialSeriesDVRPage() {
  const products = await fetchSpecialSeriesDVRProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Special Series DVRs</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Special Series DVRs, designed for unique applications and specific industry requirements. These specialized digital video recorders offer tailored features to address particular surveillance challenges, including mobile applications, covert operations, and industry-specific compliance needs.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}