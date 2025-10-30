'use client';

import Spacer from '@/components/ui/Spacer';
import Modal from '@/components/Modal';
import { useModal } from '@/hooks/useModal';
import { useFormValidation } from '@/hooks/useFormValidation';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material';
import { ArrowRight, CircleCheckBig, FileText } from 'lucide-react';
import theme from '@/theme/theme';

export default function GovConnect() {
  const applicationModal = useModal();
  
  const form = useFormValidation(
    {
      name: '',
      phone_number: '',
      email: 'demo@tradelink.com.hk',
      job_title: '',
      company_name: 'Demo company',
      message: '',
    },
    {
      name: {
        required: true,
        minLength: 2,
        message: 'Name is required (min 2 characters)',
      },
      phone_number: {
        required: true,
        pattern: /^[0-9]{8,15}$/,
        message: 'Phone number must be 8-15 digits',
      },
      email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Valid email is required',
      },
      job_title: {
        required: true,
        minLength: 2,
        message: 'Job title is required (min 2 characters)',
      },
      company_name: {
        required: true,
        minLength: 2,
        message: 'Company name is required (min 2 characters)',
      },
      message: {
        required: false,
      },
    }
  );

  const handleSubmit = () => {
    if (form.validateAll()) {
      console.log('Form submitted:', form.values);
      // Handle form submission here
      applicationModal.handleClose();
      form.reset();
    }
  };

  const handleCloseModal = () => {
    applicationModal.handleClose();
    form.reset();
  };

  // Check if form is touched and has no errors
  const isFormTouched = Object.keys(form.touched).some(key => form.touched[key]);
  const hasErrors = Object.keys(form.errors).some(key => form.errors[key]);
  const isSubmitDisabled = !isFormTouched || hasErrors;

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
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Name"
            placeholder="Enter your full name"
            value={form.values.name}
            onChange={(e) => form.handleChange('name', e.target.value)}
            onBlur={() => form.handleBlur('name')}
            error={form.touched.name && !!form.errors.name}
            helperText={form.touched.name && form.errors.name}
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone Number"
            placeholder="Enter phone number"
            value={form.values.phone_number}
            onChange={(e) => form.handleChange('phone_number', e.target.value)}
            onBlur={() => form.handleBlur('phone_number')}
            error={form.touched.phone_number && !!form.errors.phone_number}
            helperText={form.touched.phone_number && form.errors.phone_number}
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            placeholder="Enter email address"
            value={form.values.email}
            onChange={(e) => form.handleChange('email', e.target.value)}
            onBlur={() => form.handleBlur('email')}
            error={form.touched.email && !!form.errors.email}
            helperText={form.touched.email && form.errors.email}
            required
            disabled
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Job Title"
            placeholder="Enter your job title"
            value={form.values.job_title}
            onChange={(e) => form.handleChange('job_title', e.target.value)}
            onBlur={() => form.handleBlur('job_title')}
            error={form.touched.job_title && !!form.errors.job_title}
            helperText={form.touched.job_title && form.errors.job_title}
            required
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
         <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Company Name"
            placeholder="Enter your company name"
            value={form.values.company_name}
            onChange={(e) => form.handleChange('company_name', e.target.value)}
            onBlur={() => form.handleBlur('company_name')}
            error={form.touched.company_name && !!form.errors.company_name}
            helperText={form.touched.company_name && form.errors.company_name}
            required
            disabled
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            label="Message (optional)"
            placeholder="Enter your message here..."
            multiline
            minRows={4}
            maxRows={10}
            value={form.values.message}
            onChange={(e) => form.handleChange('message', e.target.value)}
            onBlur={() => form.handleBlur('message')}
            error={form.touched.message && !!form.errors.message}
            helperText={form.touched.message && form.errors.message}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button 
          variant="gradient" 
          color="primary" 
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit Application
        </Button>
      </Box>
    </Modal>
   </>
  );
}
