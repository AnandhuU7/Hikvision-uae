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
  title: 'Video Decoders | Hikvision UAE',
  description: 'Professional video decoders for converting IP video streams to analog or HDMI output for display on conventional monitors',
};

async function fetchDecoderProducts() {
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
              equals: 'decoders',
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
    console.error('Error fetching Video Decoder products:', error);
    return [];
  }
}

export default async function DecodersPage() {
  const products = await fetchDecoderProducts();
  
  return (
    <div className="bg-white text-black py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="w-1.5 h-8 bg-red-600 mr-3"></div>
            <h1 className="text-3xl font-bold">Video Decoders</h1>
          </div>
          <p className="text-gray-400 max-w-3xl">
            Explore Hikvision&apos;s Video Decoders, designed to convert IP video streams to HDMI, DVI or other display formats. 
            These versatile decoders enable integration of network cameras with conventional displays, video walls, and legacy 
            monitoring systems. Ideal for security monitoring centers, retail environments, and applications requiring flexible 
            video output options for network-based camera systems.
          </p>
        </div>
        
        <ProductFilter products={products} />
      </div>
    </div>
  );
}