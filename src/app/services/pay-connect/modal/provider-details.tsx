'use client';
import { Box, Link, Paper, Typography } from '@mui/material';
import { InfoModal, Emoji } from '@/components';

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  emoji: string;
  source: string;
};

export default function ProviderDetails({ open, onClose, name, emoji, source }: Props) {
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
      <Box 
        component="div"
        className="mt-12 mx-8 mb-8 border-dashed border-2 border-gray-300 rounded-xl bg-gray-200!"
      >
        <Paper className="flex items-center justify-center bg-transparent! overflow-hidden" elevation={0}>
          <Link href={source} target="_blank" rel="noopener noreferrer">
          <img src={source} alt={name} />
          </Link>
        </Paper>
      </Box>
    </InfoModal>
  );
}

