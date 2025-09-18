import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin@hikvisionuae' // You should change this to your desired password
};

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Check credentials against hardcoded values
        if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
            return NextResponse.json(
                { message: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { username: ADMIN_CREDENTIALS.username },
            process.env.JWT_SECRET || 'fallback-secret',
            { expiresIn: '1d' }
        );

        // Create response with token in cookie
        const response = NextResponse.json(
            { message: 'Login successful' },
            { status: 200 }
        );

        // Set HTTP-only cookie
        response.cookies.set({
            name: 'auth-token',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 // 1 day
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}

// Method not allowed for other HTTP methods
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
} 