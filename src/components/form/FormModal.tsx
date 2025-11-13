'use client';

import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useState, useEffect } from 'react';
import { formConfigService, type FormTemplate } from '@/services/formConfigService';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  templateId: string;
  formId?: string;
  maxWidth?: number;
  placeholder?: string;
}

export default function FormModal({ open, onClose, templateId, formId, maxWidth = 800, placeholder }: FormModalProps) {
  const [formInfo, setFormInfo] = useState<(FormTemplate & { formId: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch form config when modal opens
  useEffect(() => {
    if (open && !formInfo) {
      setLoading(true);
      formConfigService.getFormConfig(templateId, formId)
        .then((data) => {

          if (placeholder) {
            data.description = data.description?.replace("${placeholder}", placeholder);
            data.formTitle = data.formTitle?.replace("${placeholder}", placeholder);
          }         

          setFormInfo(data);
        })
        .catch((error) => {
          console.error('Failed to fetch form config:', error);
          // Fallback: create basic form info with required fields
          setFormInfo({
            id: 1,
            templateId: templateId,
            formId: formId || templateId,
            formTitle: 'Application Form',
            description: 'Please provide your details and requirements for the service',
            submitButtonText: 'Submit Application'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [open, formInfo, templateId, formId]);

  const handleCloseModal = () => {
    onClose();
    // Reset formInfo to refetch on next open
    setFormInfo(null);
  };

  return (
    <Modal open={open} onClose={handleCloseModal} maxWidth={maxWidth}>      
      <FormBase 
        data={formInfo} 
        loading={loading}
        onClose={handleCloseModal}
      />
    </Modal>
  );
}
