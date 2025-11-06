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
}

export default function InfoModal({
  open,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 768,
}: InfoModalProps) {
  return (
    <Modal open={open} onClose={onClose} maxWidth={maxWidth}>
        {title && (
            <Typography variant="h6" component="h2" sx={{ fontSize: '18px', mb: 1 }}>
                {title}
            </Typography>
        )}
        {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '14px', mb: 3 }}>
                {subtitle}
            </Typography>
        )}
        {children}
    </Modal>
  );
}
