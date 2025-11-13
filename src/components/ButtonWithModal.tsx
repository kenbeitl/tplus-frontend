'use client';

import { useModal } from '@/hooks/useModal';
import { Button, ButtonProps, Link } from '@mui/material';
import { ReactNode } from 'react';

interface ButtonWithModalProps {
  buttonText: string;
  modalContent: (open: boolean, onClose: () => void) => ReactNode;
  buttonProps?: Omit<ButtonProps, 'onClick' | 'children'>;
  buttonStartIcon?: ReactNode;
  buttonEndIcon?: ReactNode;
  textOnly?: boolean;
}

export default function ButtonWithModal({
  buttonText,
  buttonProps,
  modalContent,
  buttonStartIcon,
  buttonEndIcon,
  textOnly,
}: ButtonWithModalProps) {
  const modal = useModal();

  return (
    <>
      {textOnly ? (
        <Link
          variant="caption" 
          underline="hover"
          onClick={modal.handleOpen}
        >
          {buttonText}
        </Link>
      ) : (
        <Button
          {...buttonProps}
          startIcon={buttonStartIcon}
          endIcon={buttonEndIcon}
          onClick={modal.handleOpen}
        >
        {buttonText}
        </Button>
      )}

      {modalContent(modal.open, modal.handleClose)}
    </>
  );
}
