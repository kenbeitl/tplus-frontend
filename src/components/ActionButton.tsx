'use client';

import { Button } from '@mui/material';
import { ArrowRight } from 'lucide-react';

interface ActionButtonProps {
  buttonText: string;
  onClick?: () => void;
}

export default function ActionButton({ buttonText, onClick }: ActionButtonProps) {
  return (
    <Button 
      sx={{ width: '100%', mt: 'auto' }} 
      variant="gradient" 
      color="blue"
      endIcon={<ArrowRight />}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
}