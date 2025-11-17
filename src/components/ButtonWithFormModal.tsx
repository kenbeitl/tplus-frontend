'use client';

import ButtonWithModal from '@/components/ButtonWithModal';
import FormModal from '@/components/form/FormModal';
import { ButtonProps } from '@mui/material';

interface ButtonWithFormModalProps {
  templateId: string;
  formId?: string; // Optional: defaults to templateId if not provided
  placeholder?: string;
  buttonText: string;
  buttonStartIcon?: React.ReactNode;
  buttonEndIcon?: React.ReactNode;
  textOnly?: boolean;
  buttonProps?: Partial<ButtonProps>;
}

export default function ButtonWithFormModal({ 
  textOnly = false, 
  templateId,
  formId,
  placeholder,
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
          templateId={templateId}
          formId={formId}
          placeholder={placeholder || formId}
        />
      )}
    />
  );
}
