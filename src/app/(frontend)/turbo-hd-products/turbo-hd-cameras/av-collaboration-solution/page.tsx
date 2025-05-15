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
  title: 'Audio & Video Collaboration Solutions | Hikvision UAE',
  description: 'Comprehensive audio and video collaboration tools designed for modern meeting spaces and professional environments',
};

async function fetchTurboHDAVProducts() {
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
              equals: 'audio-video-collaboration-solution',
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
    console.error('Error fetching Turbo HD Audio & Video Collaboration products:', error);
    return [];
  }
}

export default async function TurboHDAVCollaborationPage() {
  const products = await fetchTurboHDAVProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Audio & Video Collaboration Solutions</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Enhance your meeting experience with Hikvision&apos;s Audio & Video Collaboration Solutions. 
            Featuring high-quality cameras, microphones, and integrated systems designed for seamless 
            communication in conference rooms, huddle spaces, and remote collaboration environments.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}