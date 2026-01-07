'use client';

import Modal from '@/components/Modal';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';

interface InfoModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: number;
  bgcolor?: string;
}

export default function InfoModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 768,
  bgcolor,
}: InfoModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={maxWidth} sx={{ backgroundColor: bgcolor }}>
        {title && (
            <Typography variant="h6" component="h2" className="mb-1" sx={{ fontSize: '18px' }}>
                {title}
            </Typography>
        )}
        {subtitle && (
            <Typography variant="body2" color="text.secondary" className="mb-3" sx={{ fontSize: '14px' }}>
                {subtitle}
            </Typography>
        )}
        {children}
    </Modal>
  );
}
