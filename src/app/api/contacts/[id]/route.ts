import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Contact from '@/app/models/Contact';
import { adminAuthMiddleware, AuthenticatedRequest } from '../../middleware/adminAuth';

// Protected methods (auth required)
export const GET = adminAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const contact = await Contact.findById(params.id);
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contact' },
      { status: 500 }
    );
  }
});

export const PATCH = adminAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const data = await request.json();
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      { status: data.status },
      { new: true }
    );
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact status' },
      { status: 500 }
    );
  }
});

export const PUT = adminAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const data = await request.json();
    const contact = await Contact.findByIdAndUpdate(
      params.id,
      data,
      { new: true }
    );
    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    );
  }
});

export const DELETE = adminAuthMiddleware(async (
  request: AuthenticatedRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectDB();
    const contact = await Contact.findByIdAndDelete(params.id);
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    );
  }
}); 