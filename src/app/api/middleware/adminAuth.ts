import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextRequest {
  admin?: {
    username: string;
  };
}

export function adminAuthMiddleware<T extends any[]>(
  handler: (request: AuthenticatedRequest, ...args: T) => Promise<NextResponse>
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Get the auth token from cookies
      const authToken = request.cookies.get('auth-token')?.value;

      if (!authToken) {
        return NextResponse.json(
          { message: 'Authentication required' },
          { status: 401 }
        );
      }

      // Verify the JWT token
      const decoded = jwt.verify(
        authToken, 
        process.env.JWT_SECRET || 'fallback-secret'
      ) as { username: string };

      // Check if the user is admin
      if (decoded.username !== 'admin') {
        return NextResponse.json(
          { message: 'Admin access required' },
          { status: 403 }
        );
      }

      // Add admin info to request object
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.admin = {
        username: decoded.username
      };

      // Call the original handler
      return await handler(authenticatedRequest, ...args);
    } catch (error) {
      console.error('Admin auth middleware error:', error);
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }
  };
} 