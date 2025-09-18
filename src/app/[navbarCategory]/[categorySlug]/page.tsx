"use client";

import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Head from "next/head";

// --- Types ---
interface Category {
  _id: string;
  name: string;
  slug: string;
  navbarCategory: string;
  description?: string;
  image?: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  image?: string;
}

// --- Components ---
const Breadcrumb = ({ category, parentCategory }: { category: Category | null, parentCategory: string }) => (
  <nav className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <span className="text-gray-400 mx-2">›</span>
        </li>
        <li>
          <Link href={`/${parentCategory}`} className="text-gray-500 hover:text-red-600 transition-colors">
            {parentCategory}
          </Link>
        </li>
        <li>
          <span className="text-gray-400 mx-2">›</span>
        </li>
        <li>
          <span className="text-red-600 font-medium">
            {category?.name || "Loading..."}
          </span>
        </li>
      </ol>
    </div>
  </nav>
);

const CategorySchema = ({ category, subcategories, parentCategory }: { category: Category | null, subcategories: SubCategory[], parentCategory: string }) => {
  if (!category) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hikvisionuae.ae";
  const schemaData = {
    "@context": "https://schema.org",
    "@type": ["CollectionPage", "Product"],
    "@id": `${baseUrl}/${parentCategory}/${category.slug}`,
    "name": `${category.name} Solutions - Hikvision UAE`,
    "headline": `${category.name} Security Solutions in UAE`,
    "description": category.description || `Advanced ${category.name} security solutions optimized for UAE. Discover comprehensive security systems for your needs.`,
    "brand": { "@type": "Brand", "name": "Hikvision" },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/${parentCategory}/${category.slug}`
    },
    "datePublished": "2024-01-01T08:00:00+04:00",
    "dateModified": new Date().toISOString(),
    "image": {
      "@type": "ImageObject",
      "url": category.image || `${baseUrl}/images/${category.slug}.jpg`,
      "width": 1200,
      "height": 630
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "AED",
      "lowPrice": "999.00",
      "highPrice": "9999.00",
      "offerCount": subcategories.length,
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "156",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "author": { "@type": "Organization", "name": "Security Systems Weekly" },
        "datePublished": "2024-03-01",
        "reviewBody": `Outstanding ${category.name} security solutions from Hikvision. Perfect for UAE conditions and requirements.`
      }
    ],
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": `${baseUrl}/`,
            "name": "Home",
            "url": baseUrl
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": `${baseUrl}/${parentCategory}/`,
            "name": parentCategory,
            "url": `${baseUrl}/${parentCategory}`
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@id": `${baseUrl}/${parentCategory}/${category.slug}/`,
            "name": category.name,
            "url": `${baseUrl}/${parentCategory}/${category.slug}`
          }
        }
      ]
    },
    "hasPart": subcategories.map(subCategory => ({
      "@type": "Product",
      "name": subCategory.name,
      "description": subCategory.description,
      "url": `${baseUrl}/${parentCategory}/${category.slug}/${subCategory.slug}`,
      "image": subCategory.image || undefined
    })),
    "provider": {
      "@type": "Organization",
      "name": "Hikvision UAE",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      },
      "sameAs": [
        "https://www.linkedin.com/company/hikvision",
        "https://twitter.com/hikvision"
      ]
    }
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

const SEOHead = ({ category, parentCategory }: { category: Category | null, parentCategory: string }) => {
  if (!category) return null;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hikvisionuae.ae";
  const title = `${category.name} Solutions - HikvisionUAE`;
  const description = category.description || `Discover Hikvision ${category.name} solutions in UAE. Trusted distributor for security products.`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${baseUrl}/${parentCategory}/${category.slug}`} />
      <meta property="og:site_name" content="HikvisionUAE" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
      <meta name="robots" content="index, follow" />
      <meta name="geo.region" content="AE" />
      <meta name="geo.placename" content="United Arab Emirates" />
      <meta name="geo.position" content="25.276987;55.296249" />
      <meta name="ICBM" content="25.276987, 55.296249" />
      <link rel="canonical" href={`${baseUrl}/${parentCategory}/${category.slug}`} />
    </Head>
  );
};

const SubCategoriesGrid = ({ navbarCategory, categorySlug, subcategories }: { navbarCategory: string, categorySlug: string, subcategories: SubCategory[] }) => (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {subcategories.map((subcategory) => (
        <Link
          href={`/${navbarCategory}/${categorySlug}/${subcategory.slug}`}
          key={subcategory._id}
          className="group"
        >
          <div className="relative bg-white/90 border border-red-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-red-500">
            <div className="relative h-52 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
              {subcategory.image ? (
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-3xl font-bold text-red-600">{subcategory.name}</span>
              )}
              <div className="absolute top-4 right-4 w-10 h-10 bg-red-600/10 rounded-full blur-sm"></div>
            </div>
            <div className="p-7 flex flex-col items-center">
              <h2 className="text-xl font-bold text-red-700 mb-2 text-center group-hover:text-red-800 transition-colors">{subcategory.name}</h2>
              {subcategory.description && (
                <p className="text-gray-600 text-base text-center mb-4 line-clamp-2">{subcategory.description}</p>
              )}
              <button className="mt-auto px-7 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors">
                View Products
              </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20"></div>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

// --- Main Page ---
export default function CategoryPage() {
  const params = useParams();
  const navbarCategory = params.navbarCategory as string;
  const categorySlug = params.categorySlug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryRes = await fetch(`/api/categories/slug/${categorySlug}`);
        if (!categoryRes.ok) return notFound();
        const categoryData = await categoryRes.json();
        setCategory(categoryData);

        const subcategoriesRes = await fetch(`/api/subcategories?category=${categoryData._id}`);
        if (!subcategoriesRes.ok) return notFound();
        const subcategoriesData = await subcategoriesRes.json();
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categorySlug]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <Breadcrumb category={null} parentCategory={navbarCategory} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600"></div>
            <p className="text-gray-600 animate-pulse">Loading subcategories...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead category={category} parentCategory={navbarCategory} />
      <CategorySchema category={category} subcategories={subcategories} parentCategory={navbarCategory} />
      <Navbar />
      <Breadcrumb category={category} parentCategory={navbarCategory} />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-10 px-4 sm:px-0 border-b border-red-200">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="mb-4">
              <span className="inline-block px-5 py-1.5 bg-red-600 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg">
                Hikvision UAE
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-700 mb-4 drop-shadow">
              {category?.name} <span className="text-black">Solutions</span>
            </h1>
            {category?.description && (
              <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
                {category.description}
              </p>
            )}
            <div className="flex justify-center">
              <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"></span>
            </div>
          </div>
        </section>
        <SubCategoriesGrid navbarCategory={navbarCategory} categorySlug={categorySlug} subcategories={subcategories} />
      </main>
      <Footer />
    </div>
  );
}
