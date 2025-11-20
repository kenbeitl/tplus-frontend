import { strapiService } from '@/lib/strapi';

export interface Service {
  id: number;
  serviceName: string;
  icon: string;
  isActive: boolean;
  path: string;
}

export interface ServiceGroup {
  id: number;
  documentId: string;
  locale: string;
  Services: Service[];
}

export interface ServiceResponse {
  data: ServiceGroup[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export const serviceServices = {
  getAll: async (locale: string = 'en'): Promise<Service[]> => {
    try {
      const response = await strapiService.getCollection<ServiceGroup>('services', {
        populate: 'Services',
        filters: { 
            locale: { $eq: locale } 
        }
      });
      console.log('Fetched services response:', response);
      
      // Extract Services array from the first item and return directly
      return (response as ServiceResponse).data[0]?.Services || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },

  getBySlug: async (slug: string, locale: string = 'en'): Promise<Service | null> => {
    try {
      const response = await strapiService.getCollection<ServiceGroup>('services', {
        populate: 'Services',
        filters: {
          locale: { $eq: locale }
        }
      });
      
      const serviceResponse = response as ServiceResponse;
      const services = serviceResponse.data[0]?.Services || [];
      
      // Find service by path/slug
      return services.find(service => service.path.includes(slug)) || null;
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      throw error;
    }
  }
};
