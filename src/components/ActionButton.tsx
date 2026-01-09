'use client';

import { Button, ButtonProps } from '@mui/material';
import { useRouter } from 'next/navigation';
import theme from '@/theme/theme';

interface ActionButtonProps {
  buttonText: string;
  buttonProps?: Partial<ButtonProps>;
  variant?: 'text' | 'outlined' | 'contained' | 'gradient' | 'green-gradient';
  autoWidth?: boolean;
  color?: 'blue' | 'green' | 'purple' | 'emerald' | 'orange' | 'white' | 'error';
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

  // Define gradient styles for each color
  const gradientStyles: Record<string, any> = {
    blue: {
      background: theme.palette.gradient.buttonBlue,
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: theme.palette.gradient.buttonBlueHover,
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      },
    },
    emerald: {
      background: theme.palette.gradient.buttonEmerald,
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: theme.palette.gradient.buttonEmeraldHover,
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
      },
    },
    purple: {
      background: theme.palette.gradient.buttonPurple,
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: theme.palette.gradient.buttonPurpleHover,
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
      },
    },
  };

  // Handle variant and gradient styling
  const isGradient = variant === 'gradient' || variant === 'green-gradient';
  const buttonVariant = isGradient ? 'contained' : variant;
  
  // Map custom colors to MUI colors for non-gradient variants
  const muiColorMap: Record<string, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
    blue: 'primary',
    green: 'success',
    purple: 'secondary',
    emerald: 'success',
    orange: 'warning',
    error: 'error',
  };
  
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
    ...(variant === 'gradient' && gradientStyles[color] && gradientStyles[color]),
    ...(border && variant !== 'green-gradient' && variant !== 'gradient' && { border }),
  };

  return (
    <Button 
      sx={sx}
      variant={buttonVariant}
      {...(!isGradient && color !== 'white' && { color: muiColorMap[color] || 'primary' })}
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