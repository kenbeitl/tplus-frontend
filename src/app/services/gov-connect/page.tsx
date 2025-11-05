import Spacer from '@/components/ui/Spacer';
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import InlineTag from '@/components/InlineTag';
import ActionButton from '@/components/ActionButton';
import { Brain, CircleCheckBig, FileText, Search } from 'lucide-react';
import { Metadata } from "next";
import GovConnectClient from './GovConnectClient';


export const metadata: Metadata = {
  title: 'GovConnect | Services | TPlus',
}

export default function GovConnect() {
  // Form configuration - declare formIDs for this page
  const DUAL_DECLARATION_FORM_ID = 'govconnect-dual-declaration';
  // Future forms can be added here:
  // const CLASSIFICATION_FORM_ID = 'govconnect-classification';
  // const VERIFICATION_FORM_ID = 'govconnect-verification';

  return (
   <Box component="div" className="relative">
    <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">GovConnect</Typography>
    <Typography variant="body2" component="p">Single Submission for Dual Declaration</Typography>
    <InlineTag label="Services Available" className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
    <Spacer height={20} />
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <FileText size={24} />
            <Typography variant="h6" component="h2">Single Submission for Dual Declaration</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Streamline customs declarations with single submission for both import and export requirements
          </Typography>
          <List sx={{ flexGrow: 1 }}>
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
          <GovConnectClient 
            formId={DUAL_DECLARATION_FORM_ID} 
            buttonText="Apply Now" 
          />
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Search size={24} />
            <Typography variant="h6" component="h2">HS Code AI Classifier</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Get AI-powered HS code classification for your products instantly
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="HK HS Code (Ask Tracie)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="China HS Code (Ask Xiao Cui)" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Instant classification results" />
            </ListItem>
          </List>
          <ActionButton buttonText="Launch Classifier" />
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <Card variant="outlined" className="p-6" sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Brain size={24} />
            <Typography variant="h6" component="h2">AI-Powered Customs Automation</Typography>
          </Box>
          <Typography sx={{ mt: 2 }} variant="body2" component="p">
            Automate customs declarations with AI-powered document processing
          </Typography>
          <List sx={{ flexGrow: 1 }}>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Automated data extraction" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Import & export declarations" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CircleCheckBig size={20} color="#87e119" />
              </ListItemIcon>
              <ListItemText primary="Ready in 10 minutes" />
            </ListItem>
          </List>
          <ActionButton buttonText="Launch Service" />
        </Card>
      </Grid>
    </Grid>
   </Box>
  );
}
