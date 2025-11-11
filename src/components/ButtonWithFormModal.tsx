'use client';

import ButtonWithModal from '@/components/ButtonWithModal';
import FormModal from '@/components/form/FormModal';
import { ButtonProps } from '@mui/material';

interface ButtonWithFormModalProps {
  formId: string;
  buttonText: string;
  buttonStartIcon?: React.ReactNode;
  buttonEndIcon?: React.ReactNode;
  textOnly?: boolean;
  buttonProps?: Partial<ButtonProps>;
}

export default function ButtonWithFormModal({ 
  textOnly = false, 
  formId, 
  buttonText, 
  buttonStartIcon, 
  buttonEndIcon, 
  buttonProps 
}: ButtonWithFormModalProps) {
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        sx: { width: '100%', mt: 'auto' },
        variant: 'gradient',
        color: 'blue',
        ...buttonProps,
      }}
      buttonStartIcon={buttonStartIcon}
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
