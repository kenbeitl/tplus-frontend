import { apiService } from '@/lib/api';

// Application form data type
export interface ApplicationFormData {
  name: string;
  phone_number: string;
  email: string;
  job_title: string;
  company_name: string;
  message?: string;
}

export interface Application {
  id: string;
  name: string;
  phone_number: string;
  email: string;
  job_title: string;
  company_name: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationListParams {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
}

export interface ApplicationListResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
}

// Application service
export const applicationService = {
  // Submit new application
  submit: async (data: ApplicationFormData): Promise<Application> => {
    return apiService.post<Application>('/applications', data);
  },

  // Get all applications with pagination
  getAll: async (params?: ApplicationListParams): Promise<ApplicationListResponse> => {
    return apiService.get<ApplicationListResponse>('/applications', params);
  },

  // Get single application by ID
  getById: async (id: string): Promise<Application> => {
    return apiService.get<Application>(`/applications/${id}`);
  },

  // Update application
  update: async (id: string, data: Partial<ApplicationFormData>): Promise<Application> => {
    return apiService.put<Application>(`/applications/${id}`, data);
  },

  // Delete application
  delete: async (id: string): Promise<void> => {
    return apiService.delete<void>(`/applications/${id}`);
  },

  // Update application status
  updateStatus: async (id: string, status: 'pending' | 'approved' | 'rejected'): Promise<Application> => {
    return apiService.patch<Application>(`/applications/${id}/status`, { status });
  },
};
