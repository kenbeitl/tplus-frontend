'use client';
import { Box, Paper, Typography } from '@mui/material';
import InfoModal from '@/components/InfoModal';
import Spacer from '@/components/ui/Spacer';
import Emoji from '@/components/Emoji';

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  emoji: string;
};

export default function ProviderDetails({ open, onClose, name, emoji }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Box className="flex items-center mb-2">
        <Emoji symbol={emoji} size={36} className="mr-3" />
        <Typography variant="h5" component="h2" sx={{ mb: 1 }}>{name}</Typography>
      </Box>
      <Typography variant="body2" component="p">Detailed product information and features</Typography>
      <Spacer height={40} />
      <Box 
        component="div" 
        sx={{
          padding: 2,
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <Paper className="flex items-center justify-center bg-gray-400">
          zzzz
        </Paper>
      </Box>
    </InfoModal>
  );
}

