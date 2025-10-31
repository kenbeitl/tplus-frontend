'use client';

import { useState } from 'react';
import { useSnackbar } from '@/contexts/SnackbarContext';

interface UseFormSubmissionOptions {
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
}

export function useFormSubmission<T = any>(
  submitFunction: (data: any) => Promise<T>,
  options: UseFormSubmissionOptions = {}
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useSnackbar();

  const {
    successMessage = 'Form submitted successfully!',
    errorMessage = 'Failed to submit form. Please try again.',
    onSuccess,
    onError,
  } = options;

  const submit = async (data: any, validationFunction?: () => boolean) => {
    // Run validation if provided
    if (validationFunction && !validationFunction()) {
      showError('Please fill in all required fields correctly before submitting.');
      return false;
    }

    setIsSubmitting(true);
    try {
      const result = await submitFunction(data);
      
      // Show success message
      showSuccess(successMessage);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(result);
      }
      
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Determine error message
      let displayMessage = errorMessage;
      if (error instanceof Error) {
        displayMessage = `${errorMessage}: ${error.message}`;
      }
      
      // Show error message
      showError(displayMessage);
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      }
      
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submit,
    isSubmitting,
  };
}