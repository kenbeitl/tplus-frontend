'use client';

import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useModal } from '@/hooks/useModal';
import { Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formConfigService, type FormListItem } from '@/services/formConfigService';

interface GovConnectClientProps {
  formId: string;
  buttonText: string;
}

export default function GovConnectClient({ formId, buttonText }: GovConnectClientProps) {
  const applicationModal = useModal();
  const [formInfo, setFormInfo] = useState<FormListItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch form config when modal opens
  useEffect(() => {
    if (applicationModal.open && !formInfo) {
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
  }, [applicationModal.open, formInfo, formId]);

  const handleCloseModal = () => {
    applicationModal.handleClose();
    // Optionally reset formInfo to refetch on next open
    setFormInfo(null);
  };

  return (
    <>
      <Button 
        sx={{ width: '100%', mt: 'auto' }} 
        variant="gradient" 
        color="blue"
        endIcon={<ArrowRight />}
        onClick={applicationModal.handleOpen}
      >
        {buttonText}
      </Button>

      <Modal open={applicationModal.open} onClose={handleCloseModal} maxWidth={800}>      
        <FormBase 
          data={formInfo} 
          loading={loading}
          onClose={handleCloseModal}
        />
      </Modal>
    </>
  );
}