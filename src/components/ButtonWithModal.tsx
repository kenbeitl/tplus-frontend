'use client';

import { useModal } from '@/hooks/useModal';
import { Button, ButtonProps } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonWithModalProps {
  buttonText: string;
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  modalContent: (open: boolean, onClose: () => void) => ReactNode;
  buttonStartIcon?: ReactNode;
  buttonEndIcon?: ReactNode;
}

export default function ButtonWithModal({
  buttonText,
  buttonProps,
  modalContent,
  buttonStartIcon,
  buttonEndIcon,
}: ButtonWithModalProps) {
  const modal = useModal();

  return (
    <>
      <Button
        {...buttonProps}
        startIcon={buttonStartIcon}
        endIcon={buttonEndIcon}
        onClick={modal.handleOpen}
      >
        {buttonText}
      </Button>

      {modalContent(modal.open, modal.handleClose)}
    </>
  );
}
