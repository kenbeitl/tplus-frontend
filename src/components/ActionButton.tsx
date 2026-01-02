'use client';

import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ActionButtonProps {
  buttonText: string;
  buttonProps?: Partial<ButtonProps>;
  variant?: 'text' | 'outlined' | 'contained' | 'gradient' | 'green-gradient';
  autoWidth?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'white' | 'error';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  noIcon?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (() => void) | string; // Function or URL string
  border?: string;
}

export default function ActionButton({ buttonText, buttonProps, variant = 'gradient', autoWidth = false, color = 'blue', startIcon, endIcon, noIcon, disabled = false, type, onClick, border }: ActionButtonProps) {
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

  // Handle green-gradient variant
  const buttonVariant = variant === 'green-gradient' ? 'contained' : variant;
  const sx = {
    width: autoWidth ? 'auto' : '100%',
    mt: 'auto',
    ...(variant === 'green-gradient' && {
      background: 'linear-gradient(to right, #ECFDF5, #D1FAE5)',
      color: '#059669',
      border: border || '1px solid #10B981',
      '&:hover': {
        background: 'linear-gradient(to right, #D1FAE5, #A7F3D0)',
      },
    }),
    ...(border && variant !== 'green-gradient' && { border }),
  };

  return (
    <Button 
      sx={sx}
      variant={buttonVariant} 
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