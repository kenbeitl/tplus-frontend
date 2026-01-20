'use client';

import theme from '@/theme/theme';
import { Box, Button, Card, Grid, List, ListItem, ListItemText, SvgIcon, Typography } from '@mui/material';
import { InfoModal, Spacer, StyledIcon, Tag } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import React from 'react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalHowToApplyForIDOne({ open, onClose }: ModalProps) {
  const t = useTranslations();
  const ELIGIBILITY_REQUIREMENTS = t('pages.signConnect.modal.howToApplyForIdOne.eligibility.requirements');
  const APPLICATION_STEPS = t('pages.signConnect.modal.howToApplyForIdOne.applicationSteps.steps');
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      title={ t('pages.signConnect.modal.howToApplyForIdOne.title') }
      subtitle={ t('pages.signConnect.modal.howToApplyForIdOne.context') }
      maxWidth={800}
      bgcolor={theme.palette.background.slate}
    >
      <Card 
        variant="outlined" 
        className="p-4 bg-blue-50! border-2! border-blue-200!"
      >
        <Typography variant="subtitle2" component="h3" className="font-normal!" color={theme.palette.text.darkBlue}>{ t('pages.signConnect.modal.howToApplyForIdOne.eligibility.title') }</Typography>
        <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
          {Array.isArray(ELIGIBILITY_REQUIREMENTS) && ELIGIBILITY_REQUIREMENTS.map((requirement: string, i: number) => (
            <ListItem key={`requirement-${i}`}>
              <ListItemText primary={requirement} slotProps={{ primary: { sx: { fontSize: '14px'} } }} />
            </ListItem>
          ))}
        </List>
      </Card>
      <Spacer height={30} />
      <Typography 
        variant="h6" 
        component="h3" 
        className="mb-4!"
      >{ t('pages.signConnect.modal.howToApplyForIdOne.applicationSteps.title') }</Typography>
      {Array.isArray(APPLICATION_STEPS) && APPLICATION_STEPS.map((step, s) => (
        <React.Fragment key={`application-step-${s}`}>
          <Box 
            className={`flex items-top mb-3`} 
          >
            <StyledIcon 
              icon={s + 1} 
              variant="blue-inverted"
              size={24}
              className="mr-3 shrink-0"
            />
            <Box component="div" className="w-full">
              <Box component="div" className="mb-3">
                <Typography 
                  variant="body1" 
                  component="h4"
                >{step.title}</Typography>
                <Typography 
                  variant="caption" 
                  component="p"
                >{ s === 1 ? subSlot(step.context, '{code}', <Tag variant="blue" label="TPLUS@T6LK30" className="inline-flex! font-bold!" />) : step.context }</Typography>
              </Box>
              {s === 0 && 
                <Grid container spacing={2} className="mb-3">
                  <Grid size={{ xs: 12, sm: 6 }} className="flex flex-col items-center">
                    <Box component="div" className="p-2 bg-white border-2! border-gray-200! rounded-xl mb-3">
                      <img src="/assets/images/iDOne-step1-ios.png" alt="ID One Step 1 for iOS" width="100" />
                    </Box>
                    <Button 
                      variant="outlined" 
                      href="https://apps.apple.com/hk/app/tradelink-sign/id6480483296" 
                      className="w-full"
                      startIcon={<img src="/assets/icons/icon-apple.svg" alt="Apple" width="16" />}
                    >App Store</Button>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }} className="flex flex-col items-center">
                    <Box component="div" className="p-2 bg-white border-2! border-gray-200! rounded-lg mb-3">
                      <img src="/assets/images/iDOne-step1-android.png" alt="ID One Step 1 for Android" width="100" />
                    </Box>
                    <Button 
                      variant="outlined" 
                      href="https://play.google.com/store/apps/details?id=com.tradelink.sign" 
                      className="w-full"
                      startIcon={<img src="/assets/icons/icon-google-play.svg" alt="Google Play" width="16" />}
                    >Google Play</Button>
                  </Grid>
                </Grid>
              }
            </Box>            
            {s === 1 && <Box component="div" className="p-1 border! border-gray-200! rounded-lg ml-3"><img src="/assets/images/iDOne-step2.png" alt={step.title} width="300" /></Box>}
          </Box>
        </React.Fragment>        
      ))}
      <Card 
        variant="outlined" 
        className="p-4 bg-green-50! border-2! border-green-200!"
      >
        <Typography 
          variant="subtitle2" 
          component="h3" 
          className="font-normal!" 
          color={theme.palette.text.green}
        >{ t('pages.signConnect.modal.howToApplyForIdOne.processTime.title') }
        </Typography>
        <Typography 
          variant="caption" 
          component="p"
        >{ t('pages.signConnect.modal.howToApplyForIdOne.processTime.body') }
        </Typography>
      </Card>
    </InfoModal>
  );
}

