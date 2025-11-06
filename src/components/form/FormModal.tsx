'use client';

import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useState, useEffect } from 'react';
import { formConfigService, type FormListItem } from '@/services/formConfigService';

interface FormModalProps {
  open: boolean;
  onClose: () => void;
  formId: string;
  maxWidth?: number;
}

export default function FormModal({ open, onClose, formId, maxWidth = 800 }: FormModalProps) {
  const [formInfo, setFormInfo] = useState<FormListItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch form config when modal opens
  useEffect(() => {
    if (open && !formInfo) {
      setLoading(true);
      formConfigService.getFormConfig(formId)
        .then((data) => {
          // Add the formID from our declared variable since Strapi won't return it
          const formInfoWithId = {
            ...data,
            formID: formId
          };
          setFormInfo(formInfoWithId);
        })
        .catch((error) => {
          console.error('Failed to fetch form config:', error);
          // Fallback: create basic form info with required formID
          setFormInfo({
            id: 1,
            formID: formId,
            formTitle: 'Application Form',
            description: 'Please provide your details and requirements for the service',
            submitButtonText: 'Submit Application'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [open, formInfo, formId]);

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
