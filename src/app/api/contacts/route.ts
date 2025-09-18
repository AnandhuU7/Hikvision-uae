import { NextResponse } from 'next/server';
import connectDB from '@/app/config/db';
import Contact from '@/app/models/Contact';
import { adminAuthMiddleware, AuthenticatedRequest } from '../middleware/adminAuth';

// Public method (no auth required)
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    const contact = await Contact.create(data);
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    );
  }
}

// Protected methods (auth required)
export const GET = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  try {
    await connectDB();
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
});

export const PUT = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
});

export const DELETE = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
});

export const PATCH = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}); 