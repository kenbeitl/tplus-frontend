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

export interface FormListItem {
  id: number;
  formID: string;
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
  FormList: FormListItem[];  // No longer nested under attributes
}

export interface FormConfigParams {
  populate?: Record<string, boolean | string>;
  filters?: {
    FormList?: {
      formID?: {
        $eq?: string;
      };
    };
  };
}

class FormConfigService {
  async getFormConfig(formID: string): Promise<FormListItem> {
    // Construct the URL manually to avoid axios auto-encoding issues
    // Target: /api/forms?filters[FormList][formID][$eq]=govconnect-dual-declaration&populate[FormList]=true
    
    const searchParams = new URLSearchParams();
    searchParams.append('filters[FormList][formID][$eq]', formID);
    searchParams.append('populate[FormList]', 'true');
    const url = `/forms?${searchParams.toString()}`;
    
    const response = await strapiService.getCollectionByUrl<FormConfig>(url);
    
    if (!response.data || response.data.length === 0) {
      throw new Error(`Form configuration not found for formID: ${formID}`);
    }
    
    // Find the specific FormList item with the matching formID
    const form = response.data[0];
    const formListItem = form.FormList.find((item: FormListItem) => item.formID === formID);
    
    if (!formListItem) {
      throw new Error(`FormList item not found for formID: ${formID}`);
    }
    
    return formListItem;
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