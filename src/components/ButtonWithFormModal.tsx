'use client';

import ButtonWithModal from '@/components/ButtonWithModal';
import FormModal from '@/components/form/FormModal';
import { ArrowRight } from 'lucide-react';

interface ButtonWithFormModalProps {
  formId: string;
  buttonText: string;
  buttonEndIcon?: React.ReactNode;
  textOnly?: boolean;
}

export default function ButtonWithFormModal({ textOnly = false, formId, buttonText, buttonEndIcon = <ArrowRight /> }: ButtonWithFormModalProps) {
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        sx: { width: '100%', mt: 'auto' },
        variant: 'gradient',
        color: 'blue',
      }}
      buttonEndIcon={buttonEndIcon}
      textOnly={textOnly}
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
