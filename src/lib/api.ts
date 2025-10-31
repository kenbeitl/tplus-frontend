import axiosInstance from '@/lib/axios';
import { AxiosResponse } from 'axios';

// Strapi API response type
export interface StrapiResponse<T = any> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Legacy API response type (for backwards compatibility)
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Base API service class
class ApiService {
  // GET request
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.get(url, { params });
    return response.data.data;
  }

  // POST request
  async post<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.post(url, data);
    return response.data.data;
  }

  // PUT request
  async put<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.put(url, data);
    return response.data.data;
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.patch(url, data);
    return response.data.data;
  }

  // DELETE request
  async delete<T = any>(url: string): Promise<T> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.delete(url);
    return response.data.data;
  }

  // GET with full Strapi response (including meta)
  async getWithMeta<T = any>(url: string, params?: any): Promise<StrapiResponse<T>> {
    const response: AxiosResponse<StrapiResponse<T>> = await axiosInstance.get(url, { params });
    return response.data;
  }
}

export const apiService = new ApiService();
