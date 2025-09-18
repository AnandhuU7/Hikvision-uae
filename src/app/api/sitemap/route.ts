import { NextResponse } from 'next/server';

// Function to get all products from the database
async function getAllProducts() {
    try {
        console.log('Fetching products from:', `${process.env.NEXT_PUBLIC_API_URL}/api/products`);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: 'no-store', // Ensure fresh data
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        
        if (!response.ok) {
            console.error('Failed to fetch products:', response.status, response.statusText);
            throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        console.log('Products fetched successfully. Count:', data.length);
        
        // Log sample product data
        if (data.length > 0) {
            console.log('Sample product:', {
                name: data[0].name,
                slug: data[0].slug,
                subcategory: data[0].subcategory,
                category: data[0].category,
                navbarCategory: data[0].navbarCategory
            });
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to get all categories from the database
async function getAllCategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: 'no-store' // Ensure fresh data
        });
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Function to get all subcategories from the database
async function getAllSubcategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcategories`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: 'no-store' // Ensure fresh data
        });
        if (!response.ok) throw new Error('Failed to fetch subcategories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        return [];
    }
}

// Function to get all navbar categories from the database
async function getAllNavbarCategories() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/navbar-categories`, {
            next: { revalidate: 3600 }, // Cache for 1 hour
            cache: 'no-store' // Ensure fresh data
        });
        if (!response.ok) throw new Error('Failed to fetch navbar categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching navbar categories:', error);
        return [];
    }
}

// Function to generate sitemap XML
function generateSitemapXml(urls: Array<{ loc: string; changefreq: string; priority: number }>) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
    return xml;
}

// Function to validate URL
function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Configure the route to be statically generated with ISR
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
    try {
        // Log environment variables
        console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
        
        // Fetch all data
        console.log('Starting to fetch all data...');
        const [products, categories, subcategories, navbarCategories] = await Promise.all([
            getAllProducts(),
            getAllCategories(),
            getAllSubcategories(),
            getAllNavbarCategories()
        ]);

        // Log raw data counts
        console.log('Raw data received:', {
            productsCount: products.length,
            categoriesCount: categories.length,
            subcategoriesCount: subcategories.length,
            navbarCategoriesCount: navbarCategories.length
        });

        // Static URLs
        const staticUrls = [
            { loc: 'https://hikvisionuae.ae', changefreq: 'daily', priority: 1.0 },
            { loc: 'https://hikvisionuae.ae/About', changefreq: 'monthly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Contact', changefreq: 'monthly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Acusense', changefreq: 'weekly', priority: 0.9 },
            { loc: 'https://hikvisionuae.ae/Colorvu', changefreq: 'weekly', priority: 0.9 },
            { loc: 'https://hikvisionuae.ae/Darkfighter', changefreq: 'weekly', priority: 0.9 },
            { loc: 'https://hikvisionuae.ae/Tandemvu', changefreq: 'weekly', priority: 0.9 },
            { loc: 'https://hikvisionuae.ae/Manufacturing', changefreq: 'weekly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Healthcare', changefreq: 'weekly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Retail', changefreq: 'weekly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Education', changefreq: 'weekly', priority: 0.8 },
            { loc: 'https://hikvisionuae.ae/Privacy', changefreq: 'monthly', priority: 0.5 },
            { loc: 'https://hikvisionuae.ae/Terms', changefreq: 'monthly', priority: 0.5 },
            { loc: 'https://hikvisionuae.ae/Cookies', changefreq: 'monthly', priority: 0.5 }
        ];

        // Dynamic URLs from navbar categories
        const navbarCategoryUrls = navbarCategories
            .filter((category: any) => category?.slug)
            .map((category: any) => ({
                loc: `https://hikvisionuae.ae/${category.slug}`,
                changefreq: 'weekly',
                priority: 0.9
            }));

        // Dynamic URLs from categories
        const categoryUrls = categories
            .filter((category: any) => category?.slug)
            .map((category: any) => {
                const navbarCategory = navbarCategories.find((nc: any) => nc._id === category.navbarCategory);
                if (!navbarCategory?.slug) return null;
                return {
                    loc: `https://hikvisionuae.ae/${navbarCategory.slug}/${category.slug}`,
                    changefreq: 'weekly',
                    priority: 0.8
                };
            })
            .filter(Boolean);

        // Dynamic URLs from subcategories
        const subcategoryUrls = subcategories
            .filter((subcategory: any) => subcategory?.slug)
            .map((subcategory: any) => {
                const category = categories.find((c: any) => c._id === subcategory.category);
                if (!category?.slug) return null;
                const navbarCategory = navbarCategories.find((nc: any) => nc._id === category.navbarCategory);
                if (!navbarCategory?.slug) return null;
                return {
                    loc: `https://hikvisionuae.ae/${navbarCategory.slug}/${category.slug}/${subcategory.slug}`,
                    changefreq: 'weekly',
                    priority: 0.7
                };
            })
            .filter(Boolean);

        // Log sample data for debugging
        if (products.length > 0) {
            const sampleProduct = products[0];
            console.log('Sample product data:', {
                name: sampleProduct.name,
                slug: sampleProduct.slug,
                subcategory: sampleProduct.subcategory,
                category: sampleProduct.category,
                navbarCategory: sampleProduct.navbarCategory
            });

            // Log the relationships
            const sampleSubcategory = subcategories.find((sc: { _id: string; category: string }) => sc._id === sampleProduct.subcategory);
            const sampleCategory = categories.find((c: { _id: string; navbarCategory: string }) => c._id === sampleSubcategory?.category);
            const sampleNavbarCategory = navbarCategories.find((nc: { _id: string }) => nc._id === sampleCategory?.navbarCategory);

            console.log('Sample relationships:', {
                subcategory: sampleSubcategory ? {
                    name: sampleSubcategory.name,
                    slug: sampleSubcategory.slug,
                    category: sampleSubcategory.category
                } : 'Not found',
                category: sampleCategory ? {
                    name: sampleCategory.name,
                    slug: sampleCategory.slug,
                    navbarCategory: sampleCategory.navbarCategory
                } : 'Not found',
                navbarCategory: sampleNavbarCategory ? {
                    name: sampleNavbarCategory.name,
                    slug: sampleNavbarCategory.slug
                } : 'Not found'
            });
        }

        // Dynamic URLs from products
        console.log('Starting product URL generation with products:', products.length);
        const productUrls = products
            .filter((product: any) => {
                if (!product) {
                    console.log('Null or undefined product found');
                    return false;
                }
                
                // Generate slug if not present
                if (!product.slug) {
                    product.slug = product.name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '');
                    console.log('Generated slug for product:', product.name, '->', product.slug);
                }
                
                if (!product.subcategory) {
                    console.log('Product missing subcategory:', product.name);
                    return false;
                }
                
                return true;
            })
            .map((product: any) => {
                try {
                    console.log('\nProcessing product:', product.name);
                    
                    // Find subcategory
                    const subcategory = subcategories.find((sc: any) => sc._id === product.subcategory);
                    if (!subcategory) {
                        console.log('Subcategory not found for product:', product.name, 'subcategory ID:', product.subcategory);
                        return null;
                    }

                    // Find category
                    const category = categories.find((c: any) => c._id === subcategory.category);
                    if (!category) {
                        console.log('Category not found for subcategory:', subcategory.name, 'category ID:', subcategory.category);
                        return null;
                    }

                    // Find navbar category
                    const navbarCategory = navbarCategories.find((nc: any) => nc._id === category.navbarCategory);
                    if (!navbarCategory) {
                        console.log('Navbar category not found for category:', category.name, 'navbarCategory ID:', category.navbarCategory);
                        return null;
                    }

                    // Clean and format slugs
                    const cleanNavbarSlug = navbarCategory.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    const cleanCategorySlug = category.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    const cleanSubcategorySlug = subcategory.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    const cleanProductSlug = product.slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

                    // Generate base product URL with proper formatting
                    const baseUrl = `https://hikvisionuae.ae/${cleanNavbarSlug}/${cleanCategorySlug}/${cleanSubcategorySlug}/${cleanProductSlug}`;
                    
                    // Create array of URLs for this product
                    const urls = [{
                        loc: baseUrl,
                        changefreq: 'weekly',
                        priority: 0.7
                    }];

                    // Log the generated URLs for debugging
                    console.log('Generated URL for product:', product.name, '->', baseUrl);

                    return urls;
                } catch (error) {
                    console.error('Error generating URL for product:', product.name, error);
                    return null;
                }
            })
            .filter(Boolean)
            .flat(); // Flatten the array of URL arrays

        console.log('\nGenerated product URLs:', productUrls.length);
        if (productUrls.length > 0) {
            console.log('Sample product URLs:', productUrls.slice(0, 3));
        }

        // Combine all URLs and filter out invalid ones
        const allUrls = [
            ...staticUrls,
            ...navbarCategoryUrls,
            ...categoryUrls,
            ...subcategoryUrls,
            ...productUrls
        ].filter(url => {
            const isValid = isValidUrl(url.loc);
            if (!isValid) {
                console.log('Invalid URL removed:', url.loc);
            }
            return isValid;
        });

        // Log the total number of URLs
        console.log('\nTotal URLs in sitemap:', allUrls.length);
        console.log('URLs by type:', {
            static: staticUrls.length,
            navbarCategory: navbarCategoryUrls.length,
            category: categoryUrls.length,
            subcategory: subcategoryUrls.length,
            product: productUrls.length
        });

        // Generate the sitemap XML
        const sitemapXml = generateSitemapXml(allUrls);

        // Log the final sitemap content
        console.log('\nSitemap XML generated with', allUrls.length, 'URLs');
        console.log('Sample sitemap content:', sitemapXml.substring(0, 500) + '...');

        // Return the sitemap with proper headers for ISR and hosting
        return new NextResponse(sitemapXml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'Surrogate-Key': 'sitemap',
                'Surrogate-Control': 'public, max-age=3600, stale-while-revalidate=86400',
                'X-Robots-Tag': 'noindex',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Error generating sitemap:', error);
        return new NextResponse('Error generating sitemap', { 
            status: 500,
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'no-store'
            }
        });
    }
} 