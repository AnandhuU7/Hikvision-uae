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
  title: 'Rental LED Displays | Hikvision UAE',
  description: 'Modular and portable LED display solutions designed for quick assembly and disassembly at temporary events and installations',
};

async function fetchRentalLEDProducts() {
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
              equals: 'rental-led-displays',
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
    console.error('Error fetching Rental LED Display products:', error);
    return [];
  }
}

export default async function RentalLEDDisplaysPage() {
  const products = await fetchRentalLEDProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Rental LED Displays</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Discover Hikvision&apos;s Rental LED Display solutions, specially designed for temporary installations 
            and event applications. These highly portable, modular LED panels feature tool-free assembly, 
            quick-lock systems, and robust construction for frequent transport. With fast setup and teardown 
            times, excellent visual performance, and adaptable configurations, they&apos;re perfect for concerts, 
            exhibitions, conferences, and other temporary events requiring high-impact visual displays.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}