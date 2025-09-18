export function generateProductSchema(
  product: {
    name: string;
    description: string;
    image1?: string;
    image2?: string;
    image3?: string;
    image4?: string;
    slug: string;
    _id: string;
  },
  navbarCategory: {
    slug: string;
    name: string;
  } | null,
  category: {
    slug: string;
    name: string;
  } | null,
  subcategory: {
    slug: string;
    name: string;
  } | null
) {
    const baseUrl = 'https://hikvisionuae.ae';
    const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": images,
      "brand": {
        "@type": "Brand",
        "name": "Hikvision"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "price": "0",
        "priceCurrency": "AED",
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "url": `${baseUrl}/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`
      },
      "category": `${navbarCategory?.name || ''} > ${category?.name || ''} > ${subcategory?.name || ''}`,
      "sku": product._id,
      "mpn": product._id,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "120"
      }
    };
  }
  
  // Add more structured data generators for categories, subcategories, etc.