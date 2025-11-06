'use client';
import {
  Box,
  Card, Grid, Typography,
} from '@mui/material';
import InfoModal from '@/components/InfoModal';
import Spacer from '@/components/ui/Spacer';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModalDigitalIdentityRequired({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Box className="flex flex-col">
        <Typography variant="h4" component="h2" sx={{ mb: 1, alignSelf: 'center' }}>Digital Identity Required</Typography>
        <Typography variant="body2" component="p">To use SignConnect for secure document signing, you'll need a digital identity. Both options take less than 5 minutes to apply.</Typography>
        <Spacer height={20} />
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined" className="p-4 h-full">
              
            </Card>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Card variant="outlined" className="p-4 h-full">
              
            </Card>
          </Grid>
        </Grid>
      </Box>      
    </InfoModal>
  );
}

