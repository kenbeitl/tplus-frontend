import { NextRequest, NextResponse } from 'next/server';
import { checkUserExists } from '@/lib/keycloak-admin';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const username = searchParams.get('username');
        const email = searchParams.get('email');

        if (!username && !email) {
            return NextResponse.json(
                { error: 'Either username or email is required' },
                { status: 400 }
            );
        }

        const result = username 
            ? await checkUserExists(username, 'username')
            : await checkUserExists(email!, 'email');

        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { exists: result.exists },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Check user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
