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
  title: 'Backend Series DVRs | Hikvision UAE',
  description: 'Advanced backend digital video recorders designed for enterprise-level storage and management of surveillance footage',
};

async function fetchDVRBackendProducts() {
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
              equals: 'dvr',
            },
          },
          {
            series: {
              equals: 'backend-series',
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
    console.error('Error fetching DVR Backend Series products:', error);
    return [];
  }
}

export default async function DVRBackendSeriesPage() {
  const products = await fetchDVRBackendProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Backend Series DVRs</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Backend Series DVRs, designed for enterprise storage and management of surveillance footage.
            These high-capacity digital video recorders offer advanced features like redundant recording, RAID configurations,
            and centralized management for mission-critical surveillance systems.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}