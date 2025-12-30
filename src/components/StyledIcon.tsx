import React from 'react';

type ColorVariant = 'transparent' | 'red' | 'green' | 'blue' | 'orange' | 'amber' | 'indigo' | 'purple' | 'gray';
type InvertedVariant = `${Exclude<ColorVariant, 'transparent' | 'gray'>}-inverted`;
type Variant = ColorVariant | InvertedVariant | 'blue-gradient' | 'opacity' | 'custom';
type Elevation = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface StyledIconProps {
  icon: React.ReactNode | string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  variant?: Variant;
  className?: string;
  square?: boolean;
  elevation?: Elevation;
}

export default function StyledIcon({ 
  icon,
  size = 40,
  bgColor,
  textColor,
  variant = 'gray',
  className = '',
  square = false,
  elevation = 0,
}: StyledIconProps): React.ReactNode {
  
  // Define preset color variants
  const variants = {
    transparent: {
      bg: 'bg-transparent',
      text: 'text-inherit',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    'red-inverted': {
      bg: 'bg-red-600',
      text: 'text-white',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    'green-inverted': {
      bg: 'bg-green-600',
      text: 'text-white',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    'blue-inverted': {
      bg: 'bg-blue-600',
      text: 'text-white',
    },
    'blue-gradient': {
      bg: 'bg-linear-to-r from-blue-500 to-blue-700',
      text: 'text-white',
    },
    opacity: {
      bg: 'bg-white/20 backdrop-blur-sm',
      text: 'text-inherit',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
    'orange-inverted': {
      bg: 'bg-orange-600',
      text: 'text-white',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
    },
    'amber-inverted': {
      bg: 'bg-amber-600',
      text: 'text-white',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-600',
    },
    'indigo-inverted': {
      bg: 'bg-indigo-600',
      text: 'text-white',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
    },
    'purple-inverted': {
      bg: 'bg-purple-600',
      text: 'text-white',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
    },
    custom: {
      bg: '',
      text: '',
    },
  };

  // Use custom colors if provided, otherwise use variant
  const isCustom = variant === 'custom' && (bgColor || textColor);
  const colorClasses = isCustom ? '' : `${variants[variant].bg} ${variants[variant].text}`;
  
  // Border radius class based on square prop
  const borderRadiusClass = square ? 'rounded-lg' : 'rounded-full';
  
  // Box shadow based on elevation
  const shadowClasses: Record<number, string> = {
    0: '',
    1: 'shadow-sm',
    2: 'shadow',
    3: 'shadow-md',
    4: 'shadow-lg',
    5: 'shadow-xl',
    6: 'shadow-2xl',
  };
  const elevationClass = elevation > 0 ? shadowClasses[Math.min(elevation, 6)] : '';
  
  // Custom styles for when custom colors are provided
  const customStyles = isCustom ? {
    backgroundColor: bgColor,
    color: textColor,
  } : {};

  return (
    <div 
      className={`flex items-center justify-center ${borderRadiusClass} ${colorClasses} ${elevationClass} ${className}`.trim()}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...customStyles,
      }}
    >
      {icon}
    </div>
  );
}