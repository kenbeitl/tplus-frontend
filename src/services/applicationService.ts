import { strapiService } from '@/lib/strapi';

// Application form data type
export interface ApplicationFormData {
  formID?: string;
  name: string;
  phoneNumber: string;
  email: string;
  jobTitle: string;
  companyName: string;
  message?: string;
}

export interface Application {
  id: number;
  attributes: {
    formID?: string;
    name: string;
    phoneNumber: string;
    email: string;
    jobTitle: string;
    companyName: string;
    message?: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    updatedAt: string;
  };
}

export interface ApplicationListParams {
  page?: number;
  pageSize?: number;
  status?: string;
  search?: string;
}

export interface ApplicationListResponse {
  data: Application[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Application service
export const applicationService = {
  // Submit new application
  submit: async (data: ApplicationFormData): Promise<Application> => {
    return strapiService.create<Application>('applications', data);
  },

  // Get all applications with pagination
  getAll: async (params?: ApplicationListParams): Promise<ApplicationListResponse> => {
    return strapiService.getCollection<Application>('applications', params);
  },

  // Get single application by ID
  getById: async (id: string | number): Promise<Application> => {
    return strapiService.getById<Application>('applications', id);
  },

  // Update application
  update: async (id: string | number, data: Partial<ApplicationFormData>): Promise<Application> => {
    return strapiService.update<Application>('applications', id, data);
  },

  // Delete application
  delete: async (id: string | number): Promise<Application> => {
    return strapiService.delete<Application>('applications', id);
  },

  // Update application status
  updateStatus: async (id: string | number, status: 'pending' | 'approved' | 'rejected'): Promise<Application> => {
    return strapiService.update<Application>('applications', id, { status });
  },
};
