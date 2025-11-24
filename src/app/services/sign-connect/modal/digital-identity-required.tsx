'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import { InfoModal, Spacer, StyledIcon, ActionButton } from '@/components';
import { CircleCheckBig, Shield, User } from 'lucide-react';
import ModalHowToApplyForIdOne from './how-to-apply-for-id-one';

type Props = {
  open: boolean;
  onClose: () => void;
};

const DIGITAL_IDENTITY_OPTIONS = [
  {
    id: 'iam-smart',
    icon: <Shield size={32} />,
    iconColor: 'blue',
    name: 'iAM Smart',
    description: 'Digital identity for HKID holders',
    list: [
      'Eligible for all individuals aged 18+ with a valid HKID card',
      'Recognized by the HKSAR government',
      'Free application',
      'Less than 5 minutes',
    ],
    action: 'https://www.iamsmart.gov.hk/en/reg.html'
  },
  {
    id: 'id-one',
    icon: <User size={32} />,
    iconColor: 'green',
    name: 'iD-One',
    description: 'Digital identity for e-Passport holders',
    list: [
      'Eligible for all individuals aged 18+ with an ICAO compliant e-Passport',
      'Recognized by HKSAR Government',
      'Remote application',
      'Less than 5 minutes',
    ],
    action: 'open-modal' // Changed to trigger modal
  }
]

export default function ModalDigitalIdentityRequired({ open, onClose }: Props) {
  const router = useRouter();
  const [showIdOneModal, setShowIdOneModal] = useState(false);

  const handleAction = (action: string) => {
    if (action === 'open-modal') {
      setShowIdOneModal(true);
    } else if (action) {
      // External URL
      window.open(action, '_blank');
    }
  };

  return (
    <>
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
            {DIGITAL_IDENTITY_OPTIONS.map((option) => (
              <Grid key={option.id} size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" className="border-2! hover:border-blue-300! transition-colors! flex flex-col items-center p-6 h-full">
                  <StyledIcon 
                    icon={option.icon} 
                    variant={option.iconColor as "green" | "blue"}
                    size={64}
                    square
                  />
                  <Spacer height={10} />
                  <Typography variant="h5" component="h4">{option.name}</Typography>
                  <Typography variant="body2" component="p">{option.description}</Typography>
                  <Spacer height={10} />
                  <List sx={{ flexGrow: 1 }}>
                    {option.list.map((point, p) => (
                      <ListItem key={`point-${p}`}>
                        <ListItemIcon>
                          <CircleCheckBig size={16} color="#43A047" />
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                  <ActionButton 
                    buttonText='Apply'
                    noIcon
                    onClick={() => handleAction(option.action)}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          <Spacer height={20} />
          <Box component="div" className="flex justify-center gap-4">
            <Button variant="outlined" onClick={() => router.push('/help-centre')}>Learn More about Digital Identities</Button>
            <Button variant="gradient" color="blue" onClick={onClose}>Already have Digtial ID</Button>
          </Box>
        </Box>      
      </InfoModal>
      {/* How to Apply for iD-One Modal */}
      <ModalHowToApplyForIdOne 
        open={showIdOneModal} 
        onClose={() => setShowIdOneModal(false)} 
      />
    </>
  );
}

