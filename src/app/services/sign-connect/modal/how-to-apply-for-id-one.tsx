'use client';
import {
  Box,
  Card, CardContent,
  Grid,
  List, ListItem, ListItemIcon, ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { InfoModal, Spacer, StyledIcon } from '@/components';
import theme from '@/theme/theme';

type Props = {
  open: boolean;
  onClose: () => void;
};

const ELIGIBILITY_REQUIREMENTS = [
  'Must be 18 years or older',
  'Valid e-passport holder',
  'Access to a smartphone with camera',
  'Valid email address',
];

const APPLICATION_STEPS = [
  {
    title: 'Download the Tradelink Sign Mobile App',
    context: 'Available on iOS App Store and Google Play Store',
  },
  {
    title: 'Prepare Your Documents and Activation Code',
    context: 'Have your e-passport ready for scanning. Input activation code "TPLUS@T6LK30" in the App.'
  },
  {
    title: 'Complete Identity Verification',
    context: 'Take a selfie and scan your e-passport for verification'
  }
];
  

export default function ModalHowToApplyForIDOne({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>How to Apply for iD-One</Typography>
      <Typography variant="body2" component="p">Follow these steps to apply for your iD-One digital identity</Typography>
      <Spacer height={20} />
      <Card 
        variant="outlined" 
        className="p-4 bg-blue-50! border-2! border-blue-200!"
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>Eligibility Requirements</Typography>
        <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
          {ELIGIBILITY_REQUIREMENTS.map((requirement, i) => (
            <ListItem key={`requirement-${i}`} sx={{ py: 0 }}>
              <ListItemText primary={requirement} />
            </ListItem>
          ))}
        </List>
      </Card>
      <Spacer height={20} />
      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>Application Steps:</Typography>
      {APPLICATION_STEPS.map((step, s) => (
        <Box className="flex items-top mb-3" key={`step-${s}`}>
          <StyledIcon 
            icon={s + 1} 
            variant="blue-inverted"
            size={24}
            className="mr-3"
          />
          <Box>
            <Typography variant="body1" component="h4">{step.title}</Typography>
            <Typography variant="caption" component="p">{step.context}</Typography>
          </Box>
        </Box>
      ))}
      <Spacer height={10} />
      <Card 
        variant="outlined" 
        className="p-4 bg-green-50! border-2 border-green-200!"
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.green, mb: 1 }}>Processing Time</Typography>
        <Typography variant="caption" component="p">Your iD-One application will typically be processed within 5 minutes. You'll receive an email confirmation once approved.</Typography>
      </Card>
    </InfoModal>
  );
}

