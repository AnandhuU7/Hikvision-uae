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
  title: 'Ultra Series Controllers | Hikvision UAE',
  description: 'Premium access control controllers featuring cutting-edge technology for high-security applications',
};

async function fetchControllerUltraSeriesProducts() {
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
              equals: 'controllers',
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
    console.error('Error fetching Controller Ultra Series products:', error);
    return [];
  }
}

export default async function ControllersUltraSeriesPage() {
  const products = await fetchControllerUltraSeriesProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Ultra Series Controllers</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Experience Hikvision&apos;s Ultra Series Controllers, our premium line of access control system hubs. 
            These state-of-the-art controllers feature enhanced processing power, expanded memory, and superior 
            encryption standards, designed for critical infrastructure, data centers, and high-security 
            facilities requiring maximum reliability and performance.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}