'use client';

import { useEffect } from 'react';
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Spacer from '@/components/ui/Spacer';
import { useModal } from '@/hooks/useModal';

import ModalDigitalIdentityRequired from './modal/digital-identity-required';
import ModalBeforeYouStartTradelink from './modal/before-you-start-tradelink';
import StyledIcon from '@/components/StyledIcon';
import { Brain, CircleCheckBig, FilePenLine, FileText } from 'lucide-react';
import theme from '@/theme/theme';
import ActionButton from '@/components/ActionButton';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/contexts/AppContext';

export default function SignConnectClient() {
  const t = useTranslations();
  const digitalIdentityModal = useModal();
  const tradelinkModal = useModal();
  const router = useRouter();

  const DIGITAL_SIGNING_PLATFORMS = [
    { 
      isActive: true,
      icon: <FilePenLine />,
      name: 'Tradelink',
      context: 'Basic signing functions with iAM Smart+ and iD-One',
      list: [
        'Basic signing functions',
        'Can use iAM Smart+',
        'Can use iD-One',
        'Government compliant',
      ],
      action: () => {
        tradelinkModal.handleOpen();
      },
    },
    { 
      isActive: false,
      icon: <FileText />,
      name: 'DocuSign', 
      context: 'Industry-leading eSignature solution for secure document signing.',
      list: [
        'Sign with iD-One',
        'Digital IDs from other regions',
        'Advanced AI document management',
        'Global compliance',
      ],       
    },
    { 
      isActive: false,
      icon: <Brain />,
      name: 'Fadada',
      context: 'Industry-leading eSignature solution for secure document signing.',
      list: [
        'Sign with iD-One',
        'Digital IDs from China',
        'Advanced AI document management',
        'AI legal assistant',
      ],
    },
  ]

  // Open modal on component mount
  useEffect(() => {
    digitalIdentityModal.handleOpen();
  }, []); // Empty dependency array = runs once on mount

  return (
    <>
      <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.signConnect.title") }</Typography>
      <Typography variant="body2" component="p">{ t("pages.signConnect.context") }</Typography>
      <Spacer height={20} />
      <Paper variant="outlined" className="flex flex-col items-center p-6 h-full">
        <StyledIcon 
          icon={<FilePenLine size={64} />} 
          variant="custom"
          bgColor="transparent"
          textColor={theme.palette.text.secondary}
          size={80}
        />
        <Spacer height={20} />
        <Typography variant="h5" component="h2">Choose Your Signing Platform</Typography>
        <Spacer height={30} />
        <Typography variant="body2" component="p">Select from the available signing platforms to start signing documents securely.</Typography>
        <Spacer height={30} />
        <Grid container spacing={2} sx={{ width: '100%' }}>
          {DIGITAL_SIGNING_PLATFORMS.map((platform, i) => (
            <Grid key={`dsp-${i}`} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" className={`p-6 h-full flex flex-col items-center ${platform.isActive ? 'border-2! border-blue-300!' : ''}`}>
                <StyledIcon 
                  icon={platform.icon} 
                  variant={platform.isActive ? 'blue' : 'gray'}
                  square
                  size={50}
                />
                <Spacer height={20} />
                <Typography variant="h6" component="h3">{platform.name}</Typography>
                <Typography variant="caption" component="p" className="text-center">{platform.context}</Typography>
                <List sx={{ textAlign: 'left', width: '100%' }}>
                    {platform.list.map((point, p) => (
                      <ListItem key={p}>
                        <ListItemIcon>
                          <CircleCheckBig size={16} color="#43A047" />
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                  <ActionButton
                    buttonText={platform.isActive ? 'Select Service' : 'Coming Soon'}
                    variant={platform.isActive ? 'gradient' : 'outlined'}
                    color={platform.isActive ? 'blue' : 'white'}
                    noIcon
                    disabled={!platform.isActive}
                    onClick={platform.isActive ? platform.action : undefined}
                  />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Spacer height={30} />
        <Box component="div" className="flex justify-center">
          <ActionButton
            buttonText="Learn More about Signing Platforms"
            variant="text"
            onClick={() => router.push('/help-centre')}
            noIcon
          />
        </Box>
      </Paper>


      <ModalDigitalIdentityRequired
        open={digitalIdentityModal.open}
        onClose={digitalIdentityModal.handleClose}
      />
      <ModalBeforeYouStartTradelink
        open={tradelinkModal.open}
        onClose={tradelinkModal.handleClose}
      />
    </>
  );
}
