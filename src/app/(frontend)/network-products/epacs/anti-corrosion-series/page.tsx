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
  title: 'Anti-Corrosion Series EPACS | Hikvision UAE',
  description: 'Corrosion-resistant access control systems designed for harsh environments with exposure to chemicals, salt, and moisture',
};

async function fetchAntiCorrosionProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      where: {
        productType: {
          equals: 'access-controller',
        },
        series: {
          equals: 'anti-corrosion-series',
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
    console.error('Error fetching Anti-Corrosion Series products:', error);
    return [];
  }
}

export default async function AntiCorrosionSeriesPage() {
  const products = await fetchAntiCorrosionProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Anti-Corrosion Series Access Control</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision's anti-corrosion access control systems designed for harsh environments including coastal areas, chemical plants, and industrial facilities where standard equipment would deteriorate. These systems feature specialized coatings and materials to withstand exposure to corrosive elements.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}