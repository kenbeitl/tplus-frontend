'use client';

import Spacer from '@/components/ui/Spacer';
import Modal from '@/components/Modal';
import Form from '@/components/form/Form';
import FormField from '@/components/form/FormField';
import HiddenField from '@/components/form/HiddenField';
import FormActions from '@/components/form/FormActions';
import { useModal } from '@/hooks/useModal';
import { useFormValidation } from '@/hooks/useFormValidation';
import { applicationService, type ApplicationFormData } from '@/services';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ArrowRight, CircleCheckBig, FileText } from 'lucide-react';
import { useState } from 'react';

export default function GovConnect() {
  const applicationModal = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useFormValidation(
    {
      formID: 'govconnect-dual-declaration', // Hidden field to identify form type
      name: '',
      phoneNumber: '',
      email: 'demo@tradelink.com.hk', // To be filled with logged in user's email
      jobTitle: '',
      companyName: 'Demo company', // To be filled with logged in user's company name
      message: '',
    },
    {
      // formID doesn't need validation as it's a hidden field
      formID: {
        required: false,
      },
      name: {
        required: true,
        minLength: 2,
        message: 'Name is required (min 2 characters)',
      },
      phoneNumber: {
        required: true,
        pattern: /^[+0-9]{8,15}$/,
        message: 'Phone number must be 8-15 digits',
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Valid email is required',
      },
      jobTitle: {
        required: true,
        minLength: 2,
        message: 'Job title is required (min 2 characters)',
      },
      companyName: {
        required: true,
        minLength: 2,
        message: 'Company name is required (min 2 characters)',
      },
      message: {
        required: false,
      },
    }
  );

  const handleSubmit = async () => {
    if (form.validateAll()) {
      setIsSubmitting(true);
      try {
        // Submit application via API
        const result = await applicationService.submit(form.values as ApplicationFormData);
        console.log('Application submitted successfully:', result);
        
        // Close modal and reset form on success
        applicationModal.handleClose();
        form.reset();
        
        // Optional: Show success message
        // You can use a toast notification here
      } catch (error) {
        console.error('Failed to submit application:', error);
        // Optional: Show error message
        // You can use a toast notification here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCloseModal = () => {
    applicationModal.handleClose();
    form.reset();
  };

  // Check if form is touched and has no errors
  const isFormTouched = Object.keys(form.touched).some(key => form.touched[key]);
  const hasErrors = Object.keys(form.errors).some(key => form.errors[key]);
  const isSubmitDisabled = !isFormTouched || hasErrors || isSubmitting;

  return (
   <>
    <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">GovConnect</Typography>
    <Typography variant="body2" component="p">Single Submission for Dual Declaration</Typography>
    <Spacer height={20} />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FileText size={24} />
            <Typography variant="h6" component="h2">Single Submission for Dual Declaration</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Streamline customs declarations with single submission for both import and export requirements
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Reduce paperwork by 60%" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Faster processing time" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Single point of submission" />
            </ListItem>
          </List>
          <Button 
            sx={{ width: '100%' }} 
            variant="gradient" 
            color="primary"
            endIcon={<ArrowRight />}
            onClick={applicationModal.handleOpen}
          >Apply Now</Button>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FileText size={24} />
            <Typography variant="h6" component="h2">Single Submission for Dual Declaration</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Streamline customs declarations with single submission for both import and export requirements
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Reduce paperwork by 60%" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Faster processing time" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Single point of submission" />
            </ListItem>
          </List>
          <Button 
            sx={{ width: '100%' }} 
            variant="gradient" 
            color="primary"
            endIcon={<ArrowRight />}
          >Launch Classifier</Button>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FileText size={24} />
            <Typography variant="h6" component="h2">Single Submission for Dual Declaration</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Streamline customs declarations with single submission for both import and export requirements
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Reduce paperwork by 60%" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Faster processing time" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Single point of submission" />
            </ListItem>
          </List>
          <Button 
            sx={{ width: '100%' }} 
            variant="gradient" 
            color="primary"
            endIcon={<ArrowRight />}
          >Launch Service</Button>
        </Card>
      </Grid>
    </Grid>

    <Modal open={applicationModal.open} onClose={handleCloseModal} maxWidth={800}>      
      <Form onSubmit={handleSubmit}>
        <HiddenField
          name="formID"
          value={form.values.formID}
          onChange={form.handleChange}
        />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="name"
              label="Name"
              placeholder="Enter your full name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.name}
              touched={form.touched.name}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.values.phoneNumber}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.phoneNumber}
              touched={form.touched.phoneNumber}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="email"
              label="Email"
              placeholder="Enter email address"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.email}
              touched={form.touched.email}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="jobTitle"
              label="Job Title"
              placeholder="e.g., Operations Manager"
              value={form.values.jobTitle}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.jobTitle}
              touched={form.touched.jobTitle}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormField
              name="companyName"
              label="Company Name"
              placeholder="Enter your company name"
              value={form.values.companyName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.companyName}
              touched={form.touched.companyName}
              required
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormField
              name="message"
              label="Message (optional)"
              placeholder="Additional messages or specific requirements..."
              value={form.values.message}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.errors.message}
              touched={form.touched.message}
              multiline
              minRows={4}
              maxRows={10}
            />
          </Grid>
        </Grid>

        <Typography 
          sx={{ mt: 2 }} 
          variant="body2" 
          component="p"
        >
          By submitting this form, I confirm I have read and agree to T+'s Privacy Statement.
        </Typography>

        <FormActions
          onCancel={handleCloseModal}
          submitLabel="Submit Application"
          isSubmitDisabled={isSubmitDisabled}
        />
      </Form>
    </Modal>
   </>
  );
}
