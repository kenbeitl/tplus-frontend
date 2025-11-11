'use client';

import { Button, ButtonProps } from '@mui/material';

interface ActionButtonProps {
  buttonText: string;
  buttonProps?: Partial<ButtonProps>;
  variant?: 'text' | 'outlined' | 'contained' | 'gradient';
  autoWidth?: boolean;
  color?: 'blue' | 'white';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  noIcon?: boolean;
  disabled?: boolean;
  onClick?: (() => void) | string; // Function or URL string
}

export default function ActionButton({ buttonText, buttonProps, variant = 'gradient', autoWidth = false, color = 'blue', startIcon, endIcon, noIcon, disabled = false, onClick }: ActionButtonProps) {

  const handleClick = () => {
    if (typeof onClick === 'string') {
      window.open(onClick, onClick.startsWith('http') ? '_blank' : '_self');
    } else if (typeof onClick === 'function') {
      onClick();
    }
  };

  return (
    <Button 
      sx={{ width: autoWidth ? 'auto' : '100%', mt: 'auto' }}
      variant={variant} 
      color={color}
      disabled={disabled}
      startIcon={!noIcon ? startIcon : null}
      endIcon={!noIcon ? endIcon : null}
      onClick={handleClick}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}