'use client';

import { Box, Button } from '@mui/material';

interface FormActionsProps {
  onCancel: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitDisabled?: boolean;
  submitType?: 'button' | 'submit';
}

export default function FormActions({
  onCancel,
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  isSubmitDisabled = false,
  submitType = 'submit',
}: FormActionsProps) {
  return (
    <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
      <Button variant="outlined" onClick={onCancel}>
        {cancelLabel}
      </Button>
      <Button
        variant="gradient"
        color="primary"
        type={submitType}
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      >
        {submitLabel}
      </Button>
    </Box>
  );
}
