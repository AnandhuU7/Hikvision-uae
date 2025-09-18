import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { adminAuthMiddleware, AuthenticatedRequest } from '../../middleware/adminAuth';

export const GET = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { message: 'No token provided' },
                { status: 401 }
            );
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { username: string };
        
        // If token is valid, return success
        if (decoded.username === 'admin') {
            return NextResponse.json({ username: 'admin' });
        }

        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json(
            { message: 'Invalid token' },
            { status: 401 }
        );
    }
});

// Method not allowed for other HTTP methods
export const POST = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
});

export const PUT = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
});

export const DELETE = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
});

export const PATCH = adminAuthMiddleware(async (request: AuthenticatedRequest) => {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}); 