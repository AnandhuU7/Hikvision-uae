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
  title: 'Creative LED Displays | Hikvision UAE',
  description: 'Innovative and unique LED display solutions with custom shapes and designs for artistic and architectural applications',
};

async function fetchCreativeLEDProducts() {
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
              equals: 'creative-led-displays',
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
    console.error('Error fetching Creative LED Display products:', error);
    return [];
  }
}

export default async function CreativeLEDDisplaysPage() {
  const products = await fetchCreativeLEDProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Creative LED Displays</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Creative LED Display solutions that break the boundaries of traditional rectangular 
            screens. These innovative displays feature flexible modules, custom shapes, and unique form factors to 
            create eye-catching visual installations. From curved surfaces to irregular shapes and transparent designs, 
            our creative LED solutions transform architectural spaces, retail environments, museums, and entertainment 
            venues with distinctive visual experiences that captivate and engage audiences.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}