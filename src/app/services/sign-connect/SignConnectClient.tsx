'use client';

import { useEffect } from 'react';
import { Typography } from '@mui/material';
import Spacer from '@/components/ui/Spacer';
import { useModal } from '@/hooks/useModal';

import ModalDigitalIdentityRequired from './modal/digital-identity-required';

export default function SignConnectClient() {
  const digitalIdentityModal = useModal();

  // Open modal on component mount
  useEffect(() => {
    digitalIdentityModal.handleOpen();
  }, []); // Empty dependency array = runs once on mount

  return (
    <>
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">
        SignConnect
      </Typography>
      <Typography variant="body2" component="p">
        Digital document signing and management platform
      </Typography>
      <Spacer height={20} />

      {/* Add your SignConnect content here */}


      <ModalDigitalIdentityRequired
        open={digitalIdentityModal.open}
        onClose={digitalIdentityModal.handleClose}
      />
    </>
  );
}
