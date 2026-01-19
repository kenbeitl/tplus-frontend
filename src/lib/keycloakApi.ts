/**
 * Generic Keycloak API client
 * Calls Next.js API routes under /api/keycloak/*
 * No need to add methods here - just create the API route and call it directly
 */

interface KeycloakApiOptions<T = any> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T;
}

/**
 * Generic function to call any Keycloak API endpoint
 * @param endpoint - The endpoint path (e.g., '/reset-password', '/update-profile')
 * @param options - Request options (method, body)
 * @returns Response data
 * 
 * @example
 * // Simple POST
 * await callKeycloakApi('/reset-password', { method: 'POST' });
 * 
 * // PUT with body
 * await callKeycloakApi('/update-profile', {
 *   method: 'PUT',
 *   body: { email, firstName, lastName }
 * });
 * 
 * // GET request
 * await callKeycloakApi('/user-details', { method: 'GET' });
 */
export async function callKeycloakApi<TResponse = any, TBody = any>(
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
 * Legacy service methods - kept for backward compatibility
 * New code should use callKeycloakApi() directly
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
};
