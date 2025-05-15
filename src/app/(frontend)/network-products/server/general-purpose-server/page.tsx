import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductFilter } from '@/components/ProductFilter';
import type { Product as PayloadProduct } from '@/payload-types';

// Define the expected Product type for the ProductGrid component
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
  title: 'General-Purpose Servers | Hikvision UAE',
  description: 'High-performance general-purpose servers for a wide range of IT and security applications',
};

async function fetchGeneralPurposeServers() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      where: {
        productType: {
          equals: 'server',
        },
        series: {
          equals: 'general-purpose',
        },
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
    console.error('Error fetching General-Purpose Server products:', error);
    return [];
  }
}

export default async function GeneralPurposeServerPage() {
  const products = await fetchGeneralPurposeServers();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">General-Purpose Servers</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision's general-purpose server solutions designed for versatile deployment in various IT environments. These powerful servers offer reliable performance for security, data processing, and management applications with robust hardware specifications.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}