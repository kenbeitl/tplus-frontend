import KcAdminClient from '@keycloak/keycloak-admin-client';

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName?: string;
    cetsId?: string;
}

export async function createKeycloakUser(userData: CreateUserData) {
    const kcAdminClient = new KcAdminClient({
        baseUrl: process.env.KEYCLOAK_ISSUER?.replace('/realms/' + process.env.KEYCLOAK_REALM, ''),
        realmName: process.env.KEYCLOAK_REALM || 'master',
    });

    try {
        // Authenticate with admin credentials
        await kcAdminClient.auth({
            grantType: 'client_credentials',
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
        });

        // Create user
        const user = await kcAdminClient.users.create({
            realm: process.env.KEYCLOAK_REALM,
            username: userData.email,
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            enabled: true,
            emailVerified: false,
            attributes: {
                companyName: userData.companyName || '',
                cetsId: userData.cetsId || '',
            },
        });

        // Set password
        if (user.id) {
            await kcAdminClient.users.resetPassword({
                id: user.id,
                credential: {
                    temporary: false,
                    type: 'password',
                    value: userData.password,
                },
            });
        }

        return { success: true, userId: user.id };
    } catch (error: any) {
        console.error('Error creating user:', error);
        return { 
            success: false, 
            error: error.response?.data?.errorMessage || error.message || 'Failed to create user' 
        };
    }
}
