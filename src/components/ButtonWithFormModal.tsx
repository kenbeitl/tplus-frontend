'use client';

import ButtonWithModal from '@/components/ButtonWithModal';
import FormModal from '@/components/form/FormModal';
import { SxProps, Theme } from '@mui/material';

interface ButtonWithFormModalProps {
  formId: string;
  buttonText: string;
  buttonStartIcon?: React.ReactNode;
  buttonEndIcon?: React.ReactNode;
  textOnly?: boolean;
  className?: string;
  sx?: SxProps<Theme>;
}

export default function ButtonWithFormModal({ textOnly = false, className, formId, buttonText, buttonStartIcon, buttonEndIcon, sx }: ButtonWithFormModalProps) {
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        sx: sx || { width: '100%', mt: 'auto' },
        variant: 'gradient',
        color: 'blue',
        className: className,
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
