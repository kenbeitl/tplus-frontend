'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import theme from '@/theme/theme';
import { Box, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { Spacer, StyledIcon, ActionButton } from '@/components';
import { useModal } from '@/hooks/useModal';
import { useTranslations } from '@/contexts/AppContext';
import { ModalBeforeYouStartTradelink, ModalDigitalIdentityRequired } from './modal';
import { getSVGIcon } from '@/helpers/utils';

export default function SignConnectClient() {
  const t = useTranslations();
  const digitalIdentityModal = useModal();
  const tradelinkModal = useModal();
  const router = useRouter();

  const DIGITAL_SIGNING_PLATFORMS = t('pages.signConnect.signingPlatform.platforms');

  useEffect(() => {
    digitalIdentityModal.handleOpen();
  }, []);

  return (
    <>
      <Typography className="font-bold mb-4" variant="h4" component="h1">{ t("pages.signConnect.title") }</Typography>
      <Typography variant="body2" component="p">{ t("pages.signConnect.context") }</Typography>
      <Spacer height={20} />
      <Paper variant="outlined" className="flex flex-col items-center p-6 h-full">
        <StyledIcon 
          icon={ getSVGIcon('file-pen-line', 64) } 
          variant="custom"
          bgColor="transparent"
          textColor={theme.palette.text.secondary}
          size={80}
        />
        <Spacer height={20} />
        <Typography variant="h5" component="h2">{ t('pages.signConnect.title') }</Typography>
        <Spacer height={30} />
        <Typography variant="body2" component="p">{ t('pages.signConnect.context') }</Typography>
        <Spacer height={30} />
        <Grid container spacing={2} className="w-full">
          {Array.isArray(DIGITAL_SIGNING_PLATFORMS) && DIGITAL_SIGNING_PLATFORMS.map((platform, i) => (
            <Grid key={`dsp-${i}`} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" className={`p-6 h-full flex flex-col items-center ${platform.isActive ? 'border-2! border-blue-300!' : ''}`}>
                <StyledIcon 
                  icon={getSVGIcon(platform.icon)} 
                  variant={platform.isActive ? 'blue' : 'gray'}
                  square
                  size={50}
                />
                <Spacer height={20} />
                <Typography variant="h6" component="h3">{platform.name}</Typography>
                <Typography variant="caption" component="p" className="text-center">{platform.context}</Typography>
                <List className="text-left w-full">
                    {platform.list.map((point: string, p: number) => (
                      <ListItem key={p}>
                        <ListItemIcon>
                          { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                  <ActionButton
                    buttonText={platform.isActive ? t('pages.signConnect.selectService') : t('common.comingSoon')}
                    variant={platform.isActive ? 'gradient' : 'outlined'}
                    color={platform.isActive ? 'blue' : 'white'}
                    disabled={!platform.isActive}
                    onClick={platform.isActive ? (platform.action === 'open-modal' ? () => tradelinkModal.handleOpen() : undefined ) : undefined}
                    noIcon
                  />
              </Card>
            </Grid>
          ))}
        </Grid>
        <Spacer height={30} />
        <Box component="div" className="flex justify-center">
          <ActionButton
            buttonText={ t('pages.signConnect.learnMoreAboutSigningPlatforms') }
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
