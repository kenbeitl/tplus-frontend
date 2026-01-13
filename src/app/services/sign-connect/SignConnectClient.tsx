'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import theme from '@/theme/theme';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { Spacer, StyledIcon, HeroSection, Carousel } from '@/components';
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
      <HeroSection
        title={ t("pages.signConnect.title") }
        description={ t("pages.signConnect.context") }
        icon={ getSVGIcon('file-signature', 24, '#FFFFFF') }
        colorScheme="indigo"
      />
      <Spacer height={30} />
      <Carousel slides={ t("pages.signConnect.slides") } />
      <Spacer height={30} />
      <Paper variant="outlined" className="flex flex-col items-center p-6 card-hover h-full">
        <Box className="w-45 h-45">
          <img src="/assets/images/SignConnect.jpg" alt={ t('pages.signConnect.signingPlatform.title') } />
        </Box>
        <Spacer height={30} />
        <Typography variant="h2" component="h2" className="mb-3!" sx={{ fontWeight: 400 }}>{ t('pages.signConnect.signingPlatform.title') }</Typography>
        <Typography variant="subtitle1" component="p" color={ theme.palette.text.secondary } sx={{ fontWeight: 400 }}>{ t('pages.signConnect.signingPlatform.context') }</Typography>
        <Spacer height={40} />
        <Grid container spacing={2} className="w-full">
          {Array.isArray(DIGITAL_SIGNING_PLATFORMS) && DIGITAL_SIGNING_PLATFORMS.map((platform, i) => (
            <Grid key={`dsp-${i}`} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" className={`p-6 h-full flex flex-col items-center ${platform.isActive ? 'border-2! border-blue-500! shadow-lg ring-2! ring-blue-200! bg-linear-to-br from-blue-50 to-indigo-50' : ''}`}>
                <StyledIcon 
                  icon={getSVGIcon(platform.icon)} 
                  variant={platform.isActive ? 'blue-gradient' : 'gray'}
                  square
                  size={50}
                />
                <Spacer height={30} />
                <Typography variant="h5" component="h3" sx={{ fontWeight: 400 }}>{platform.name}</Typography>
                <Typography variant="h6" component="p" sx={{ fontWeight: 400 }}>{platform.description}</Typography>
                <Spacer height={30} />
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
                <Button
                  className={platform.isActive ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white! hover:from-blue-700 hover:to-blue-800 transition-colors!' : ''}
                  variant={platform.isActive ? 'contained' : 'outlined'}
                  disabled={!platform.isActive}
                  onClick={platform.isActive ? (platform.action === 'open-modal' ? () => tradelinkModal.handleOpen() : undefined ) : undefined}
                  sx={{ width: '100%', mt: 'auto' }}
                >
                  {platform.isActive ? t('pages.signConnect.selectService') : t('common.comingSoon')}
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Spacer height={30} />
        <Box component="div" className="flex justify-center">
          <Button
            variant="text"
            onClick={() => router.push('/help-centre')}
          >
            { t('pages.signConnect.learnMoreAboutSigningPlatforms') }
          </Button>
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
