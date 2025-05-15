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
  title: 'Pro Series LCD Video Walls | Hikvision UAE',
  description: 'Professional-grade LCD video wall solutions with ultra-narrow bezels and advanced display technology for control rooms and surveillance centers',
};

async function fetchLCDVideoWallsProSeriesProducts() {
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
              equals: 'display-and-control',
            },
          },
          {
            productType: {
              equals: 'lcd-video-walls',
            },
          },
          {
            series: {
              equals: 'pro-series',
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
    console.error('Error fetching LCD Video Walls Pro Series products:', error);
    return [];
  }
}

export default async function LCDVideoWallsProSeriesPage() {
  const products = await fetchLCDVideoWallsProSeriesProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Pro Series LCD Video Walls</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision&apos;s Pro Series LCD Video Walls, engineered for professional command and control centers.
            These high-performance display solutions feature ultra-narrow bezels for nearly seamless viewing experiences,
            superior color accuracy, and 24/7 operation capability. With advanced image processing technology and
            flexible configuration options, they&apos;re ideal for security monitoring centers, traffic management facilities,
            and other mission-critical environments requiring expansive, high-resolution visual displays.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}