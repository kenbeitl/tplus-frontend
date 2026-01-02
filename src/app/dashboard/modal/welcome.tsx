'use client';

import { useMemo, useState } from 'react';
import { Box, Card, Checkbox, Chip, FormControlLabel, Grid, Paper, Typography } from '@mui/material';
import Modal from '@/components/Modal';
import { getSVGIcon } from '@/helpers/utils';
import theme from '@/theme/theme';
import { useTranslations } from '@/contexts/AppContext';
import { ActionButton, Emoji, StyledIcon } from '@/components';
import { useRouter } from 'next/navigation';

interface WelcomeProps {
  open: boolean;
  onClose: () => void;
  onDontShowAgain: (dontShow: boolean) => void;
}

export default function ModalWelcome({ 
  open, 
  onClose,
  onDontShowAgain
}: WelcomeProps) {
  const t = useTranslations();
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleClose = () => {
    onDontShowAgain(dontShowAgain);
    onClose();
  };

  const translations = useMemo(() => {
    const welcomeModal = t('pages.dashboard.modal.welcome');
    const step1 = welcomeModal.step1;
    const step2 = welcomeModal.step2;
    const proTip = welcomeModal.proTip;
    return {
      welcomeModal,
      step1,
      step2,
      proTip,
    }
  }, [t])

  const router = useRouter();

  return (
    <Modal open={open} onClose={handleClose} maxWidth={800} sx={{ p: 0, scrollbarGutter: 'auto', overflow: 'hidden' }}>
        <Box component="div" className={`relative ${theme.palette.gradientClasses.blueIndigoDark}`} sx={{ p: 4 }}>
          <Box component="div" className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></Box>
          <Box component="div" className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full -ml-18 -mb-18"></Box>
          <Box component="div" className="flex items-top">
              <StyledIcon icon={getSVGIcon('sparkles', 24, theme.palette.text.yellow)} variant="opacity" size={48} className="mr-3" />
              <Box component="div">
                <Typography variant="h3" component="h2" color={theme.palette.text.white} sx={{ mb: 3 }}>{ translations.welcomeModal.title }</Typography>
                <Typography variant="body1" component="p" color={theme.palette.text.white}>{ translations.welcomeModal.context }</Typography>
              </Box>              
          </Box>          
        </Box>

        <Box component="div" className={theme.palette.gradientClasses.grayLight} sx={{ p: 3, pt: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Card 
                  elevation={2}
                  variant="elevation" 
                  className="relative p-3 lg:p-6 gap-4 center-layout h-full card-hover"
              >
                <Box component="div" className={`absolute top-0 left-0 right-0 h-1 ${theme.palette.gradientClasses.iconBlueIndigo}`}></Box>
                <Chip 
                  label={translations.step1.title} 
                  sx={{
                    p: 1.5,
                    color: theme.palette.text.white, 
                    background: 'linear-gradient(135deg, #3B82F6, #4F46E5)',
                    '& .MuiChip-label': {
                      fontSize: '18px',
                    },
                  }}
                  icon={<StyledIcon icon={<Typography color={theme.palette.text.white}>1</Typography>} size={20} variant="opacity" />}
                />
                <Box className={`relative flex items-center justify-center w-16 h-16 ${theme.palette.gradientClasses.iconBlueLight} rounded-full border-4 border-white shadow-lg`}>
                    { getSVGIcon('user', 32, theme.palette.text.blue) }
                </Box>
                <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
                  { translations.step1.description }
                </Typography>
                <Paper variant="outlined" className="p-2 bg-blue-50! border-blue-200!">
                    <Box component="div" className="flex items-top gap-3">
                      <Box className="shrink-0">{ getSVGIcon('circle-check-big', 16, theme.palette.text.blue) }</Box>
                      <Typography variant="subtitle2" component="p" color={theme.palette.text.blue} sx={{ textAlign: 'left' }}>{ translations.step1.check }</Typography>
                    </Box>
                </Paper>
                <ActionButton
                  buttonText={ translations.step1.button }
                  endIcon={getSVGIcon('arrow-right', 20, '#FFFFFF')}
                  onClick={() => router.push('/settings')}
                />
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 1 }}>
              <Box 
                  component="div"
                  className="p-3 lg:p-6 gap-4 center-layout h-full"
              >
                <Box component="div" className={`flex items-center justify-center w-10 h-10 ${theme.palette.gradientClasses.iconBlueIndigoBg} rounded-full shadow-lg`}>
                  <StyledIcon icon={getSVGIcon('arrow-right', 20, '#FFFFFF')} variant="blue-gradient" size={40} />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 5 }}>
              <Card 
                  elevation={2}
                  variant="elevation" 
                  className="relative p-3 lg:p-6 gap-4 center-layout h-full card-hover"
              >
                <Box component="div" className={`absolute top-0 left-0 right-0 h-1 ${theme.palette.gradientClasses.greenEmeraldTeal}`}></Box>
                <Chip 
                  label={translations.step2.title} 
                  sx={{
                    p: 1.5,
                    color: theme.palette.text.white, 
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    '& .MuiChip-label': {
                      fontSize: '18px',
                    },
                  }}
                  icon={<StyledIcon icon={<Typography color={theme.palette.text.white}>2</Typography>} size={20} variant="opacity" />}
                />
                <Box className={`relative flex items-center justify-center w-16 h-16 ${theme.palette.gradientClasses.iconGreenLight} rounded-full border-4 border-white shadow-lg`}>
                    { getSVGIcon('list', 32, theme.palette.text.lightGreen) }
                </Box>
                <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
                  { translations.step2.description }
                </Typography>
                <Paper variant="outlined" className="p-2 bg-green-50! border-green-200!">
                    <Box component="div" className="flex items-top gap-3">
                      <Box className="shrink-0">{ getSVGIcon('circle-check-big', 16, theme.palette.text.lightGreen) }</Box>
                      <Typography variant="subtitle2" component="p" color={theme.palette.text.lightGreen} sx={{ textAlign: 'left' }}>{ translations.step2.check }</Typography>
                    </Box>
                </Paper>
                <ActionButton
                  buttonText={ translations.step2.goal }
                  startIcon={<Emoji symbol="✨" />}
                  variant="green-gradient"
                  border={`2px dashed ${theme.palette.text.lightGreen}`}
                />
              </Card>
            </Grid>
          </Grid>
          <Card className="mt-4">
            <Box className={`p-3.5 ${theme.palette.gradientClasses.indigoPurplePink} border border-indigo-200`}>
              <Box component="div" className="flex items-start gap-3">
                <Box component="div" className={`flex items-center justify-center w-8 h-8 ${theme.palette.gradientClasses.iconIndigoPurple} rounded-full shadow-md`}>
                  { getSVGIcon('sparkles', 16, '#FFFFFF') }
                </Box>
                <Box component="div" className="flex-1">
                  <Typography variant="h5" className="text-indigo-900 mb-1 text-sm font-medium">{ translations.proTip.title }</Typography>
                  <Typography variant="subtitle2" className="text-xs text-indigo-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: translations.proTip.description }} />
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>

        <Box component="div" className="bg-white" sx={{ py: 2, px: 4 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
              />
            }
            label={ translations.welcomeModal.dontShowAgain }
          />
        </Box>
    </Modal>
  );
}
