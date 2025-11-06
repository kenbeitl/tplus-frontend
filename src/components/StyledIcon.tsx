import React from 'react';

interface StyledIconProps {
  icon: React.ReactNode | string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  variant?: 'transparent' | 'green' | 'blue' | 'blue-inverted' | 'blue-gradient' | 'orange' | 'amber' | 'indigo' | 'indigo-inverted' | 'purple' | 'purple-inverted' | 'gray' | 'custom';
  className?: string;
  square?: boolean;
}

export default function StyledIcon({ 
  icon,
  size = 40,
  bgColor,
  textColor,
  variant = 'gray',
  className = '',
  square = false,
}: StyledIconProps): React.ReactNode {
  
  // Define preset color variants
  const variants = {
    transparent: {
      bg: 'bg-transparent',
      text: 'text-inherit',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
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
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
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
  
  // Custom styles for when custom colors are provided
  const customStyles = isCustom ? {
    backgroundColor: bgColor,
    color: textColor,
  } : {};

  return (
    <div 
      className={`flex items-center justify-center ${borderRadiusClass} ${colorClasses} ${className}`.trim()}
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