import { apiService } from '@/lib/api';

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

// Auth service
export const authService = {
  // Login
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiService.post<LoginResponse>('/auth/login', credentials);
  },

  // Logout
  logout: async (): Promise<void> => {
    return apiService.post<void>('/auth/logout');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    return apiService.get<User>('/auth/me');
  },

  // Refresh token
  refreshToken: async (): Promise<{ token: string }> => {
    return apiService.post<{ token: string }>('/auth/refresh');
  },
};
