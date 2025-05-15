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
  title: 'Face Products Kits | Hikvision UAE',
  description: 'Complete facial recognition solution kits with all necessary components for streamlined deployment and operation',
};

async function fetchFaceProductsKits() {
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
              equals: 'kits',
            },
          },
          {
            series: {
              equals: 'face-products-kits',
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
    console.error('Error fetching Face Products Kits:', error);
    return [];
  }
}

export default async function FaceProductsKitsPage() {
  const products = await fetchFaceProductsKits();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Face Products Kits</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision&apos;s comprehensive Face Products Kits, providing complete facial recognition solutions 
            in convenient bundled packages. These all-in-one kits include terminals, software, and accessories needed 
            for quick deployment of advanced biometric access control. Perfect for businesses looking for streamlined 
            implementation without the complexity of sourcing individual components.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}