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
  title: 'AcuSense Series DVRs | Hikvision UAE',
  description: 'Intelligent DVRs with AcuSense technology for accurate motion detection and false alarm reduction',
};

async function fetchAcuSenseDVRProducts() {
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
              equals: 'acusense-series',
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
    console.error('Error fetching AcuSense Series DVR products:', error);
    return [];
  }
}

export default async function AcuSenseDVRPage() {
  const products = await fetchAcuSenseDVRProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">AcuSense Series DVRs</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Experience intelligent surveillance with Hikvision&apos;s AcuSense Series DVRs. Powered by deep learning algorithms, these recorders can distinguish between humans, vehicles, and other moving objects, dramatically reducing false alarms and enabling more efficient security monitoring.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}