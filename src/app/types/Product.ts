export interface Product {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image1: string;
    image2?: string;
    image3?: string;
    image4?: string;
    navbarCategory: {
        _id: string;
        name: string;
    };
    category: {
        _id: string;
        name: string;
    };
    subcategory?: {
        _id: string;
        name: string;
    };
    createdAt: string;
    seoKeywords?: string; // Added for SEO optimization
}