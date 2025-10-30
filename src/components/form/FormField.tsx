'use client';

import { TextField, TextFieldProps } from '@mui/material';

interface FormFieldProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'onBlur' | 'error' | 'helperText'> {
  name: string;
  value: any;
  onChange: (name: string, value: any) => void;
  onBlur: (name: string) => void;
  error?: string;
  touched?: boolean;
  shrinkLabel?: boolean;
}

export default function FormField({
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  shrinkLabel = true,
  ...textFieldProps
}: FormFieldProps) {
  return (
    <TextField
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      onBlur={() => onBlur(name)}
      error={touched && !!error}
      helperText={touched && error}
      slotProps={{ inputLabel: { shrink: shrinkLabel } }}
      fullWidth
      {...textFieldProps}
    />
  );
}
