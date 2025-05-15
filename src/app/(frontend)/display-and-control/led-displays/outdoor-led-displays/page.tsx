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
  title: 'Outdoor LED Displays | Hikvision UAE',
  description: 'High-brightness LED display solutions designed for outdoor environments with weather resistance and optimal visibility',
};

async function fetchOutdoorLEDProducts() {
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
              equals: 'outdoor-led-displays',
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
    console.error('Error fetching Outdoor LED Display products:', error);
    return [];
  }
}

export default async function OutdoorLEDDisplaysPage() {
  const products = await fetchOutdoorLEDProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Outdoor LED Displays</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Outdoor LED Display solutions designed to deliver exceptional visual impact in 
            outdoor environments. These high-brightness displays feature weather-resistant construction, excellent 
            visibility even in direct sunlight, and durable components for extended operation in various weather 
            conditions. Perfect for advertising, information display, retail storefronts, and public spaces requiring 
            vibrant, attention-grabbing visual communication.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}