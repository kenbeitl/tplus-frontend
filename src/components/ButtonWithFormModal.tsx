'use client';

import { ButtonWithModal, FormModal } from '@/components';
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
  variant?: 'text' | 'outlined' | 'contained' | 'gradient';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'blue' | 'purple' | 'green' | 'orange' | 'red';
  className?: string; // Tailwind classes including gradients
}

export default function ButtonWithFormModal({ 
  textOnly = false, 
  templateId,
  formId,
  placeholder,
  buttonText, 
  buttonStartIcon, 
  buttonEndIcon, 
  buttonProps,
  variant = 'contained',
  color = 'primary',
  className = '',
}: ButtonWithFormModalProps) {
  
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        className,
        sx: {
          width: '100%',
          mt: 'auto',
          ...buttonProps?.sx,
        },
        variant,
        color,
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
