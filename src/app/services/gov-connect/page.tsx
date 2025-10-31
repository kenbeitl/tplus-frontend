'use client';

import Spacer from '@/components/ui/Spacer';
import Modal from '@/components/Modal';
import FormBase from '@/components/form/FormBase';
import { useModal } from '@/hooks/useModal';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ArrowRight, CircleCheckBig, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { formConfigService, type FormListItem } from '@/services/formConfigService';

export default function GovConnect() {
  // Form configuration - declare formIDs for this page
  const DUAL_DECLARATION_FORM_ID = 'govconnect-dual-declaration';
  // Future forms can be added here:
  // const CLASSIFICATION_FORM_ID = 'govconnect-classification';
  // const VERIFICATION_FORM_ID = 'govconnect-verification';
  
  const applicationModal = useModal();
  const [formInfo, setFormInfo] = useState<FormListItem | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch form config when modal opens
  useEffect(() => {
    if (applicationModal.open && !formInfo) {
      setLoading(true);
      formConfigService.getFormConfig(DUAL_DECLARATION_FORM_ID)
        .then((data) => {
          // Add the formID from our declared variable since Strapi won't return it
          const formInfoWithId = {
            ...data,
            formID: DUAL_DECLARATION_FORM_ID
          };
          setFormInfo(formInfoWithId);
        })
        .catch((error) => {
          console.error('Failed to fetch form config:', error);
          // Fallback: create basic form info with required formID
          setFormInfo({
            id: 1,
            formID: DUAL_DECLARATION_FORM_ID,
            formTitle: 'Apply for Dual Declaration Service',
            description: 'Please provide your details and requirements for the service',
            submitButtonText: 'Submit Application'
          });
        })
        .finally(() => setLoading(false));
    }
  }, [applicationModal.open, formInfo]);

  const handleCloseModal = () => {
    applicationModal.handleClose();
    // Optionally reset formInfo to refetch on next open
    // setFormInfo(null);
  };

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
      <FormBase 
        data={formInfo} 
        loading={loading}
        onClose={handleCloseModal}
      />
    </Modal>
   </>
  );
}
