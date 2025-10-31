'use client';

import React, { useMemo } from 'react';
import { Grid, Typography, CircularProgress, Alert, Box } from '@mui/material';
import Form from './Form';
import FormField from './FormField';
import HiddenField from './HiddenField';
import FormActions from './FormActions';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { applicationService, type ApplicationFormData } from '@/services';

// Import the types from formConfigService
import { FormListItem } from '@/services/formConfigService';

interface FormBaseProps {
  data: FormListItem | null;
  loading?: boolean;
  onClose: () => void;
}

export default function FormBase({ data, loading = false, onClose }: FormBaseProps) {
  // Build validation rules - matching the rolled back form
  const validationRules = useMemo(() => {
    return {
      formID: { required: false },
      name: { required: true, message: 'Name is required' },
      phoneNumber: { required: true, message: 'Phone number is required' },
      email: { required: true, message: 'Email is required' },
      jobTitle: { required: true, message: 'Job title is required' },
      companyName: { required: true, message: 'Company name is required' },
      message: { required: false }, // Optional field
    };
  }, []);

  // Build initial form values - matching the rolled back form
  const initialValues = useMemo(() => {
    return {
      formID: data?.formID || '',
      name: '',
      phoneNumber: '',
      email: '',
      jobTitle: '',
      companyName: '',
      message: '',
    };
  }, [data?.formID]);

  // Initialize form validation
  const form = useFormValidation(initialValues, validationRules);

  // Form submission logic
  const { submit: submitApplication, isSubmitting } = useFormSubmission(
    applicationService.submit,
    {
      successMessage: 'Application submitted successfully! We will review your request and get back to you soon.',
      errorMessage: 'Failed to submit application',
      onSuccess: () => {
        onClose();
        form.reset();
      },
    }
  );

  const handleSubmit = async () => {
    await submitApplication(form.values as any, form.validateAll);
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  // Check form state for submit button
  const isFormTouched = Object.keys(form.touched).some(key => form.touched[key]);
  const hasErrors = Object.keys(form.errors).some(key => form.errors[key]);
  const isSubmitDisabled = !isFormTouched || hasErrors || isSubmitting;

  // Loading state
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', padding: '2rem' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>
          Loading form configuration...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (!data) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        Form configuration not found or failed to load.
      </Alert>
    );
  }

  return (
    <>
      {/* Form title and description */}
      {data.formTitle && (
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
          {data.formTitle}
        </Typography>
      )}
      
      {data.description && (
        <Typography variant="body2" sx={{ mb: 3 }}>
          {data.description}
        </Typography>
      )}

      <Form onSubmit={handleSubmit}>
        {/* Hidden formID field */}
        <HiddenField
          name="formID"
          value={form.values.formID || ''}
          onChange={form.handleChange}
        />

        {/* Static form fields - matching rolled back form */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="name"
              label="Name"
              placeholder="Enter your full name"
              value={form.values.name || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.name ? (form.errors.name as string) : ''}
              required
              fullWidth
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.values.phoneNumber || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phoneNumber ? (form.errors.phoneNumber as string) : ''}
              required
              fullWidth
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="email"
              label="Email"
              placeholder="Enter email address"
              value={form.values.email || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email ? (form.errors.email as string) : ''}
              required
              fullWidth
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="jobTitle"
              label="Job Title"
              placeholder="e.g., Operations Manager"
              value={form.values.jobTitle || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.jobTitle ? (form.errors.jobTitle as string) : ''}
              required
              fullWidth
            />
          </Grid>
          
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
              value={form.values.companyName || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.companyName ? (form.errors.companyName as string) : ''}
              required
              fullWidth
            />
          </Grid>
          
          <Grid size={{ xs: 12 }}>
            <FormField
              name="message"
              label="Message (optional)"
              placeholder="Additional messages or specific requirements..."
              value={form.values.message || ''}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.message ? (form.errors.message as string) : ''}
              multiline
              minRows={4}
              maxRows={10}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Privacy text - matching rolled back form */}
        <Typography 
          sx={{ mt: 2 }} 
          variant="body2" 
          component="p"
        >
          By submitting this form, I confirm I have read and agree to T+'s Privacy Statement.
        </Typography>

        {/* Form actions */}
        <FormActions
          onCancel={handleClose}
          submitLabel={data.submitButtonText || 'Submit'}
          cancelLabel={data.cancelButtonText || 'Cancel'}
          isSubmitDisabled={isSubmitDisabled}
        />
      </Form>
    </>
  );
}