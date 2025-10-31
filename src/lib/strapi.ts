import axiosInstance from '@/lib/axios';
import { AxiosResponse } from 'axios';

// Strapi specific types
export interface StrapiEntity {
  id: number;
  attributes: Record<string, any>;
  meta?: Record<string, any>;
}

export interface StrapiCollectionResponse<T = any> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T = any> {
  data: T;
  meta?: Record<string, any>;
}

// Strapi-specific service
class StrapiService {
  // Get collection with pagination
  async getCollection<T = any>(
    contentType: string, 
    params?: {
      page?: number;
      pageSize?: number;
      sort?: string;
      filters?: Record<string, any>;
      populate?: string | string[] | Record<string, any>;
    }
  ): Promise<StrapiCollectionResponse<T>> {
    const response: AxiosResponse<StrapiCollectionResponse<T>> = await axiosInstance.get(
      `/${contentType}`, 
      { params }
    );
    return response.data;
  }

  // Get collection by full URL (for custom query strings)
  async getCollectionByUrl<T = any>(url: string): Promise<StrapiCollectionResponse<T>> {
    const response: AxiosResponse<StrapiCollectionResponse<T>> = await axiosInstance.get(url);
    return response.data;
  }

  // Get single entity by ID
  async getById<T = any>(
    contentType: string, 
    id: string | number,
    params?: {
      populate?: string | string[];
    }
  ): Promise<T> {
    const response: AxiosResponse<StrapiSingleResponse<T>> = await axiosInstance.get(
      `/${contentType}/${id}`,
      { params }
    );
    return response.data.data;
  }

  // Create new entity
  async create<T = any>(contentType: string, data: any): Promise<T> {
    const response: AxiosResponse<StrapiSingleResponse<T>> = await axiosInstance.post(
      `/${contentType}`,
      data // The axios interceptor will wrap this with { data: ... }
    );
    return response.data.data;
  }

  // Update entity
  async update<T = any>(contentType: string, id: string | number, data: any): Promise<T> {
    const response: AxiosResponse<StrapiSingleResponse<T>> = await axiosInstance.put(
      `/${contentType}/${id}`,
      data // The axios interceptor will wrap this with { data: ... }
    );
    return response.data.data;
  }

  // Delete entity
  async delete<T = any>(contentType: string, id: string | number): Promise<T> {
    const response: AxiosResponse<StrapiSingleResponse<T>> = await axiosInstance.delete(
      `/${contentType}/${id}`
    );
    return response.data.data;
  }
}

export const strapiService = new StrapiService();