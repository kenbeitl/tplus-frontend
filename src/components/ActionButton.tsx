'use client';

import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ActionButtonProps {
  buttonText: string;
  buttonProps?: Partial<ButtonProps>;
  variant?: 'text' | 'outlined' | 'contained' | 'gradient';
  autoWidth?: boolean;
  color?: 'blue' | 'purple' | 'white' | 'error';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  noIcon?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | string; // Function or URL string
}

export default function ActionButton({ buttonText, buttonProps, variant = 'gradient', autoWidth = false, color = 'blue', startIcon, endIcon, noIcon, disabled = false, type, onClick }: ActionButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (typeof onClick === 'string') {
      if (onClick.startsWith('http')) {
        // Open external links in a new tab
        window.open(onClick, '_blank');
      } else {
        router.push(onClick);
      }
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
      type={type}
      startIcon={!noIcon ? startIcon : null}
      endIcon={!noIcon ? endIcon : null}
      onClick={type !== 'submit' ? handleClick : undefined}
      {...buttonProps}
    >
      {buttonText}
    </Button>
  );
}