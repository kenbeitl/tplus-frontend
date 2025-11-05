import React from 'react';

interface StyledIconProps {
  icon: React.ReactNode;
  size?: number;
  bgColor?: string;
  textColor?: string;
  variant?: 'green' | 'blue' | 'orange' | 'amber' | 'gray' | 'custom';
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
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
    },
    orange: {
      bg: 'bg-orange-100',
      text: 'text-orange-600',
    },
    amber: {
      bg: 'bg-amber-100',
      text: 'text-amber-600',
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
        minWidth: `${size}px`,
        height: `${size}px`,
        ...customStyles,
      }}
    >
      {icon}
    </div>
  );
}