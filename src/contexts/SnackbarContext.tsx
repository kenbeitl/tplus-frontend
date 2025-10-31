'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor, Slide, SlideProps } from '@mui/material';

interface SnackbarMessage {
  message: string;
  severity: AlertColor;
  autoHideDuration?: number;
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertColor, autoHideDuration?: number) => void;
  showSuccess: (message: string, autoHideDuration?: number) => void;
  showError: (message: string, autoHideDuration?: number) => void;
  showWarning: (message: string, autoHideDuration?: number) => void;
  showInfo: (message: string, autoHideDuration?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

interface SnackbarProviderProps {
  children: ReactNode;
}

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<SnackbarMessage | null>(null);
  const [open, setOpen] = useState(false);

  const showSnackbar = (message: string, severity: AlertColor = 'info', autoHideDuration: number = 6000) => {
    setSnackbar({ message, severity, autoHideDuration });
    setOpen(true);
  };

  const showSuccess = (message: string, autoHideDuration: number = 6000) => {
    showSnackbar(message, 'success', autoHideDuration);
  };

  const showError = (message: string, autoHideDuration: number = 8000) => {
    showSnackbar(message, 'error', autoHideDuration);
  };

  const showWarning = (message: string, autoHideDuration: number = 6000) => {
    showSnackbar(message, 'warning', autoHideDuration);
  };

  const showInfo = (message: string, autoHideDuration: number = 6000) => {
    showSnackbar(message, 'info', autoHideDuration);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, showSuccess, showError, showWarning, showInfo }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={snackbar?.autoHideDuration || 6000}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar?.severity || 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar?.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextType {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
}