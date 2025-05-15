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
  title: 'Face Recognition Modules for Turnstile | Hikvision UAE',
  description: 'Specialized face recognition modules designed for integration with turnstiles and gates in high-traffic locations',
};

async function fetchFaceRecognitionTurnstileProducts() {
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
              equals: 'face-recognition-modules-for-turnstile',
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
    console.error('Error fetching Face Recognition Turnstile Modules:', error);
    return [];
  }
}

export default async function FaceRecognitionTurnstileModulesPage() {
  const products = await fetchFaceRecognitionTurnstileProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Face Recognition Modules for Turnstile</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Streamline access in high-traffic areas with Hikvision&apos;s Face Recognition Modules for Turnstiles. 
            These specialized modules are designed to integrate seamlessly with turnstiles and gates, providing 
            touchless, rapid identification for efficient crowd management. Ideal for transportation hubs, stadiums, 
            corporate lobbies, and other environments where quick, secure access is essential.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}