
'use client';

import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useState, useEffect } from 'react';
import { formConfigService, type FormListItem } from '@/services/formConfigService';

interface GovConnectFormModalProps {
  open: boolean;
  onClose: () => void;
  formId: string;
}

export default function GovConnectFormModal({ open, onClose, formId }: GovConnectFormModalProps) {
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
            formTitle: 'Apply for Dual Declaration Service',
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
    <Modal open={open} onClose={handleCloseModal} maxWidth={800}>      
      <FormBase 
        data={formInfo} 
        loading={loading}
        onClose={handleCloseModal}
      />
    </Modal>
  );
}