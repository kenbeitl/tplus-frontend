'use client';

import ButtonWithModal from '@/components/ButtonWithModal';
import FormModal from '@/components/form/FormModal';
import { ArrowRight } from 'lucide-react';

interface ButtonWithFormModalProps {
  formId: string;
  buttonText: string;
}

export default function ButtonWithFormModal({ formId, buttonText }: ButtonWithFormModalProps) {
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        sx: { width: '100%', mt: 'auto' },
        variant: 'gradient',
        color: 'blue',
      }}
      buttonEndIcon={<ArrowRight />}
      modalContent={(open, onClose) => (
        <FormModal
          open={open}
          onClose={onClose}
          formId={formId}
        />
      )}
    />
  );
}
