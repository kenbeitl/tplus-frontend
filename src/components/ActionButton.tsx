'use client';

import { Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
  buttonText: string;
  variant?: 'text' | 'outlined' | 'contained' | 'gradient';
  autoWidth?: boolean;
  color?: 'blue' | 'white';
  noIcon?: boolean;
  disabled?: boolean;
  onClick?: (() => void) | string; // Function or URL string
}

export default function ActionButton({ buttonText, variant = 'gradient', autoWidth = false, color = 'blue', noIcon, disabled = false, onClick }: ActionButtonProps) {

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
      endIcon={!noIcon ? <ArrowRight /> : null}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
}