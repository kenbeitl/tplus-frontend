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
  formTitle: string;  // Changed from 'title' to 'formTitle'
  description?: string;
  fields?: FormFieldConfig[];  // Made optional since it's not in the current response
  submitButtonText?: string;
  cancelButtonText?: string;
  privacyText?: string;
}

export interface FormConfig {
  id: number;
  documentId: string;  // Added documentId field
  createdAt: string;
  updatedAt: string;
  publishedAt: string;  // Added publishedAt field
  active?: boolean;
  fromDate?: string | null;
  toDate?: string | null;
  FormTemplate: FormTemplate | FormTemplate[];  // Can be either object or array
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
    // Construct the URL manually to avoid axios auto-encoding issues
    // Target: /api/form-templates?filters[FormTemplate][templateId][$eq]=govconnect-dual-declaration&populate[FormTemplate]=true
    
    const searchParams = new URLSearchParams();
    searchParams.append('filters[FormTemplate][templateId][$eq]', templateId);
    searchParams.append('populate[FormTemplate]', 'true');
    const url = `/form-templates?${searchParams.toString()}`;
    
    const response = await strapiService.getCollectionByUrl<FormConfig>(url);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Form configuration not found for templateId: ${templateId}`);
    }
    
    // Get the form from response
    const form = response.data[0];
    
    // FormTemplate can be either an object or an array
    // When filtered by templateId, Strapi returns it as an object
    let template: FormTemplate;
    
    if (typeof form.FormTemplate === 'object' && !Array.isArray(form.FormTemplate)) {
      // FormTemplate is a single object
      template = form.FormTemplate as FormTemplate;
    } else if (Array.isArray(form.FormTemplate) && form.FormTemplate.length > 0) {
      // FormTemplate is an array, get the first item
      template = form.FormTemplate[0];
    } else {
      throw new Error(`Invalid FormTemplate structure for templateId: ${templateId}`);
    }
    
    // Return template with formId (defaults to templateId if not provided)
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