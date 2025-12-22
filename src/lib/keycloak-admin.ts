import KcAdminClient from '@keycloak/keycloak-admin-client';

export interface CreateUserData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyName?: string;
    cetsID?: string;
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
                cetsID: userData.cetsID || '',
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

export async function checkUserExists(
    value: string, 
    type: 'username' | 'email'
): Promise<{ exists: boolean; error?: string }> {
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

        // Search for user by username or email
        const searchParams: any = {
            realm: process.env.KEYCLOAK_REALM,
            exact: true,
        };

        if (type === 'username') {
            searchParams.username = value;
        } else {
            searchParams.email = value;
        }

        const users = await kcAdminClient.users.find(searchParams);

        return { exists: users.length > 0 };
    } catch (error: any) {
        console.error(`Error checking ${type}:`, error);
        return { 
            exists: false, 
            error: error.response?.data?.errorMessage || error.message || `Failed to check ${type}` 
        };
    }
}