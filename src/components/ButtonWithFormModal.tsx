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
  variant?: 'text' | 'outlined' | 'contained' | 'gradient' | 'green-gradient';
  color?: 'blue' | 'green' | 'purple' | 'emerald' | 'orange' | 'white' | 'error';
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
  variant = 'gradient',
  color = 'blue',
}: ButtonWithFormModalProps) {
  
  // Define gradient styles for each color (matching ActionButton)
  const gradientStyles: Record<string, any> = {
    blue: {
      background: 'linear-gradient(to right, #2563eb, #1d4ed8)',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(to right, #1d4ed8, #1e40af)',
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
      },
    },
    emerald: {
      background: 'linear-gradient(to right, #059669, #047857)',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(to right, #047857, #065f46)',
        color: '#ffffff',
        transform: 'translateY(-2px)',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
      },
    },
    purple: {
      background: 'linear-gradient(to right, #9333ea, #7e22ce)',
      color: '#ffffff',
      transition: 'all 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(to right, #7e22ce, #6b21a8)',
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
    width: '100%',
    mt: 'auto',
    ...(variant === 'green-gradient' && {
      background: 'linear-gradient(to right, #ECFDF5, #D1FAE5)',
      color: '#059669',
      border: '1px solid #10B981',
      '&:hover': {
        background: 'linear-gradient(to right, #D1FAE5, #A7F3D0)',
      },
    }),
    ...(variant === 'gradient' && gradientStyles[color] && gradientStyles[color]),
  };
  
  return (
    <ButtonWithModal
      buttonText={buttonText}
      buttonProps={{
        sx: { ...sx, ...buttonProps?.sx },
        variant: buttonVariant,
        ...(!isGradient && color !== 'white' && { color: muiColorMap[color] || 'primary' }),
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
