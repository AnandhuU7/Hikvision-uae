'use client'

import { useEffect, useState } from 'react';
import Navbar from '../Components/navbar';
import Footer from '../Components/footer';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import Head from 'next/head';
import { motion } from 'framer-motion';

// --- Types ---
interface NavbarCategory {
    _id: string;
    name: string;
    slug: string;
    order: number;
    isActive: boolean;
    title?: string;
    description?: string;
}

interface Category {
    _id: string;
    name: string;
    slug: string;
    navbarCategory: string;
    description?: string;
    image?: string;
}

// --- Components ---
const Breadcrumb = ({ category }: { category: NavbarCategory | null }) => (
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
                    <span className="text-red-700 font-semibold bg-red-50 px-3 py-1 rounded-full">
                        {category?.name || 'Loading...'}
                    </span>
                </li>
            </ol>
        </div>
    </nav>
);

const CategorySchema = ({ category, categories }: { category: NavbarCategory | null, categories: Category[] }) => {
    if (!category) return null;
    const schemaData = {
        '@context': 'https://schema.org',
        '@type': ['CollectionPage', 'Product'],
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`,
        'name': category.title || `${category.name} Solutions - Hikvision UAE`,
        'headline': category.title || `${category.name} Security Solutions in UAE`,
        'description': category.description || `Advanced ${category.name} security solutions optimized for UAE. Discover comprehensive security systems for your needs.`,
        'brand': { '@type': 'Brand', 'name': 'Hikvision' },
        'mainEntityOfPage': {
            '@type': 'WebPage',
            '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`
        },
        'datePublished': '2024-01-01T08:00:00+04:00',
        'dateModified': new Date().toISOString(),
        'image': {
            '@type': 'ImageObject',
            'url': `${process.env.NEXT_PUBLIC_SITE_URL}/images/${category.slug}.jpg`,
            'width': 1200,
            'height': 630
        },
        'offers': {
            '@type': 'AggregateOffer',
            'priceCurrency': 'AED',
            'lowPrice': '999.00',
            'highPrice': '9999.00',
            'offerCount': categories.length,
            'availability': 'https://schema.org/InStock'
        },
        'aggregateRating': {
            '@type': 'AggregateRating',
            'ratingValue': '4.8',
            'reviewCount': '156',
            'bestRating': '5',
            'worstRating': '1'
        },
        'review': [
            {
                '@type': 'Review',
                'reviewRating': { '@type': 'Rating', 'ratingValue': '5', 'bestRating': '5' },
                'author': { '@type': 'Organization', 'name': 'Security Systems Weekly' },
                'datePublished': '2024-03-01',
                'reviewBody': `Outstanding ${category.name} security solutions from Hikvision. Perfect for UAE conditions and requirements.`
            }
        ],
        'breadcrumb': {
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'item': {
                        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/`,
                        'name': 'Home',
                        'url': process.env.NEXT_PUBLIC_SITE_URL
                    }
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'item': {
                        '@id': `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}/`,
                        'name': category.name,
                        'url': `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`
                    }
                }
            ]
        },
        'hasPart': categories.map(subCategory => ({
            '@type': 'Product',
            'name': subCategory.name,
            'description': subCategory.description,
            'url': `${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}/${subCategory.slug}`,
            'image': subCategory.image || undefined
        })),
        'provider': {
            '@type': 'Organization',
            'name': 'Hikvision UAE',
            'url': process.env.NEXT_PUBLIC_SITE_URL,
            'logo': {
                '@type': 'ImageObject',
                'url': `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`
            },
            'sameAs': [
                'https://www.linkedin.com/company/hikvision',
                'https://twitter.com/hikvision'
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

const SEOHead = ({ category }: { category: NavbarCategory | null }) => {
    if (!category) return null;
    const title = category.title || `${category.name} Solutions - HikvisionUAE`;
    // Shorter description
    const description = category.description || `Discover Hikvision ${category.name} solutions in UAE. Trusted distributor for security products.`;
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`} />
            <meta property="og:site_name" content="HikvisionUAE" />
            <meta property="og:locale" content="en_US" />
            <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`} />
            <meta name="robots" content="index, follow" />
            <meta name="geo.region" content="AE" />
            <meta name="geo.placename" content="United Arab Emirates" />
            <meta name="geo.position" content="25.276987;55.296249" />
            <meta name="ICBM" content="25.276987, 55.296249" />
            <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_URL}/${category.slug}`} />
        </Head>
    );
};

const CategoriesGrid = ({ navbarCategory, categories }: { navbarCategory: string, categories: Category[] }) => {
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
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {categories.map((category) => (
                    <motion.div
                        key={category._id}
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
                            href={`/${navbarCategory}/${category.slug}`}
                            className="block h-full"
                            aria-label={`View details for ${category.name}`}
                        >
                            <div className="relative p-0 flex justify-center items-center w-full h-48 sm:h-56 overflow-hidden">
                                <motion.img
                                    src={category.image || '/placeholder-image.jpg'}
                                    alt={category.name}
                                    className="w-auto h-full max-h-full object-contain p-3 sm:p-4"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>

                            <div className="p-4 md:p-6 flex-grow flex flex-col">
                                <h2 className="text-lg md:text-xl font-bold text-red-700 mb-2 md:mb-3 text-center group-hover:text-red-800 transition-colors duration-300 line-clamp-2">
                                    {category.name}
                                </h2>
                                {category.description && (
                                    <p className="text-gray-600 text-sm text-center mb-4 md:mb-6 flex-grow line-clamp-3 leading-relaxed">
                                        {category.description}
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
export default function NavbarCategoryPage() {
    const params = useParams();
    const navbarCategory = params.navbarCategory as string;
    const [categories, setCategories] = useState<Category[]>([]);
    const [navbarCategoryDetails, setNavbarCategory] = useState<NavbarCategory | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const navbarResponse = await fetch(`/api/navbar-categories/slug/${navbarCategory}`);
                if (!navbarResponse.ok) return notFound();
                const navbarData = await navbarResponse.json();
                setNavbarCategory(navbarData);

                const categoriesResponse = await fetch(`/api/categories?navbarCategory=${navbarData._id}`);
                if (!categoriesResponse.ok) return notFound();
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching data:', error);
                notFound();
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navbarCategory]);

    if (loading) {
        return (
            <><Navbar />
            <div className="min-h-screen bg-gradient-to-br from-white via-red-25 to-red-50">
                
                <Breadcrumb category={null} />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-20 w-20 border-4 border-red-100 border-t-red-600 shadow-lg"></div>
                            <div className="absolute inset-0 animate-pulse rounded-full bg-red-50"></div>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-700 text-lg font-medium animate-pulse mb-2">Loading categories...</p>
                            <div className="flex gap-1 justify-center">
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-red-25 to-red-50">
                <SEOHead category={navbarCategoryDetails} />
                <CategorySchema category={navbarCategoryDetails} categories={categories} />

                <Breadcrumb category={navbarCategoryDetails} />
                <main className="flex-grow">
                    {/* Enhanced Hero Section */}
                    <section className="relative bg-gradient-to-br from-white via-red-25 to-red-50 py-12 md:py-16 px-4 sm:px-0 overflow-hidden">
                        {/* Background decorative elements */}
                        <div className="absolute inset-0">
                            <div className="absolute top-20 left-10 w-64 h-64 bg-red-100 rounded-full opacity-20 blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-200 rounded-full opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                                <div className="absolute top-20 left-1/4 w-2 h-2 bg-red-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
                                <div className="absolute bottom-32 right-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
                            </div>
                        </div>

                        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-sm font-bold tracking-wide uppercase shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Hikvision UAE
                                </span>
                            </motion.div>

                            <motion.h1
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-red-600 to-red-800 mb-6 drop-shadow-lg"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                {navbarCategoryDetails?.title || navbarCategoryDetails?.name}{' '}
                                <span className="bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600">
                                    Solutions
                                </span>
                            </motion.h1>

                            {navbarCategoryDetails?.description && (
                                <motion.p
                                    className="text-lg sm:text-xl text-gray-700 font-medium leading-relaxed w-full max-w-4xl mx-auto mb-8"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                >
                                    {navbarCategoryDetails.description}
                                </motion.p>
                            )}

                            <motion.div
                                className="flex justify-center items-center gap-4 mb-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                                    <div className="w-8 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                                    <div className="w-8 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"></div>
                                    <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                                </div>
                            </motion.div>

                            {/* Statistics or features badges */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                <div className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-2xl font-bold text-red-600 mb-1">{categories.length}+</div>
                                    <div className="text-sm text-gray-600 font-medium">Product Categories</div>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-2xl font-bold text-red-600 mb-1">UAE</div>
                                    <div className="text-sm text-gray-600 font-medium">Local Support</div>
                                </div>
                                <div className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300">
                                    <div className="text-2xl font-bold text-red-600 mb-1">24/7</div>
                                    <div className="text-sm text-gray-600 font-medium">Expert Assistance</div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <CategoriesGrid navbarCategory={navbarCategory} categories={categories} />
                </main>
                <Footer />
            </div>
        </>
    );
} 