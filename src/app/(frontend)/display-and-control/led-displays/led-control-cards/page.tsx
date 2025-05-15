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
  title: 'Indoor LED Displays | Hikvision UAE',
  description: 'High-definition indoor LED display solutions with fine pixel pitch for optimal viewing in interior environments',
};

async function fetchIndoorLEDProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Query products with specific category
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
              equals: 'led-display',
            },
          },
          {
            subType: {
              equals: 'indoor-led-displays',
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
    console.error('Error fetching Indoor LED Display products:', error);
    return [];
  }
}

export default async function IndoorLEDDisplaysPage() {
  const products = await fetchIndoorLEDProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Indoor LED Displays</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Experience exceptional visual quality with Hikvision&apos;s Indoor LED Display solutions. Featuring 
            fine pixel pitch technology for close-viewing clarity, these displays deliver vibrant colors, 
            high contrast ratios, and seamless imagery in controlled indoor environments. Designed for 
            corporate lobbies, retail spaces, conference rooms, and entertainment venues, our indoor LED 
            displays combine stunning visual performance with reliable operation and flexible installation options.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}