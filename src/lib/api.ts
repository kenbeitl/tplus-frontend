import axiosInstance from '@/lib/axios';
import { AxiosResponse } from 'axios';

// Generic API response type
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Base API service class
class ApiService {
  // GET request
  async get<T = any>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.get(url, { params });
    return response.data.data;
  }

  // POST request
  async post<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.post(url, data);
    return response.data.data;
  }

  // PUT request
  async put<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.put(url, data);
    return response.data.data;
  }

  // PATCH request
  async patch<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.patch(url, data);
    return response.data.data;
  }

  // DELETE request
  async delete<T = any>(url: string): Promise<T> {
    const response: AxiosResponse<ApiResponse<T>> = await axiosInstance.delete(url);
    return response.data.data;
  }
}

export const apiService = new ApiService();
