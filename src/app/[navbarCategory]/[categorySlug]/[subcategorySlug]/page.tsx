'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../Components/navbar';
import Footer from '../../../Components/footer';
import Link from 'next/link';
import Head from 'next/head';

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
        <nav className="bg-gradient-to-r from-gray-50 to-white border-b">
            <div className="container mx-auto px-4 py-4">
                <ol
                    className="flex flex-nowrap overflow-x-auto scrollbar-hide items-center space-x-2 text-sm"
                    style={{ WebkitOverflowScrolling: 'touch' }}
                >
                    <li>
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-red-600 transition-colors duration-300 flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <Link
                            href={`/${navbarCategory.slug}`}
                            className="text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap"
                        >
                            {navbarCategory.name}
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <Link
                            href={`/${navbarCategory.slug}/${category.slug}`}
                            className="text-gray-500 hover:text-red-600 transition-colors whitespace-nowrap"
                        >
                            {category.name}
                        </Link>
                    </li>
                    <li><span className="text-gray-400 mx-2">›</span></li>
                    <li>
                        <span className="text-red-600 font-medium whitespace-nowrap">
                            {subcategory.name || 'Loading...'}
                        </span>
                    </li>
                </ol>
            </div>
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
                    "position": 4,
                    "name": subcategory?.name,
                    "item": `${baseUrl}/${navbarCategoryName?.name?.toLowerCase()}/${categoryName?.name?.toLowerCase()}/${subcategory?.name?.toLowerCase()}`
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
                <div className="min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-red-600"></div>
                        <p className="text-gray-600 animate-pulse">Loading products...</p>
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
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-red-600">Error: {error}</div>
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
            <div className="w-full border-b bg-white/80 backdrop-blur sticky top-0 z-20">
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
            </div>
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
                            {subcategory?.name} <span className="text-black">Solutions</span>
                        </h1>
                        {subcategory?.description && (
                            <p className="text-base sm:text-lg text-gray-700 font-light w-full max-w-5xl mx-auto mb-6">
                                {subcategory.description}
                            </p>
                        )}
                        <div className="flex justify-center">
                            <span className="inline-block w-24 h-1 rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600"></span>
                        </div>
                    </div>
                    {subcategory?.image && (
                        <img
                            src={subcategory.image}
                            alt={subcategory.name}
                            className="absolute right-10 top-1/2 -translate-y-1/2 w-52 h-52 object-contain opacity-10 pointer-events-none select-none hidden md:block"
                        />
                    )}
                </section>

                {/* Products Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {products.map((product) => (
                            <Link
                                key={product._id}
                                href={`/${navbarCategory}/${categorySlug}/${subcategorySlug}/${product.slug}`}
                                className="group"
                            >
                                <div className="relative bg-white/90 border border-red-200 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-red-500 flex flex-col h-full">
                                    <div className="relative h-52 flex items-center justify-center bg-gradient-to-t from-red-50 via-white to-white rounded-t-3xl">
                                        {product.image1 ? (
                                            <img
                                                src={
                                                    product.image1.startsWith("http")
                                                        ? product.image1
                                                        : `${process.env.NEXT_PUBLIC_API_URL}${product.image1}`
                                                }
                                                alt={product.name}
                                                className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-105"
                                                onError={(e) => {
                                                    e.currentTarget.src = "/placeholder.jpg";
                                                }}
                                            />
                                        ) : (
                                            <span className="text-3xl font-bold text-red-600">{product.name}</span>
                                        )}
                                        <div className="absolute top-4 right-4 w-10 h-10 bg-red-600/10 rounded-full blur-sm"></div>
                                    </div>
                                    <div className="p-7 flex flex-col items-center flex-1">
                                        <h2 className="text-xl font-bold text-red-700 mb-2 text-center group-hover:text-red-800 transition-colors">
                                            {product.name}
                                        </h2>
                                        <p className="text-gray-600 text-base text-center mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <button className="mt-auto px-7 py-2 rounded-full bg-red-600 text-white font-semibold shadow hover:bg-red-700 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}