import React from 'react';
import { getPayload } from 'payload';
import configPromise from '@/payload.config';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ProductGallery from '@/components/ProductGallery';
import ProductFeatureIcons from '@/components/ProductFeatureIcons';
import ProductSpecifications from '@/components/ProductSpecifications';
import SalesEnquiryButton from '@/components/SalesEnquiryButton';

// Define interfaces
interface SpecificationItem {
  name: string;
  value: string;
}

interface SpecificationCategory {
  category: string;
  specs: SpecificationItem[];
}

interface ProductDetail {
  id: string;
  title: string;
  description?: string;
  heroImage?: {
    url: string;
  };
  productImages?: Array<{
    image: {
      url: string;
    };
    alt: string;
  }>;
  slug: string;
  meta?: {
    description?: string;
  };
  details?: {
    features?: Array<{ feature: string }>;
    specifications?: SpecificationCategory[];
  };
  featureIcons?: Array<{ 
    iconType: string;
    customIcon?: {
      url: string;
    };
    label?: string;
  }>;
  isNew?: boolean;
  subtitle?: string;
}

interface PayloadProduct {
  id: string;
  title: string;
  shortDescription?: string;
  heroImage?: string | { url: string };
  productImages?: Array<{
    image: string | { url: string };
    alt: string;
  }>;
  slug: string;
  meta?: {
    description?: string;
  };
  details?: {
    features?: Array<{ feature: string }>;
    specifications?: SpecificationCategory[];
  };
  featureIcons?: Array<{ 
    iconType: string;
    customIcon?: string | { url: string }; 
    label?: string;
  }>;
  isNew?: boolean;
  subtitle?: string;
}

// Type-safe params object
interface ProductPageProps {
  params: {
    slug: string;
  };
}

// Fetch product function
async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const result = await payload.find({
      collection: 'products',
      depth: 2,
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    });
    
    if (result.docs.length === 0) {
      return null;
    }
    
    const product = result.docs[0] as PayloadProduct;
    
    // Process product images
    const processedProductImages = product.productImages?.map(item => ({
      image: {
        url: typeof item.image === 'string' 
          ? item.image 
          : item.image?.url || '',
      },
      alt: item.alt
    })) || [];
    
    // Process feature icons
    const processedFeatureIcons = product.featureIcons?.map(icon => ({
      iconType: icon.iconType,
      label: icon.label || undefined,
      customIcon: icon.customIcon ? (
        typeof icon.customIcon === 'string'
          ? { url: icon.customIcon }
          : icon.customIcon && typeof icon.customIcon === 'object' && 'url' in icon.customIcon
            ? { url: icon.customIcon.url }
            : undefined
      ) : undefined
    })) || [];
    
    return {
      id: product.id,
      title: product.title,
      description: product.shortDescription || product.meta?.description || '',
      heroImage: typeof product.heroImage === 'string'
        ? { url: product.heroImage }
        : product.heroImage && typeof product.heroImage === 'object' && 'url' in product.heroImage && typeof product.heroImage.url === 'string'
          ? { url: product.heroImage.url }
          : undefined,
      productImages: processedProductImages,
      slug: product.slug,
      meta: product.meta ? {
        description: product.meta.description || undefined
      } : undefined,
      details: {
        features: product.details?.features || [],
        specifications: product.details?.specifications || [],
      },
      featureIcons: processedFeatureIcons,
      isNew: product.isNew || false,
      subtitle: product.subtitle || '',
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
}

// Generate metadata
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const slug = params.slug;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
  
  return {
    title: `${product.title} | Hikvision UAE`, // Updated to include "UAE"
    description: product.meta?.description || product.description || '',
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const resolvedParams = params ? await Promise.resolve(params) : { slug: '' };
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }
  
  // Combine hero image with product images
  const allImages = [
    { image: { url: product.heroImage?.url || '' }, alt: product.title }
  ];
  
  if (product.productImages && product.productImages.length > 0) {
    allImages.push(...product.productImages);
  }
  
  return (
    <div className="bg-white text-gray-900 min-h-screen pb-16">
      {/* Add padding-top to the breadcrumb section */}
      <div className="border-b pt-20 sm:pt-24"> {/* Added pt-20 sm:pt-24 here */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery - Left Side */}
          <div className="lg:col-span-1">
            <ProductGallery 
              images={allImages} 
              productId={product.id}
              productTitle={product.title}
            />
          </div>
          
          {/* Product Details - Right Side */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              {product.isNew && (
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded">NEW</span>
              )}
            </div>
            
            <h2 className="text-xl mb-4">{product.subtitle || '2 MP AcuSense Fixed Cube Network Camera'}</h2>
            
            {/* Add the description section here */}
            {product.description && (
              <p className="text-gray-700 mb-6">{product.description}</p>
            )}
            
            {/* Feature Icons */}
            {product.featureIcons && product.featureIcons.length > 0 && (
              <ProductFeatureIcons icons={product.featureIcons} />
            )}
            
            {/* Product Features */}
            <ul className="space-y-3 mb-8">
              {product.details?.features && product.details.features.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-900 mr-3">•</span>
                  <span>{item.feature}</span>
                </li>
              ))}
            </ul>
            
            {/* CTA Buttons */}
            <div className="mt-8">
              <SalesEnquiryButton productName={product.title} />
            </div>
          </div>
        </div>
        
        {/* Specifications Section */}
        {product.details?.specifications && product.details.specifications.length > 0 && (
          <ProductSpecifications specifications={product.details.specifications} />
        )}
      </div>
    </div>
  );
}