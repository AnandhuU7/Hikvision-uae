import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import NavbarCategory from '@/app/models/NavbarCategory';
import Category from '@/app/models/Category';
import SubCategory from '@/app/models/SubCategory';
import Product from '@/app/models/Product';

function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    if (!q) {
      return NextResponse.json({ categories: [], subcategories: [], products: [] });
    }

    await connectDB();

    const regex = new RegExp(escapeRegex(q), 'i');

    const [categories, subcategories, products] = await Promise.all([
      Category.find({ $or: [{ name: regex }, { slug: regex }] })
        .limit(10)
        .populate('navbarCategory', 'slug name')
        .lean(),
      SubCategory.find({ $or: [{ name: regex }, { slug: regex }] })
        .limit(10)
        .populate({ path: 'category', select: 'slug name navbarCategory', populate: { path: 'navbarCategory', select: 'slug name' } })
        .lean(),
      Product.find({ $or: [{ name: regex }, { slug: regex }, { description: regex }] })
        .limit(15)
        .populate('navbarCategory', 'slug name')
        .populate('category', 'slug name')
        .populate('subcategory', 'slug name')
        .lean(),
    ]);

    const categoryResults = (categories || []).map((c: any) => ({
      _id: c._id,
      type: 'category',
      name: c.name,
      slug: c.slug,
      navbarCategory: c.navbarCategory?.slug,
      url: c.navbarCategory?.slug ? `/${c.navbarCategory.slug}/${c.slug}` : `/${c.slug}`,
    }));

    const subcategoryResults = (subcategories || []).map((s: any) => ({
      _id: s._id,
      type: 'subcategory',
      name: s.name,
      slug: s.slug,
      navbarCategory: s.category?.navbarCategory?.slug,
      category: s.category?.slug,
      url: s.category?.navbarCategory?.slug && s.category?.slug ? `/${s.category.navbarCategory.slug}/${s.category.slug}/${s.slug}` : `/${s.slug}`,
    }));

    const productResults = (products || []).map((p: any) => ({
      _id: p._id,
      type: 'product',
      name: p.name,
      slug: p.slug,
      navbarCategory: p.navbarCategory?.slug,
      category: p.category?.slug,
      subcategory: p.subcategory?.slug,
      url: p.navbarCategory?.slug && p.category?.slug && p.subcategory?.slug ? `/${p.navbarCategory.slug}/${p.category.slug}/${p.subcategory.slug}/${p.slug}` : `/${p.slug}`,
    }));

    return NextResponse.json({
      categories: categoryResults,
      subcategories: subcategoryResults,
      products: productResults,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


