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
  hidden?: boolean;
}

export default function FormField({
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  shrinkLabel = true,
  hidden = false,
  slotProps,
  ...textFieldProps
}: FormFieldProps) {
  // If hidden, render a hidden input
  if (hidden) {
    return (
      <input
        type="hidden"
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
      />
    );
  }

  // Merge slotProps with default shrinkLabel
  const mergedSlotProps = {
    inputLabel: { 
      shrink: shrinkLabel,
      ...slotProps?.inputLabel,
    },
    input: slotProps?.input,
    ...slotProps,
  };

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      onBlur={() => onBlur(name)}
      error={!!error}
      helperText={error}
      slotProps={mergedSlotProps}
      fullWidth
      {...textFieldProps}
    />
  );
}
