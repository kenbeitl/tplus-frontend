import { strapiService } from '@/lib/strapi';

export interface Service {
  id: number;
  serviceName: string;
  icon: string;
  isActive: boolean;
  slug: string;
}

export interface ServiceItem {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  Service: Service;
  Content: any[];
  localizations: any[];
}

export const serviceServices = {
  getAll: async (locale: string = 'en'): Promise<Service[]> => {
    try {
      
      const response = await strapiService.getCollection<ServiceItem>('services', {
        populate: 'Service',
        filters: { 
          locale: { $eq: locale } 
        }
      });
      
      const ServiceList: Service[] = response.data.filter(item => item.Service).map(item => ({
        id: item.Service.id,
        serviceName: item.Service.serviceName,
        icon: item.Service.icon,
        isActive: item.Service.isActive,
        slug: item.Service.slug
      }));
    
      return ServiceList;      
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  },
};
