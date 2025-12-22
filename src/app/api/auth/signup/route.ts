import { NextRequest, NextResponse } from 'next/server';
import { createKeycloakUser } from '@/lib/keycloak-admin';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { firstName, lastName, email, username, password, companyName, cetsID } = body;

        // Validate required fields
        if (!firstName || !lastName || !email || !username || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create user in Keycloak
        const result = await createKeycloakUser({
            firstName,
            lastName,
            email,
            username,
            password,
            companyName,
            cetsID,
        });

        if (!result.success) {
            return NextResponse.json(
                { error: result.error },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { 
                success: true, 
                message: 'User created successfully',
                userId: result.userId 
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
