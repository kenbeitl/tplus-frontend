'use client';

import { Box } from '@mui/material';
import { FormEvent, ReactNode } from 'react';

interface FormProps {
  onSubmit: () => void;
  children: ReactNode;
  className?: string;
  sx?: any;
}

export default function Form({ onSubmit, children, className, sx }: FormProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate className={className} sx={sx}>
      {children}
    </Box>
  );
}
