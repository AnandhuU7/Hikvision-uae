'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '../../../Components/navbar';
import Footer from '../../../Components/footer';
import Link from 'next/link';
import Head from 'next/head';

// Define itemVariants for animations
const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

interface Product {
    _id: string;
    name: string;
    description: string;
    image1: string;
    image2?: string;
    image3?: string;
    navbarCategory: {
        name: string;
        slug: string;
    };
    category: {
        name: string;
        slug: string;
    };
    subcategory: {
        name: string;
        slug: string;
    };
    slug: string;
}

interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

interface BreadcrumbProps {
    navbarCategory: {
        name: string;
        slug: string;
    };
    category: {
        name: string;
        slug: string;
    };
    subcategory: {
        name: string;
        slug: string;
    };
}

const Breadcrumb = ({ navbarCategory, category, subcategory }: BreadcrumbProps) => {
    return (
        <nav className="bg-gradient-to-r from-gray-50 to-white">
            <div className="container mx-auto px-4 py-4">
                <ol
                    className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center space-x-2 text-sm"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <li>
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center group"
                        >
                            <svg className="w-4 h-4 mr-1 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <Link
                            href={`/${navbarCategory.slug}`}
                            className="text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap group relative"
                        >
                            {navbarCategory.name}
                            <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-red-600"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <Link
                            href={`/${navbarCategory.slug}/${category.slug}`}
                            className="text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap group relative"
                        >
                            {category.name}
                            <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-red-600"
                                initial={{ width: 0 }}
                                whileHover={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <span className="text-red-600 font-medium whitespace-nowrap flex items-center">
                            {subcategory.name || 'Loading...'}
                            <motion.span 
                                className="ml-2 w-2 h-2 bg-red-600 rounded-full"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </span>
                    </li>
                </ol>
            </div>
            {/* Custom CSS to hide scrollbar while maintaining scrollability */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </nav>
    );
};

const SubcategorySEO = ({ 
    subcategory, 
    navbarCategoryName, 
    categoryName,
    products 
}: { 
    subcategory: SubCategory | null;
    navbarCategoryName: { name: string; _id: string } | null;
    categoryName: { name: string; _id: string } | null;
    products: Product[];
}) => {
    const title = `${subcategory?.name || ''} Solutions - ${navbarCategoryName?.name || ''} | HikvisionUAE.ae`;
    const description = subcategory?.description || 
        `Explore our range of ${subcategory?.name} solutions from Hikvision. Professional security systems available in UAE.`;

    // Create a rich keywords list based on available data
    const keywords = [
        `${subcategory?.name || ''} security`,
        `${navbarCategoryName?.name || ''} solutions`,
        `${categoryName?.name || ''} systems`,
        'Hikvision UAE',
        'security solutions Dubai',
        'surveillance systems UAE',
        ...products.map(p => p.name),
    ].filter(Boolean).join(', ');

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />

                {/* Open Graph */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`https://hikvisionuae.ae/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`} />
                {subcategory?.image && (
                    <meta property="og:image" content={subcategory.image} />
                )}

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                {subcategory?.image && (
                    <meta name="twitter:image" content={subcategory.image} />
                )}

                {/* Canonical URL */}
                <link 
                    rel="canonical" 
                    href={`https://hikvisionuae.ae/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`} 
                />
            </Head>
        </>
    );
};

const SubcategorySchema = ({ 
    subcategory, 
    products, 
    navbarCategoryName, 
    categoryName 
}: { 
    subcategory: SubCategory | null;
    products: Product[];
    navbarCategoryName: { name: string; _id: string } | null;
    categoryName: { name: string; _id: string } | null;
}) => {
    const baseUrl = 'https://hikvisionuae.ae';
    
    const schema = {
        "@context": "https://schema.org",
        "@type": ["CollectionPage", "ItemList"],
        "@id": `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`,
        "name": `${subcategory?.name} Solutions - HikvisionUAE.ae`,
        "description": subcategory?.description || `Explore our range of ${subcategory?.name} solutions from Hikvision`,
        "url": `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`,
        "numberOfItems": products.length,
        "itemListElement": products.map((product, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
                "@type": "Product",
                "@id": `${baseUrl}/${product.navbarCategory.slug}/${product.category.slug}/${product.subcategory.slug}/${product.slug}#product`,
                "name": product.name,
                "description": product.description,
                "image": product.image1,
                "url": `${baseUrl}/${product.navbarCategory.slug}/${product.category.slug}/${product.subcategory.slug}/${product.slug}`,
                "brand": {
                    "@type": "Brand",
                    "name": "Hikvision"
                },
                "offers": {
                    "@type": "Offer",
                    "availability": "https://schema.org/InStock",
                    "priceCurrency": "AED",
                    "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                    "url": `${baseUrl}/${product.navbarCategory.slug}/${product.category.slug}/${product.subcategory.slug}/${product.slug}`
                }
            }
        })),
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": baseUrl
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": navbarCategoryName?.name,
                    "item": `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": categoryName?.name,
                    "item": `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}`
                },
                {
                    "@type": "ListItem",
                    position: 4,
                    name: subcategory?.name,
                    item: `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`
                }
            ]
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
};

export default function SubCategoryPage() {
    const params = useParams();
    const navbarCategory = params.navbarCategory as string;
    const categorySlug = params.categorySlug as string;
    const subcategorySlug = params.subcategorySlug as string;

    const [products, setProducts] = useState<Product[]>([]);
    const [subcategory, setSubcategory] = useState<SubCategory | null>(null);
    const [categoryName, setCategoryName] = useState<{ name: string; _id: string } | null>(null);
    const [navbarCategoryName, setNavbarCategoryName] = useState<{ name: string; _id: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching data with params:', {
                    navbarCategory,
                    categorySlug,
                    subcategorySlug
                });

                const navbarResponse = await fetch(`/api/navbar-categories/${navbarCategory}`);
                console.log('Navbar Response:', await navbarResponse.clone().json());
                if (!navbarResponse.ok) throw new Error('Failed to fetch navbar category');
                const navbarData = await navbarResponse.json();
                setNavbarCategoryName(navbarData);

                // Fetch category details
                const categoryResponse = await fetch(`/api/categories/${categorySlug}`);
                if (!categoryResponse.ok) throw new Error('Failed to fetch category');
                const categoryData = await categoryResponse.json();
                setCategoryName(categoryData);

                // Fetch subcategory details
                const subcategoryResponse = await fetch(`/api/subcategories/${subcategorySlug}`);
                if (!subcategoryResponse.ok) throw new Error('Failed to fetch subcategory');
                const subcategoryData = await subcategoryResponse.json();
                setSubcategory(subcategoryData);

                // Fetch products
                const productsResponse = await fetch(`/api/products?subcategory=${subcategoryData._id}`, {
                    cache: 'no-store'
                });
                if (!productsResponse.ok) throw new Error('Failed to fetch products');
                const productsData = await productsResponse.json();
                setProducts(productsData);
            } catch (error) {
                console.error('Detailed Error:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (subcategorySlug) {
            fetchData();
        }
    }, [subcategorySlug, categorySlug, navbarCategory]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50">
                    <div className="flex flex-col items-center gap-6">
                        <div className="relative">
                            <motion.div 
                                className="w-20 h-20 border-4 border-gray-200 border-t-red-600 rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.div 
                                className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-red-400 rounded-full"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        </div>
                        <motion.p 
                            className="text-gray-600 flex items-center gap-2"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <span>Loading products</span>
                            <span className="flex gap-1">
                                <motion.span 
                                    className="w-1 h-1 bg-red-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0 }}
                                />
                                <motion.span 
                                    className="w-1 h-1 bg-red-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.15 }}
                                />
                                <motion.span 
                                    className="w-1 h-1 bg-red-600 rounded-full"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.3 }}
                                />
                            </span>
                        </motion.p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-red-50">
                    <motion.div 
                        className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md border border-red-100"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div 
                            className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 0.5, repeat: 1 }}
                        >
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </motion.div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
                        <p className="text-red-600 mb-4">Error: {error}</p>
                        <motion.button 
                            onClick={() => window.location.reload()} 
                            className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Try Again
                        </motion.button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <SubcategorySEO
                subcategory={subcategory}
                products={products}
                navbarCategoryName={navbarCategoryName}
                categoryName={categoryName}
            />
            <SubcategorySchema
                subcategory={subcategory}
                products={products}
                navbarCategoryName={navbarCategoryName}
                categoryName={categoryName}
            />
            <Navbar />
            <Breadcrumb
                navbarCategory={{
                    name: navbarCategoryName?.name || "",
                    slug: navbarCategory,
                }}
                category={{
                    name: categoryName?.name || "",
                    slug: categorySlug,
                }}
                subcategory={{
                    name: subcategory?.name || "",
                    slug: subcategorySlug,
                }}
            />
            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-white via-red-50 to-red-100 py-16 px-4 sm:px-0 border-b border-red-200 overflow-hidden">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <motion.div 
                            className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                            animate={{ 
                                x: [0, 30, 0, -30, 0],
                                y: [0, -50, 0, 20, 0],
                                scale: [1, 1.1, 1, 0.9, 1]
                            }}
                            transition={{ 
                                duration: 15, 
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div 
                            className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-300 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                            animate={{ 
                                x: [0, -30, 0, 30, 0],
                                y: [0, 20, 0, -50, 0],
                                scale: [1, 0.9, 1, 1.1, 1]
                            }}
                            transition={{ 
                                duration: 18, 
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                        <motion.div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"
                            animate={{ 
                                x: [0, 20, 0, -20, 0],
                                y: [0, -30, 0, 30, 0],
                                scale: [1, 1.05, 1, 0.95, 1]
                            }}
                            transition={{ 
                                duration: 20, 
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    </div>
                    
                    <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
                        <motion.div 
                            className="mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.span 
                                className="inline-block px-6 py-2 bg-red-600 text-white rounded-full text-xs font-bold tracking-widest uppercase shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Hikvision UAE
                            </motion.span>
                        </motion.div>
                        <motion.h1 
                            className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-700 mb-6 drop-shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            {subcategory?.name} <span className="text-black">Solutions</span>
                        </motion.h1>
                        {subcategory?.description && (
                            <motion.p 
                                className="text-lg sm:text-xl text-gray-700 font-medium w-full max-w-4xl mx-auto mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                {subcategory.description}
                            </motion.p>
                        )}
                        <motion.div 
                            className="flex justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <div className="relative">
                                <span className="inline-block w-32 h-1.5 rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"></span>
                                <motion.span 
                                    className="absolute top-0 left-0 w-32 h-1.5 rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"
                                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                        
                        {/* Decorative elements */}
                        <motion.div 
                            className="flex justify-center mt-10 space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <motion.span 
                                className="w-3 h-3 rounded-full bg-red-600"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                            <motion.span 
                                className="w-3 h-3 rounded-full bg-red-400"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.span 
                                className="w-3 h-3 rounded-full bg-red-600"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                            />
                        </motion.div>
                    </div>
                    {subcategory?.image && (
                        <motion.img
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 object-contain opacity-10 pointer-events-none select-none hidden lg:block"
                            animate={{ y: ["-50%", "-55%", "-50%"] }}
                            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                        />
                    )}
                </section>

                {/* Products Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Product Range</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore our comprehensive selection of {subcategory?.name} solutions designed to meet your security needs
                        </p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
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
                                    href={`/${navbarCategory}/${categorySlug}/${subcategorySlug}/${product.slug}`}
                                    className="block h-full"
                                    aria-label={`View details for ${product.name}`}
                                >
                                    <div className="relative p-0 flex justify-center items-center w-full h-48 sm:h-56 overflow-hidden">
                                        <motion.img
                                            src={
                                                product.image1.startsWith("http")
                                                    ? product.image1
                                                    : `${process.env.NEXT_PUBLIC_API_URL}${product.image1}`
                                            }
                                            alt={product.name}
                                            className="w-auto h-full max-h-full object-contain p-3 sm:p-4"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                            onError={(e) => {
                                                e.currentTarget.src = "/placeholder.jpg";
                                            }}
                                        />
                                    </div>
                                    
                                    <div className="p-4 md:p-6 flex-grow flex flex-col">
                                        <h2 className="text-lg md:text-xl font-bold text-red-700 mb-2 md:mb-3 text-center group-hover:text-red-800 transition-colors duration-300 line-clamp-2">
                                            {product.name}
                                        </h2>
                                        <p className="text-gray-600 text-sm text-center mb-4 md:mb-6 flex-grow line-clamp-3 leading-relaxed">
                                            {product.description}
                                        </p>
                                        <div className="flex justify-center mt-auto">
                                            <button className="px-6 md:px-8 py-2 md:py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-lg group-hover:shadow-xl group-hover:from-red-700 group-hover:to-red-800 transition-all duration-300 transform group-hover:scale-105 flex items-center gap-2 text-sm md:text-base">
                                                View Details
                                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    
                    {products.length === 0 && (
                        <motion.div 
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div 
                                className="inline-block p-4 bg-red-100 rounded-full mb-4"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                                </svg>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">No products found</h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                We couldn't find any products in this category. Please check back later or browse other categories.
                            </p>
                        </motion.div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}