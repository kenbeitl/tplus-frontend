'use client';

import { useState } from 'react';
import Link from 'next/link';

import theme from '@/theme/theme';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { InfoModal, Spacer, ActionButton } from '@/components';
import ModalHowToApplyForIdOne from './how-to-apply-for-id-one';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';
import iAMSmart from '@/assets/images/iAMSmart';
import iDOne from '@/assets/images/iDOne';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

const LOGO_COMPONENTS = {
  iDOne: iDOne,
  iAMSmart: iAMSmart,
} as const;

type LogoKey = keyof typeof LOGO_COMPONENTS;

export default function ModalDigitalIdentityRequired({ open, onClose }: ModalProps) {
  const t = useTranslations();
  const [showIdOneModal, setShowIdOneModal] = useState(false);

  const handleAction = (action: string) => {
    if (action === 'open-modal') {
      setShowIdOneModal(true);
    } else if (action) {
      // External URL
      window.open(action, '_blank');
    }
  };

  const modalContent = t('pages.signConnect.modal.digitalIdentityRequired');
  const DIGITAL_IDENTITY_OPTIONS = modalContent.options;

  return (
    <>
      <InfoModal
        open={open}
        onClose={onClose}
        maxWidth={864}
        bgcolor="#F8FAFC"
      >
        <Box className="flex flex-col">
          <Typography variant="h3" component="h2" className="mb-4 self-center">{ modalContent.title }</Typography>
          <Typography variant="body1" component="p" color={theme.palette.text.secondary}>{ modalContent.context }</Typography>
          <Spacer height={20} />
          <Grid container spacing={2}>
            {Array.isArray(DIGITAL_IDENTITY_OPTIONS) && DIGITAL_IDENTITY_OPTIONS.map((option) => {
              const LogoComponent = LOGO_COMPONENTS[option.image as LogoKey];
              return (
              <Grid key={`dio-${option.id}`} size={{ xs: 12, sm: 6 }}>
                <Card variant="outlined" className="border-2! hover:border-blue-300! transition-colors! flex flex-col items-center p-6 h-full">
                  {LogoComponent && (
                    <Box className="w-32 h-32 flex place-items-center">
                      <LogoComponent />
                    </Box>
                  )}
                  <Spacer height={10} />
                  <Typography variant="h5" component="h4">{option.name}</Typography>
                  <Typography variant="body2" component="p">{option.description}</Typography>
                  <Spacer height={10} />
                  <List className="grow">
                    {option.list.map((point: string, p: number) => (
                      <ListItem key={`point-${p}`}>
                        <ListItemIcon>
                          { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                  <ActionButton 
                    buttonText={ t('common.apply') }
                    noIcon
                    onClick={() => handleAction(option.action)}
                  />
                </Card>
              </Grid>
              );
            })}
          </Grid>
          <Spacer height={20} />
          <Box component="div" className="flex flex-col sm:flex-row justify-center gap-4">
            <Button component={Link} variant="outlined" href="/help-centre">{ modalContent.learnMoreAboutDigitalIdentities }</Button>
            <Button variant="contained" color="primary" onClick={onClose}>{ modalContent.alreadyHaveDigitalID }</Button>
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

