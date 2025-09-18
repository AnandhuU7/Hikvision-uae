import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Get the auth token from cookies
    const authToken = request.cookies.get('auth-token');

    // If there's no auth token, redirect to login
    if (!authToken) {
      const loginUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure the paths that should be matched by the middleware
export const config = {
  matcher: '/admin/:path*'
}; 