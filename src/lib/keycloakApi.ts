/**
 * Generic Keycloak API client
 * Calls Next.js API routes under /api/keycloak/*
 * No need to add methods here - just create the API route and call it directly
 */

interface KeycloakApiOptions<T = any> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T;
}

type userRoles = "Admin" | "General";

/**
 * Internal generic function to call Keycloak API endpoints
 * Not exported - use keycloakApiService methods instead for better type safety
 * @param endpoint - The endpoint path (e.g., '/reset-password', '/update-profile')
 * @param options - Request options (method, body)
 * @returns Response data
 */
async function callKeycloakApi<TResponse = any, TBody = any>(
  endpoint: string,
  options: KeycloakApiOptions<TBody> = {}
): Promise<TResponse> {
  const { method = 'GET', body } = options;

  // Remove leading slash if provided
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(`/api/keycloak/${cleanEndpoint}`, fetchOptions);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Failed to ${method} ${endpoint}`);
  }

  return response.json();
}

/**
 * Keycloak API service methods
 * Use these typed methods instead of calling API routes directly
 */
export const keycloakApiService = {
  resetPassword: () => callKeycloakApi('/reset-password', { method: 'POST' }),
  
  updateUserProfile: (data: { 
    email: string; 
    firstName: string; 
    lastName: string; 
    companyName: string;
    userRole: string;
  }) => callKeycloakApi('/update-profile', { method: 'PUT', body: data }),
  
  refreshUser: () => callKeycloakApi('/refresh-user', { method: 'GET' }),

  updateCompanyProfile: (data: {
    id: string;
    name: string;
    attributes: {
      name: string[];
      relatedIndustries: string[];
      addressBlkBldg: string[];
      addressStreet: string[];
      addressDistrict: string[];
      addressCity: string[];
      websiteURL: string[];
      cetsID: string[];
      numOfEmployeeInHK: string[];
    };
  }) => callKeycloakApi('/update-company-profile', { method: 'PUT', body: data }),

  getAllUsers: () => callKeycloakApi('/get-all-users', { method: 'GET' }),

  createUser: (data: {
    email: string, 
    userRole: userRoles
  }) => callKeycloakApi('/create-user', { method: 'POST', body: data })
};
