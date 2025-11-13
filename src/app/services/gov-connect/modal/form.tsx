
'use client';

import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useState, useEffect } from 'react';
import { formConfigService, type FormTemplate } from '@/services/formConfigService';

interface GovConnectFormModalProps {
  open: boolean;
  onClose: () => void;
  templateId: string;
  formId?: string; // Optional: defaults to templateId if not provided
}

export default function GovConnectFormModal({ open, onClose, templateId, formId }: GovConnectFormModalProps) {
  const [formInfo, setFormInfo] = useState<(FormTemplate & { formId: string }) | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch form config when modal opens
  useEffect(() => {
    if (open && !formInfo) {
      setLoading(true);
      formConfigService.getFormConfig(templateId, formId)
        .then((data) => {
          setFormInfo(data);
        })
        .catch((error) => {
          console.error('Failed to fetch form config:', error);
          // Fallback: create basic form info with required fields
          setFormInfo({
            id: 1,
            templateId: templateId,
            formId: formId || templateId,
            formTitle: 'Apply for Dual Declaration Service',
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
    <Modal open={open} onClose={handleCloseModal} maxWidth={800}>      
      <FormBase 
        data={formInfo} 
        loading={loading}
        onClose={handleCloseModal}
      />
    </Modal>
  );
}