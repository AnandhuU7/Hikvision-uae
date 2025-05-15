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
  title: 'Keyboard Controllers | Hikvision UAE',
  description: 'Professional keyboard controllers for efficient operation of security systems and camera networks',
};

async function fetchKeyboardControllerProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Query products with specific type
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
              equals: 'controllers',
            },
          },
          {
            subType: {
              equals: 'keyboards',
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
    console.error('Error fetching Keyboard Controller products:', error);
    return [];
  }
}

export default async function KeyboardControllersPage() {
  const products = await fetchKeyboardControllerProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Keyboard Controllers</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s professional Keyboard Controllers, designed for efficient operation of security systems and 
            camera networks. These specialized controllers offer intuitive interfaces with joysticks, programmable buttons, 
            and ergonomic designs for precise PTZ camera control and system management. Perfect for security control rooms, 
            surveillance centers, and professional monitoring environments.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}