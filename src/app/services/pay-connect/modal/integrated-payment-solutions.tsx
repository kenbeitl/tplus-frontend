'use client';
import {
  Box,
  Card, CardContent,
  Grid,
  List, ListItem, ListItemIcon, ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import InfoModal from '@/components/InfoModal';
import { CreditCard } from 'lucide-react';
import StyledIcon from '@/components/StyledIcon';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModalIntegratedPaymentSolutions({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Box className="flex items-center">
        <StyledIcon
          icon={<CreditCard size={18} />} 
          variant="blue-gradient"
          size={36}
          square
          className="mr-3"
        />
        <Box>
          <Typography variant="body1" component="h4">Integrated Payment Solutions</Typography>
        </Box>
      </Box>
    </InfoModal>
  );
}

