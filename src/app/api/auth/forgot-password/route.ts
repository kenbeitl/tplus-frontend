import { NextRequest, NextResponse } from 'next/server';
import { sendPasswordResetEmail } from '@/lib/keycloak-admin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID or email is required' },
                { status: 400 }
            );
        }

        const result = await sendPasswordResetEmail(userId);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error || 'Failed to send password reset email' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'Password reset email sent successfully' 
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
