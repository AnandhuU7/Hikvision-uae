import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import NavbarCategory from '@/app/models/NavbarCategory';
import { publicAuthMiddleware, AuthenticatedRequest } from '../../middleware/publicAuth';

// GET single category
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        // Try to find by slug first, then by ID if not found
        let category = await NavbarCategory.findOne({ slug: params.id });
        
        if (!category) {
            // If not found by slug, try finding by ID
            category = await NavbarCategory.findById(params.id);
        }
        
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        
        return NextResponse.json(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return NextResponse.json({ error: 'Failed to fetch category' }, { status: 500 });
    }
}

// PUT update category
export const PUT = publicAuthMiddleware(async (
    request: AuthenticatedRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();
        const body = await request.json();
        
        // Create slug from name if name is being updated
        if (body.name) {
            body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        
        const category = await NavbarCategory.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true, runValidators: true }
        );
        
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        
        return NextResponse.json(category);
    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({ error: 'Category name already exists' }, { status: 400 });
        }
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
});

// DELETE category
export const DELETE = publicAuthMiddleware(async (
    request: AuthenticatedRequest,
    { params }: { params: { id: string } }
) => {
    try {
        await connectDB();
        const category = await NavbarCategory.findByIdAndDelete(params.id);
        
        if (!category) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }
        
        // Reorder remaining categories
        await NavbarCategory.updateMany(
            { order: { $gt: category.order } },
            { $inc: { order: -1 } }
        );
        
        return NextResponse.json({ message: 'Category deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
    }
}); 