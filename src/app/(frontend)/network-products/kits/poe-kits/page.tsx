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
  title: 'PoE Kits | Hikvision UAE',
  description: 'Complete Power-over-Ethernet surveillance kits with simplified installation and reliable performance',
};

async function fetchPoEKitProducts() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
      collection: 'products',
      depth: 1,
      where: {
        productType: {
          equals: 'kit',
        },
        series: {
          equals: 'poe-kit',
        },
      },
      limit: 100,
        });
    
        return result.docs as Product[];
      } catch (error) {
        console.error('Failed to fetch PoE Kit products:', error);
        return [];
      }
    }