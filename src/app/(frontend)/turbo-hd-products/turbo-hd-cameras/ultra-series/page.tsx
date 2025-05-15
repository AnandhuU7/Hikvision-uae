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
  title: 'Ultra Series Turbo HD Cameras | Hikvision UAE',
  description: 'Premium Turbo HD cameras featuring advanced technology and superior image quality for demanding surveillance applications',
};

async function fetchTurboHDUltraProducts() {
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
              equals: 'turbo-hd-cameras',
            },
          },
          {
            series: {
              equals: 'ultra-series',
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
    console.error('Error fetching Turbo HD Ultra Series products:', error);
    return [];
  }
}

export default async function TurboHDUltraSeriesPage() {
  const products = await fetchTurboHDUltraProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Ultra Series Turbo HD Cameras</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision&apos;s Ultra Series Turbo HD cameras, our premium line featuring advanced imaging technology 
            and exceptional low-light performance. These high-end cameras deliver superior resolution and detail for 
            the most demanding security applications.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}