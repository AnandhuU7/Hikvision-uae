"use client";

import { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Footer from "../../Components/footer";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Head from "next/head";
import { motion } from "framer-motion";

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
  <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-red-100">
    <div className="container mx-auto px-4 py-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:underline underline-offset-4 font-medium">
            Home
          </Link>
        </li>
        <li>
          <span className="text-red-300 mx-3 text-lg">›</span>
        </li>
        <li>
          <Link href={`/${parentCategory}`} className="text-gray-600 hover:text-red-600 transition-all duration-300 hover:underline underline-offset-4 font-medium">
            {parentCategory}
          </Link>
        </li>
        <li>
          <span className="text-red-300 mx-3 text-lg">›</span>
        </li>
        <li>
          <span className="text-red-700 font-semibold bg-red-50 px-3 py-1 rounded-full">
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

const SubCategoriesGrid = ({ navbarCategory, categorySlug, subcategories, categoryName }: { 
  navbarCategory: string, 
  categorySlug: string, 
  subcategories: SubCategory[],
  categoryName: string
}) => {
  // Container variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item variants for individual cards
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Explore Subcategories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our comprehensive range of {categoryName} solutions
        </p>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {subcategories.map((subcategory) => (
          <motion.div
            key={subcategory._id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-md overflow-hidden relative border-2 border-transparent group"
            whileHover={{ 
              y: -10,
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: "#ef4444"
            }}
            whileTap={{ 
              borderColor: "#ef4444"
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link 
              href={`/${navbarCategory}/${categorySlug}/${subcategory.slug}`}
              className="block h-full"
              aria-label={`View details for ${subcategory.name}`}
            >
              <div className="relative p-0 flex justify-center items-center w-full h-48 sm:h-56 overflow-hidden">
                <motion.img
                  src={subcategory.image || '/placeholder-image.jpg'}
                  alt={subcategory.name}
                  className="w-auto h-full max-h-full object-contain p-3 sm:p-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              
              <div className="p-4 md:p-6 flex-grow flex flex-col">
                <h2 className="text-lg md:text-xl font-bold text-red-700 mb-2 md:mb-3 text-center group-hover:text-red-800 transition-colors duration-300 line-clamp-2">
                  {subcategory.name}
                </h2>
                {subcategory.description && (
                  <p className="text-gray-600 text-sm text-center mb-4 md:mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {subcategory.description}
                  </p>
                )}
                <div className="flex justify-center mt-auto">
                  <button className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg group-hover:shadow-xl group-hover:from-red-700 group-hover:to-red-800 transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2 text-sm md:text-base">
                    View Products
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

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
      <div className="min-h-screen bg-gradient-to-br from-white via-red-25 to-red-50">
        <Navbar />
        <Breadcrumb category={null} parentCategory={navbarCategory} />
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-red-100 border-t-red-600 shadow-lg"></div>
              <div className="absolute inset-0 animate-pulse rounded-full bg-red-50"></div>
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-lg font-medium animate-pulse mb-2">Loading subcategories...</p>
              <div className="flex gap-1 justify-center">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-red-25 to-red-50">
      <SEOHead category={category} parentCategory={navbarCategory} />
      <CategorySchema category={category} subcategories={subcategories} parentCategory={navbarCategory} />
      <Navbar />
      <Breadcrumb category={category} parentCategory={navbarCategory} />
      <main className="flex-grow">
        {/* Hero Section - Enhanced */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGZpbGw9IiNmZWQ3ZDciIGQ9Ik0wIDBoNjB2NjBIMHoiIG9wYWNpdHk9Ii4xIi8+CiAgICA8cGF0aCBzdHJva2U9IiNmZWQ3ZDciIHN0cm9rZS13aWR0aD0iLjUiIGQ9Ik0wIDBsNjAgNjBNNjAgMEwwIDYwIi8+CiAgPC9nPgo8L3N2Zz4=')] opacity-20"></div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-red-200 opacity-30"
              animate={{ 
                y: [0, -15, 0],
                x: [0, 10, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-red-300 opacity-20"
              animate={{ 
                y: [0, 20, 0],
                x: [0, -15, 0]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
            <motion.div 
              className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full bg-red-400 opacity-25"
              animate={{ 
                y: [0, 10, 0],
                x: [0, -10, 0]
              }}
              transition={{ 
                duration: 7, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            />
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div 
                className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                HIKVISION UAE
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="block">{category?.name}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">Security Solutions</span>
              </motion.h1>
              
              {category?.description && (
                <motion.p 
                className="text-xl md:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed text-justify"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {category.description}
                </motion.p>
              )}
              
              <motion.div 
                className="flex flex-wrap justify-center gap-6 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-red-100">
                  <div className="text-3xl font-bold text-red-600 mr-3">{subcategories.length}+</div>
                  <div className="text-gray-600 font-medium">Product Categories</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-red-100">
                  <div className="text-3xl font-bold text-red-600 mr-3">24/7</div>
                  <div className="text-gray-600 font-medium">Expert Support</div>
                </div>
                <div className="bg-white rounded-xl shadow-sm p-5 flex items-center border border-red-100">
                  <div className="text-3xl font-bold text-red-600 mr-3">UAE</div>
                  <div className="text-gray-600 font-medium">Local Service</div>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex justify-center gap-4 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button 
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Products
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
                <motion.button 
                  className="px-8 py-4 bg-white text-red-600 font-medium rounded-lg shadow-sm border-2 border-red-200 hover:bg-red-50 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Expert
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Subcategories Grid - Preserved from your code */}
        <SubCategoriesGrid 
          navbarCategory={navbarCategory} 
          categorySlug={categorySlug} 
          subcategories={subcategories}
          categoryName={category?.name || ""}
        />

        {/* Category Overview Section - Enhanced */}
        <section className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-red-50"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+CiAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxwYXRoIGZpbGw9IiNmZWQ3ZDciIGQ9Ik0wIDBoNjB2NjBIMHoiIG9wYWNpdHk9Ii4wNSIvPgogICAgPHBhdGggc3Ryb2tlPSIjZmVkN2Q3IiBzdHJva2Utd2lkdGg9Ii4yNSIgZD0iTTAgMGw2MCA2ME02MCAwTDAgNjAiLz4KICA8L2c+Cjwvc3ZnPg==')] opacity-10"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Premium {category?.name} Solutions
              </motion.h2>
              <motion.div 
                className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-700 mx-auto mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Our comprehensive range of {category?.name} products are designed to meet the highest security standards
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Industry Leading Technology</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Hikvision is a world leader in video surveillance products and solutions. Our {category?.name} solutions incorporate the latest advancements in security technology, ensuring your property remains protected at all times.
                </p>
                
                <motion.ul 
                  className="space-y-5 mb-10"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  {[
                    { text: "Advanced AI-powered analytics" },
                    { text: "Designed for UAE climate conditions" },
                    { text: "Seamless integration with existing systems" }
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-4">
                        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-lg">{item.text}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                
                <motion.button
                  className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-medium rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.button>
              </motion.div>
              
              <motion.div
                className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 md:p-10 border border-red-100 shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "15+", label: "Years Experience" },
                    { value: "10K+", label: "Happy Customers" },
                    { value: "50+", label: "Product Range" },
                    { value: "24/7", label: "Support" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      className="text-center p-5 bg-white rounded-xl shadow-sm border border-red-50"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{stat.value}</div>
                      <div className="text-gray-600 font-medium">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-8 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Trusted by leading organizations in UAE
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}