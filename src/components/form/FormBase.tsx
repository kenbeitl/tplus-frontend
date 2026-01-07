'use client';

import { useMemo, useEffect } from 'react';
import { Grid, Typography, Alert, Box, Card } from '@mui/material';
import Form from './Form';
import FormField from './FormField';
import HiddenField from './HiddenField';
import FormActions from './FormActions';
import FormSkeleton from './FormSkeleton';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useFormSubmission } from '@/hooks/useFormSubmission';
import { applicationService } from '@/services';

// Import the types from formConfigService
import { FormTemplate } from '@/services/formConfigService';
import Tag from '../Tag';
import { getSVGIcon } from '@/helpers/utils';

interface FormBaseProps {
  data: (FormTemplate & { formId: string }) | null;
  loading?: boolean;
  onClose: () => void;
}

export default function FormBase({ data, loading = false, onClose }: FormBaseProps) {
  // Build validation rules - matching the rolled back form
  const validationRules = useMemo(() => {
    return {
      formId: { required: false },
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
      formId: data?.formId || '',
      name: '',
      phoneNumber: '',
      email: '',
      jobTitle: '',
      companyName: 'Demo Company',
      message: '',
    };
  }, [data?.formId]);

  // Initialize form validation
  const form = useFormValidation(initialValues, validationRules);

  // Update formId when data changes
  useEffect(() => {
    if (data?.formId && form.values.formId !== data.formId) {
      form.handleChange('formId', data.formId);
    }
  }, [data?.formId, form.values.formId, form.handleChange]);

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
    return <FormSkeleton fields={6} />;
  }

  // Error state
  if (!data) {
    return (
      <Alert severity="error" className="mb-2">
        Form configuration not found or failed to load.
      </Alert>
    );
  }

  return (
    <>
      {/* Form title and description */}
      {data.formTitle && (
        <Typography variant="h5" component="h2" className="mb-1">
          {data.formTitle}
        </Typography>
      )}
      
      {data.description && (
        <Typography 
          variant="body2" 
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      )}

      <Card variant="outlined" className="p-3 mb-6 bg-blue-50! border-blue-200!">
        <Box className="flex items-center">
          <Tag
            className='text-only text-blue-700!'
            variant="transparent"
            label="Some fields have been pre-filled with your profile information."
            startIcon={ getSVGIcon('check', 16) }
          />
        </Box>
      </Card>

      <Form onSubmit={handleSubmit}>
        {/* Hidden formId field */}
        <HiddenField
          name="formId"
          value={form.values.formId || ''}
          onChange={form.handleChange}
        />

        {/* Static form fields - matching rolled back form */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="name"
              label="Full Name"
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
          className="mt-2"
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