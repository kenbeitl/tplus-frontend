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

export interface FormTemplate {
  id: number;
  templateId: string;
  formTitle: string;  
  description?: string;
  fields?: FormFieldConfig[];  
  submitButtonText?: string;
  cancelButtonText?: string;
  privacyText?: string;
}

export interface FormConfig {
  id: number;
  documentId: string;  
  createdAt: string;
  updatedAt: string;
  publishedAt: string;  
  active?: boolean;
  fromDate?: string | null;
  toDate?: string | null;
  FormTemplate: FormTemplate | FormTemplate[]; 
}

export interface FormConfigParams {
  populate?: Record<string, boolean | string>;
  filters?: {
    FormTemplate?: {
      templateId?: {
        $eq?: string;
      };
    };
  };
}

class FormConfigService {
  async getFormConfig(templateId: string, formId?: string): Promise<FormTemplate & { formId: string }> {
    
    const searchParams = new URLSearchParams();
    searchParams.append('filters[FormTemplate][templateId][$eq]', templateId);
    searchParams.append('populate[FormTemplate]', 'true');
    const url = `/form?${searchParams.toString()}`;
    
    const response = await strapiService.getCollectionByUrl<FormConfig>(url);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Form configuration not found for templateId: ${templateId}`);
    }
    
    const form = response.data[0];
    
    let template: FormTemplate;
    
    if (typeof form.FormTemplate === 'object' && !Array.isArray(form.FormTemplate)) {
      template = form.FormTemplate as FormTemplate;
    } else if (Array.isArray(form.FormTemplate) && form.FormTemplate.length > 0) {
      template = form.FormTemplate[0];
    } else {
      throw new Error(`Invalid FormTemplate structure for templateId: ${templateId}`);
    }
    
    return {
      ...template,
      formId: formId || templateId
    };
  }

  async getAllFormConfigs(): Promise<FormConfig[]> {
    const response = await strapiService.getCollection<FormConfig>('form-configs');
    return response.data;
  }

  async createFormConfig(data: Omit<FormConfig, 'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'>): Promise<FormConfig> {
    return strapiService.create<FormConfig>('form-configs', data);
  }

  async updateFormConfig(id: number, data: Partial<Omit<FormConfig, 'id' | 'documentId' | 'createdAt' | 'updatedAt' | 'publishedAt'>>): Promise<FormConfig> {
    return strapiService.update<FormConfig>('form-configs', id, data);
  }

  async deleteFormConfig(id: number): Promise<FormConfig> {
    return strapiService.delete<FormConfig>('form-configs', id);
  }
}

export const formConfigService = new FormConfigService();