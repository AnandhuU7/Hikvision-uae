'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../../Components/navbar';
import Footer from '../../../../Components/footer';
import Link from 'next/link';
import Head from 'next/head';

interface Product {
    _id: string;
    name: string;
    description: string;
    keyFeatures?: string[];
    image1: string;
    image2: string;
    image3: string;
    image4: string;
    navbarCategory: string;
    category: string;
    subcategory: string;
    slug: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    faqSchema?: {
        question: string;
        answer: string;
    }[];
}

interface NavbarCategoryDetails {
    _id: string;
    name: string;
    slug: string;
}

interface CategoryDetails {
    _id: string;
    name: string;
    slug: string;
}

interface SubCategoryDetails {
    _id: string;
    name: string;
    slug: string;
}

interface BreadcrumbProps {
    navbarCategory: {
        name: string;
        slug: string;
    } | null;
    category: {
        name: string;
        slug: string;
    } | null;
    subcategory: {
        name: string;
        slug: string;
    } | null;
}

interface SchemaData {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    image: string[];
    brand: {
        "@type": string;
        name: string;
    };
    offers: {
        "@type": string;
        availability: string;
        price: string;
        priceCurrency: string;
        priceValidUntil: string;
        url: string;
        seller?: {
            "@type": string;
            name: string;
            address?: {
                "@type": string;
                addressCountry: string;
                addressRegion: string;
            };
        };
        areaServed?: {
            "@type": string;
            name: string;
        };
    };
    category?: string;
    additionalProperty?: {
        "@type": string;
        name: string;
        value: string;
    }[];
    aggregateRating?: {
        "@type": string;
        ratingValue: string;
        reviewCount: string;
    };
    review?: {
        "@type": string;
        reviewRating: {
            "@type": string;
            ratingValue: string;
            bestRating: string;
        };
        author: {
            "@type": string;
            name: string;
        };
        publisher?: {
            "@type": string;
            name: string;
        };
    };
}

const Breadcrumb = ({ navbarCategory, category, subcategory, productName }: BreadcrumbProps & { productName?: string }) => {
    return (
        <nav className="bg-white shadow-sm overflow-x-auto">
            <div className="container mx-auto px-2 py-2 sm:px-4 sm:py-3">
                <ol className="flex items-center space-x-2 text-xs sm:text-sm whitespace-nowrap">
                    <li>
                        <Link href="/" className="text-gray-500 hover:text-red-600 transition-colors">
                            Home
                        </Link>
                    </li>
                    {navbarCategory && (
                        <>
                            <li><span className="text-gray-400 mx-2">›</span></li>
                            <li>
                                <Link
                                    href={`/${navbarCategory.slug}`}
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    {navbarCategory.name}
                                </Link>
                            </li>
                        </>
                    )}
                    {category && (
                        <>
                            <li><span className="text-gray-400 mx-2">›</span></li>
                            <li>
                                <Link
                                    href={`/${navbarCategory?.slug}/${category.slug}`}
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    {category.name}
                                </Link>
                            </li>
                        </>
                    )}
                    {subcategory && (
                        <>
                            <li><span className="text-gray-400 mx-2">›</span></li>
                            <li>
                                <Link
                                    href={`/${navbarCategory?.slug}/${category?.slug}/${subcategory.slug}`}
                                    className="text-gray-500 hover:text-red-600 transition-colors"
                                >
                                    {subcategory.name}
                                </Link>
                            </li>
                        </>
                    )}
                    {productName && (
                        <>
                            <li><span className="text-gray-400 mx-2">›</span></li>
                            <li>
                                <span className="text-red-600 font-medium">{productName}</span>
                            </li>
                        </>
                    )}
                </ol>
            </div>
        </nav>
    );
};

const ProductSEO = ({ product, navbarCategory, category, subcategory }: { 
    product: Product; 
    navbarCategory: NavbarCategoryDetails | null;
    category: CategoryDetails | null;
    subcategory: SubCategoryDetails | null;
}) => {
    const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
    
    // Format product name for SEO
    const formatProductName = (name: string) => {
        return name
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .trim();
    };

    const seoProductName = formatProductName(product.name);
    
    // Enhanced title with UAE location and brand
    const title = product.seoTitle || `${seoProductName} in UAE | HikVision Official Distributor`;
    
    // Enhanced description with UAE context
    const enhancedDescription = product.seoDescription || [
        `Buy ${seoProductName} in UAE from HikVision's official distributor.`,
        product.description,
        `Available in ${category?.name || ''} category`,
        `Type: ${subcategory?.name || ''}`,
        product.keyFeatures?.length ? `Features: ${product.keyFeatures.join(', ')}` : '',
        'Free delivery across UAE. Contact us for best prices.'
    ].filter(Boolean).join('. ');
    
    const truncatedDescription = `${enhancedDescription.substring(0, 155)}...`;

    // Enhanced keywords with UAE context
    const enhancedKeywords = [
        product.seoKeywords,
        `${seoProductName} UAE`,
        `${seoProductName} Dubai`,
        `${seoProductName} Abu Dhabi`,
        `${seoProductName} price UAE`,
        `buy ${seoProductName} UAE`,
        `HikVision ${seoProductName}`,
        `${seoProductName} distributor UAE`,
        `${seoProductName} supplier UAE`,
        `${category?.name} UAE`,
        `${subcategory?.name} UAE`,
        // Additional product name variations
        `${seoProductName} specifications`,
        `${seoProductName} features`,
        `${seoProductName} technical details`,
        `${seoProductName} installation guide`,
        `${seoProductName} user manual`,
        `${seoProductName} warranty`,
        `${seoProductName} support`,
        `${seoProductName} reviews`,
        `${seoProductName} comparison`,
        `${seoProductName} best price`,
        // Additional location-based variations
        `${seoProductName} Sharjah`,
        `${seoProductName} Ajman`,
        `${seoProductName} Ras Al Khaimah`,
        `${seoProductName} Fujairah`,
        `${seoProductName} Umm Al Quwain`,
        // Additional product variations
        `${seoProductName} original`,
        `${seoProductName} genuine`,
        `${seoProductName} authentic`,
        `${seoProductName} authorized dealer`,
        `${seoProductName} authorized distributor`,
        // Additional service-related keywords
        `${seoProductName} installation`,
        `${seoProductName} maintenance`,
        `${seoProductName} service`,
        `${seoProductName} support`,
        `${seoProductName} warranty`,
        // Additional technical keywords
        `${seoProductName} specifications`,
        `${seoProductName} datasheet`,
        `${seoProductName} manual`,
        `${seoProductName} guide`,
        `${seoProductName} documentation`
    ].filter(Boolean).join(', ');

    // Enhanced FAQ Schema with more product-specific questions
    const faqSchema = product.faqSchema ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            ...product.faqSchema.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            })),
            {
                "@type": "Question",
                "name": `Where can I buy ${seoProductName} in UAE?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `You can buy ${seoProductName} from HikVision UAE, the official distributor. We offer free delivery across UAE and competitive prices. Contact us for more information.`
                }
            },
            {
                "@type": "Question",
                "name": `What is the price of ${seoProductName} in UAE?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `For the best price on ${seoProductName} in UAE, please contact us directly. We offer competitive pricing and special deals for bulk orders.`
                }
            },
            {
                "@type": "Question",
                "name": `What are the key features of ${seoProductName}?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${seoProductName} comes with advanced features including ${product.keyFeatures?.join(', ')}. Contact us for detailed specifications.`
                }
            },
            {
                "@type": "Question",
                "name": `Is ${seoProductName} available in Dubai?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Yes, ${seoProductName} is available in Dubai and across UAE. We offer free delivery and professional installation services.`
                }
            }
        ]
    } : null;

    // Enhanced Product Schema with more details
    const productSchema: SchemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: seoProductName,
        description: enhancedDescription,
        image: images,
        brand: {
            "@type": "Brand",
            name: "HikVision"
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            price: "0",
            priceCurrency: "AED",
            priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            url: `https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`,
            seller: {
                "@type": "Organization",
                name: "HikVision UAE",
                address: {
                    "@type": "PostalAddress",
                    addressCountry: "AE",
                    addressRegion: "Dubai"
                }
            },
            areaServed: {
                "@type": "Country",
                name: "United Arab Emirates"
            }
        },
        category: `${navbarCategory?.name || ''} > ${category?.name || ''} > ${subcategory?.name || ''}`,
        additionalProperty: [
            ...(product.keyFeatures?.map(feature => ({
                "@type": "PropertyValue",
                "name": "Feature",
                "value": feature
            })) || []),
            {
                "@type": "PropertyValue",
                "name": "Location",
                "value": "UAE"
            },
            {
                "@type": "PropertyValue",
                "name": "Availability",
                "value": "In Stock"
            },
            {
                "@type": "PropertyValue",
                "name": "Brand",
                "value": "HikVision"
            },
            {
                "@type": "PropertyValue",
                "name": "Model",
                "value": seoProductName
            }
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.8",
            reviewCount: "50",
        },
        review: {
            "@type": "Review",
            reviewRating: {
                "@type": "Rating",
                ratingValue: "5",
                bestRating: "5"
            },
            author: {
                "@type": "Organization",
                name: "HikVision UAE"
            },
            publisher: {
                "@type": "Organization",
                name: "HikVision UAE"
            }
        }
    };

    // Additional Product Schema for better SEO
    const additionalProductSchema = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": seoProductName,
        "model": seoProductName,
        "brand": {
            "@type": "Brand",
            "name": "HikVision"
        },
        "manufacturer": {
            "@type": "Organization",
            "name": "HikVision"
        },
        "category": `${navbarCategory?.name || ''} > ${category?.name || ''} > ${subcategory?.name || ''}`,
        "description": enhancedDescription,
        "image": images,
        "sku": product._id,
        "mpn": product._id,
        "identifier": {
            "@type": "PropertyValue",
            "name": "Product ID",
            "value": product._id
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "AED",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@type": "Organization",
                "name": "HikVision UAE"
            }
        }
    };

    // Enhanced Local Business Schema
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "HikVision UAE",
        image: "https://hikvisionuae.ae/logo.png",
        "@id": "https://hikvisionuae.ae",
        url: "https://hikvisionuae.ae",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Dubai",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            postalCode: "",
            addressCountry: "AE"
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 25.2048,
            longitude: 55.2708
        },
        priceRange: "$$",
        openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
            ],
            opens: "09:00",
            closes: "18:00"
        },
        "sameAs": [
            "https://www.facebook.com/hikvisionuae",
            "https://www.linkedin.com/company/hikvisionuae",
            "https://twitter.com/hikvisionuae",
            "https://www.instagram.com/hikvisionuae"
        ]
    };

    // Enhanced WebPage Schema
    const additionalStructuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `${seoProductName} - HikVision UAE`,
        "description": enhancedDescription,
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://hikvisionuae.ae"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": navbarCategory?.name || "",
                    "item": `https://hikvisionuae.ae/${navbarCategory?.slug}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": category?.name || "",
                    "item": `https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}`
                },
                {
                    "@type": "ListItem",
                    "position": 4,
                    "name": subcategory?.name || "",
                    "item": `https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}`
                },
                {
                    "@type": "ListItem",
                    "position": 5,
                    "name": seoProductName,
                    "item": `https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`
                }
            ]
        },
        "mainEntity": {
            "@type": "Product",
            "name": seoProductName,
            "description": enhancedDescription,
            "image": images,
            "brand": {
                "@type": "Brand",
                "name": "HikVision"
            }
        }
    };

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={truncatedDescription} />
                <meta name="keywords" content={enhancedKeywords} />
                
                {/* Enhanced Meta Tags */}
                <meta name="geo.region" content="AE" />
                <meta name="geo.placename" content="Dubai" />
                <meta name="geo.position" content="25.2048;55.2708" />
                <meta name="ICBM" content="25.2048, 55.2708" />
                
                {/* Open Graph Tags */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={truncatedDescription} />
                <meta property="og:image" content={product.image1} />
                <meta property="og:type" content="product" />
                <meta property="og:site_name" content="HikVision UAE" />
                <meta property="og:locale" content="en_AE" />
                <meta property="product:price:amount" content="0" />
                <meta property="product:price:currency" content="AED" />
                <meta property="product:availability" content="in stock" />
                <meta property="product:condition" content="new" />
                
                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={truncatedDescription} />
                <meta name="twitter:image" content={product.image1} />
                
                {/* Product Specific Meta Tags */}
                {product.keyFeatures?.map((feature, index) => (
                    <meta key={index} property="product:feature" content={feature} />
                ))}
                
                {/* Additional Product Name Meta Tags */}
                <meta name="product:name" content={seoProductName} />
                <meta name="product:brand" content="HikVision" />
                <meta name="product:category" content={`${navbarCategory?.name} > ${category?.name} > ${subcategory?.name}`} />
                <meta name="product:model" content={seoProductName} />
                <meta name="product:sku" content={product._id} />
                
                {/* Enhanced Product Name Meta Tags */}
                <meta name="product:name:en" content={seoProductName} />
                <meta name="product:name:ar" content={seoProductName} />
                <meta name="product:model:name" content={seoProductName} />
                <meta name="product:model:number" content={product._id} />
                <meta name="product:model:type" content={subcategory?.name || ''} />
                
                {/* Additional SEO Meta Tags */}
                <meta name="robots" content="index, follow" />
                <meta name="author" content="HikVision UAE" />
                <meta name="language" content="English" />
                <meta name="revisit-after" content="7 days" />
                <meta name="generator" content="Next.js" />
                
                {/* Canonical and Alternate URLs */}
                <link rel="canonical" href={`https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`} />
                <link rel="alternate" href={`https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`} hrefLang="en-ae" />
                <link rel="alternate" href={`https://hikvisionuae.ae/ar/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`} hrefLang="ar-ae" />
                <link rel="alternate" href={`https://hikvisionuae.ae/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}/${product.slug}`} hrefLang="x-default" />
                
                {/* Structured Data */}
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
                />
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(additionalStructuredData) }}
                />
                <script 
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(additionalProductSchema) }}
                />
                {faqSchema && (
                    <script 
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />
                )}
            </Head>
        </>
    );
};

export default function ProductDetailsPage() {
    const params = useParams();
    const productSlug = params.productSlug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [navbarCategory, setNavbarCategory] = useState<NavbarCategoryDetails | null>(null);
    const [category, setCategory] = useState<CategoryDetails | null>(null);
    const [subcategory, setSubcategory] = useState<SubCategoryDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');

    useEffect(() => {
        const fetchProductAndDetails = async () => {
            try {
                // Fetch product details
                const productResponse = await fetch(`/api/products/slug/${productSlug}`);
                if (!productResponse.ok) {
                    throw new Error('Failed to fetch product');
                }
                const productData = await productResponse.json();
                setProduct(productData);
                setSelectedImage(productData.image1);

                // Fetch navbar category details using the slug from URL params
                const navbarResponse = await fetch(`/api/navbar-categories/${params.navbarCategory}`);
                if (!navbarResponse.ok) {
                    throw new Error('Failed to fetch navbar category');
                }
                const navbarData = await navbarResponse.json();
                setNavbarCategory({
                    _id: navbarData._id,
                    name: navbarData.name,
                    slug: navbarData.slug
                });

                // Fetch category details using the slug from URL params
                const categoryResponse = await fetch(`/api/categories/${params.categorySlug}`);
                if (!categoryResponse.ok) {
                    throw new Error('Failed to fetch category');
                }
                const categoryData = await categoryResponse.json();
                setCategory({
                    _id: categoryData._id,
                    name: categoryData.name,
                    slug: categoryData.slug
                });

                // Fetch subcategory details using the slug from URL params
                const subcategoryResponse = await fetch(`/api/subcategories/${params.subcategorySlug}`);
                if (!subcategoryResponse.ok) {
                    throw new Error('Failed to fetch subcategory');
                }
                const subcategoryData = await subcategoryResponse.json();
                setSubcategory({
                    _id: subcategoryData._id,
                    name: subcategoryData.name,
                    slug: subcategoryData.slug
                });

            } catch (error) {
                console.error('Error fetching details:', error);
                setError(error instanceof Error ? error.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (productSlug && params.navbarCategory && params.categorySlug && params.subcategorySlug) {
            fetchProductAndDetails();
        }
    }, [productSlug, params.navbarCategory, params.categorySlug, params.subcategorySlug]);

    console.log('State values:', {
        navbarCategory,
        category,
        subcategory,
        product
    });

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-red-600">Error: {error || 'Product not found'}</div>
                </div>
                <Footer />
            </div>
        );
    }

    const breadcrumbProps: BreadcrumbProps = {
        navbarCategory: navbarCategory && {
            name: navbarCategory.name,
            slug: navbarCategory.slug
        },
        category: category && {
            name: category.name,
            slug: category.slug
        },
        subcategory: subcategory && {
            name: subcategory.name,
            slug: subcategory.slug
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
            {product && (
                <ProductSEO 
                    product={product} 
                    navbarCategory={navbarCategory}
                    category={category}
                    subcategory={subcategory}
                />
            )}
            <Navbar />
            <Breadcrumb {...breadcrumbProps} productName={product.name} />
            <div className="py-4 px-2 sm:py-8 sm:px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            {/* Image Gallery Section - Enhanced */}
                            <div className="p-4 sm:p-6 bg-gray-50">
                                <div className="relative h-72 sm:h-[400px] rounded-xl overflow-hidden border border-gray-100 shadow-lg bg-white group flex items-center justify-center">
                                    <img
                                        src={selectedImage}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4 sm:p-4 transition-all duration-500 transform hover:scale-105"
                                    />
                                    {/* Slider Navigation Arrows - visible on both mobile and desktop */}
                                    <div className="flex absolute inset-0 items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => {
                                                const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
                                                const currentIndex = images.indexOf(selectedImage);
                                                const prevIndex = (currentIndex - 1 + images.length) % images.length;
                                                setSelectedImage(images[prevIndex]);
                                            }}
                                            className="p-2 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all text-gray-800 hover:text-red-600"
                                        >
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => {
                                                const images = [product.image1, product.image2, product.image3, product.image4].filter(Boolean);
                                                const currentIndex = images.indexOf(selectedImage);
                                                const nextIndex = (currentIndex + 1) % images.length;
                                                setSelectedImage(images[nextIndex]);
                                            }}
                                            className="p-2 rounded-full bg-white/90 shadow-md hover:shadow-lg transition-all text-gray-800 hover:text-red-600"
                                        >
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
                                    <button
                                        onClick={() => setSelectedImage(product.image1)}
                                        className={`relative h-16 sm:h-24 rounded-lg overflow-hidden border transition-all duration-300 
                                            ${selectedImage === product.image1
                                                ? 'ring-2 ring-red-500 shadow-lg scale-105 border-red-500'
                                                : 'hover:ring-2 hover:ring-red-300 hover:scale-105 border-gray-200 hover:border-red-300'} 
                                            bg-white p-2 sm:p-2`}
                                    >
                                        <img
                                            src={product.image1}
                                            alt={`${product.name} 1`}
                                            className="w-full h-full object-contain hover:opacity-90 transition-opacity"
                                        />
                                    </button>
                                    {product.image2 && (
                                        <button
                                            onClick={() => setSelectedImage(product.image2)}
                                            className={`relative h-16 sm:h-24 rounded-lg overflow-hidden border transition-all duration-300 
                                                ${selectedImage === product.image2
                                                    ? 'ring-2 ring-red-500 shadow-lg scale-105 border-red-500'
                                                    : 'hover:ring-2 hover:ring-red-300 hover:scale-105 border-gray-200 hover:border-red-300'} 
                                                bg-white p-2 sm:p-2`}
                                        >
                                            <img
                                                src={product.image2}
                                                alt={`${product.name} 2`}
                                                className="w-full h-full object-contain hover:opacity-90 transition-opacity"
                                            />
                                        </button>
                                    )}
                                    {product.image3 && (
                                        <button
                                            onClick={() => setSelectedImage(product.image3)}
                                            className={`relative h-16 sm:h-24 rounded-lg overflow-hidden border transition-all duration-300 
                                                ${selectedImage === product.image3
                                                    ? 'ring-2 ring-red-500 shadow-lg scale-105 border-red-500'
                                                    : 'hover:ring-2 hover:ring-red-300 hover:scale-105 border-gray-200 hover:border-red-300'} 
                                                bg-white p-2 sm:p-2`}
                                        >
                                            <img
                                                src={product.image3}
                                                alt={`${product.name} 3`}
                                                className="w-full h-full object-contain hover:opacity-90 transition-opacity"
                                            />
                                        </button>
                                    )}
                                    {product.image4 && (
                                        <button
                                            onClick={() => setSelectedImage(product.image4)}
                                            className={`relative h-16 sm:h-24 rounded-lg overflow-hidden border transition-all duration-300 
                                                ${selectedImage === product.image4
                                                    ? 'ring-2 ring-red-500 shadow-lg scale-105 border-red-500'
                                                    : 'hover:ring-2 hover:ring-red-300 hover:scale-105 border-gray-200 hover:border-red-300'} 
                                                bg-white p-2 sm:p-2`}
                                        >
                                            <img
                                                src={product.image4}
                                                alt={`${product.name} 4`}
                                                className="w-full h-full object-contain hover:opacity-90 transition-opacity"
                                            />
                                        </button>
                                    )}
                                </div>
                            </div>
                            {/* Product Details Section */}
                            <div className="p-2 sm:p-6 lg:p-8">
                                <div className="space-y-4 sm:space-y-6">
                                    <div>
                                        <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 break-words">{product.name}</h1>
                                        <p className="text-base sm:text-base text-gray-600 leading-relaxed">{product.description}</p>
                                    </div>
                                    <div className="space-y-2 sm:space-y-4 py-3 sm:py-6 border-y border-gray-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                            <span className="text-sm sm:text-sm font-medium text-gray-500 w-28">Navbar Category:</span>
                                            <Link
                                                href={`/${navbarCategory?.slug}`}
                                                className="text-sm sm:text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                                            >
                                                {navbarCategory?.name || 'Loading...'}
                                            </Link>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                            <span className="text-sm sm:text-sm font-medium text-gray-500 w-28">Category:</span>
                                            <Link
                                                href={`/${navbarCategory?.slug}/${category?.slug}`}
                                                className="text-sm sm:text-sm text-emerald-600 hover:text-emerald-700 transition-colors"
                                            >
                                                {category?.name || 'Loading...'}
                                            </Link>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                                            <span className="text-sm sm:text-sm font-medium text-gray-500 w-28">Sub Category:</span>
                                            <Link
                                                href={`/${navbarCategory?.slug}/${category?.slug}/${subcategory?.slug}`}
                                                className="text-sm sm:text-sm text-amber-600 hover:text-amber-700 transition-colors"
                                            >
                                                {subcategory?.name || 'Loading...'}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="pt-3 sm:pt-4">
                                        <Link
                                            href="/Contact"
                                            className="group relative w-full inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-red-600 text-white text-base sm:text-base font-medium rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            <svg
                                                className="w-5 h-5 sm:w-5 sm:h-5 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Contact Us About This Product
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Key Features Card */}
                    {product.keyFeatures && product.keyFeatures.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-3 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Key Features</h2>
                            <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                                {product.keyFeatures.map((feature, index) => (
                                    <li key={index} className="text-gray-600 text-base sm:text-base">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}