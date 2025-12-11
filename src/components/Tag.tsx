import React from "react";
import { styled } from '@mui/material/styles';

type TagVariant = 'transparent' | 'orange' | 'blue' | 'green' | 'purple' | 'white' | 'outlined';
type ColorVariant = 'yellow';

interface TagProps {
  variant?: TagVariant;
  color?: ColorVariant;
  label: string | React.ReactNode;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const TagRoot = styled('span', {
  shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant?: TagVariant }>(({ theme, variant, color }) => ({
  background: '#FFFFFF',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  padding: '0 8px',
  fontSize: '0.75rem',
  fontWeight: 500,
  lineHeight: 1.5,
  
  '&.text-only': {
    padding: 0
  },
  
  '& svg': {
    width: '1rem'
  },
  
  // Variant styles
  ...(variant === 'transparent' && {
    color: 'inherit',
    background: 'transparent',
  }),
  
  ...(variant === 'orange' && {
    color: '#FFFFFF',
    background: theme.palette.gradient.orange,
  }),
  
  ...(variant === 'blue' && {
    color: theme.palette.tag.blue.text,
    background: theme.palette.tag.blue.background,
  }),
  
  ...(variant === 'green' && {
    color: theme.palette.tag.green.text,
    background: theme.palette.tag.green.background,
  }),
  
  ...(variant === 'purple' && {
    color: '#FFFFFF',
    background: theme.palette.gradient.purple,
  }),
  
  ...(variant === 'white' && {
    color: theme.palette.tag.white.text,
    background: theme.palette.tag.white.background,
    border: '1px solid #e5e7eb',
  }),
  
  ...(variant === 'outlined' && {
    color: theme.palette.tag.grey.text,
    background: '#555555',
    border: '1px solid #999999',
  }),
  
  ...(variant === 'outlined' && color === 'yellow' && {
    color: '#92400E',
    background: '#FEF3C7',
    border: '1px solid #FDE68A',
    borderRadius: '8px',
  }),
}));

export default function Tag({ 
  variant,
  color,
  label,
  className = '',
  startIcon,
  endIcon,
}: TagProps): React.ReactNode {
  return (
    <TagRoot variant={variant} color={color} className={className}>
      {startIcon && <span className="mr-1">{startIcon}</span>}
      {label}
      {endIcon && <span className="ml-1">{endIcon}</span>}
    </TagRoot>
  );
}