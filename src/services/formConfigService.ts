import { strapiService } from '@/lib/strapi';

export interface FormFieldConfig {
  name: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'hidden';
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  options?: Array<{ label: string; value: string }>; // For select fields
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string; // Regex pattern as string
    message?: string;
  };
  grid?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
  };
  defaultValue?: string;
}

export interface FormConfig {
  id: number;
  attributes: {
    formID: string;
    title: string;
    description?: string;
    fields: FormFieldConfig[];
    submitButtonText?: string;
    cancelButtonText?: string;
    privacyText?: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface FormConfigParams {
  populate?: string;
  filters?: {
    formID?: {
      $eq?: string;
    };
  };
}

class FormConfigService {
  async getFormConfig(formID: string): Promise<FormConfig> {
    const params: FormConfigParams = {
      filters: {
        formID: {
          $eq: formID
        }
      }
    };
    
    const response = await strapiService.getCollection<FormConfig>('form-configs', params);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Form configuration not found for formID: ${formID}`);
    }
    
    return response.data[0];
  }

  async getAllFormConfigs(): Promise<FormConfig[]> {
    const response = await strapiService.getCollection<FormConfig>('form-configs');
    return response.data;
  }

  async createFormConfig(data: Omit<FormConfig['attributes'], 'createdAt' | 'updatedAt'>): Promise<FormConfig> {
    return strapiService.create<FormConfig>('form-configs', data);
  }

  async updateFormConfig(id: number, data: Partial<FormConfig['attributes']>): Promise<FormConfig> {
    return strapiService.update<FormConfig>('form-configs', id, data);
  }

  async deleteFormConfig(id: number): Promise<FormConfig> {
    return strapiService.delete<FormConfig>('form-configs', id);
  }
}

export const formConfigService = new FormConfigService();