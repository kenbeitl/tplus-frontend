import axios, { AxiosInstance } from 'axios';

// Create axios instance for Keycloak API
const keycloakApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KEYCLOAK_API_URL || 'https://portal.tplus.ai/backend-api-service',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - automatically adds Authorization header if accessToken is provided
keycloakApi.interceptors.request.use(
  (config) => {
    // If accessToken is provided in custom config, add Authorization header
    if (config.headers && (config as any).accessToken) {
      config.headers.Authorization = `Bearer ${(config as any).accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
keycloakApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Handle specific error codes
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('Unauthorized - Invalid or expired token');
          break;
        case 403:
          console.error('Forbidden - Insufficient permissions');
          break;
        case 404:
          console.error('Not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('API error:', data?.message || error.message);
      }
    }
    return Promise.reject(error);
  }
);

// Keycloak API service methods
export const keycloakApiService = {
  /**
   * Reset user password (sends reset email or initiates reset process)
   * @param accessToken - User's access token
   */
  resetPassword: async (
    accessToken: string
  ): Promise<{ message: string }> => {
    const response = await keycloakApi.post(
      '/api/general/users/change-password',
      {},
      { accessToken } as any
    );
    return response.data;
  },

  /**
   * Update user profile
   * @param accessToken - User's access token
   * @param data - User profile data (firstName, lastName, email)
   */
  updateUserProfile: async (
    accessToken: string,
    data: { email: string; firstName: string; lastName: string; companyName: string; }
  ): Promise<{ message: string }> => {
    const response = await keycloakApi.put(
      '/api/general/users/update-user-profile',
      data,
      { accessToken } as any
    );
    return response.data;
  },
};

export default keycloakApi;
