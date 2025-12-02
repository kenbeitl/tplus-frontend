'use client';

import { useMemo, useState } from 'react';
import { Box, Button, Card, Grid, InputAdornment, Stack, TextField as MuiTextField, Typography, styled } from '@mui/material';
import { Search } from 'lucide-react';

// modals
import HelpCentreModal from './modal';
import { Spacer, ButtonWithFormModal } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getLucideIcon } from '@/helpers/utils';
import theme from '@/theme/theme';

type CardId = 'digital' | 'signing' | 'subscription' | null;
const CONTACT_SUPPORT_TEMPLATE_ID = 'contact-support';

const TextField = styled(MuiTextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    height: 34,
    fontSize: 14,
  },
});

export default function HelpCentreClient() {
  const t = useTranslations();
  const [openCard, setOpenCard] = useState<CardId>(null);
  const handleOpen = (id: CardId) => setOpenCard(id);
  const handleClose = () => setOpenCard(null);

  const translations = useMemo(() => {
    return {
      pageIndex: t('pages.helpCentre.pageIndex'),
      cards: t('pages.helpCentre.cards'),
    }
  }, [t])

  return (
   <>
    <Typography sx={{ fontWeight: 700 }} variant="h4" component="h1">{ t('pages.helpCentre.title') }</Typography>
    <Spacer height={10} />
    <Typography variant="body2" component="p">{ t('pages.helpCentre.context') }</Typography>
    <Spacer height={15} />
    <Box sx={{ width: '100%', maxWidth: 450 }}>
      <TextField
        fullWidth
        placeholder={ t('pages.helpCentre.searchPlaceholder') }
        variant="outlined"
        size="medium"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} style={{ color: '#8a8d91' }} />
              </InputAdornment>
            ),
          }
        }}
      />
    </Box>
    <Spacer height={20} />
    {/* search bar */}
    <Grid container spacing={2}>

      {Array.isArray(translations.pageIndex) && translations.pageIndex.map((item, index) => (
        <Grid key={`hc-index-${index}`} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }} onClick={() => handleOpen(item.id as CardId)}>
            <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
              { getLucideIcon(item.icon, 24) }
              <Typography variant="h6" component="h2">{item.title}</Typography>
            </Box>
            <Typography sx={{ mt: 2 }} variant="body2" component="p">
              { item.description }
            </Typography>
          </Card>
        </Grid>
      ))}

      {Array.isArray(translations.cards) && translations.cards.map((item, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`hc-card-${index}`}>
          <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
              { getLucideIcon(item.icon, 24) }
              <Typography variant="h6" component="h2">{item.title}</Typography>
            </Box>
            <Spacer height={10} />
            <Stack spacing={0} sx={{ mt: 0 }}>
              {Array.isArray(item.list) && item.list.map((point: {text: string, link: string}, p: number) => (
                <Button
                  key={`hc-card-${index}-point-${p}`} 
                  endIcon={ getLucideIcon('square-arrow-out-up-right', 16, theme.palette.text.secondary) }
                  // href={point.link}
                  sx={{ 
                    justifyContent: 'flex-start', 
                    gap: 0.5
                  }}
                >
                  {point.text}
                </Button>
              ))}
            </Stack>
          </Card>
        </Grid>
      ))}
      <Grid size={{ xs: 12, sm: 12, md: 12 }}>
        <Card variant="outlined" className="p-6" sx={{ height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <Typography variant="h6" component="h2">{ t('pages.helpCentre.stillNeedHelp.title') }</Typography>
          </Box >
          <Spacer height={5} />
          <Typography sx={{ mt: 0 }} variant="body2" component="p">
            { t('pages.helpCentre.stillNeedHelp.body') }
          </Typography>
          <Spacer height={20} />
          <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
            <ButtonWithFormModal
                templateId={CONTACT_SUPPORT_TEMPLATE_ID} 
                buttonText={t('common.contactSupport')}
                buttonProps={{
                  sx:{ width: 'auto' }
                }}                
            />
            <Button 
              sx={{ 
                width: 'auto',
                color: '#000000',
                borderColor: '#C4C4C4',
                borderWidth: '1px',
                borderStyle: 'solid',
                '&:hover': {
                  backgroundColor: 'transparent'
                }
              }}
            >{t('pages.helpCentre.scheduleACall')}</Button>
          </Box>
        </Card>
      </Grid>
    </Grid>

    <HelpCentreModal 
      open={openCard !== null && ['digital', 'signing', 'subscription'].includes(openCard)} 
      onClose={handleClose} 
      content={t('pages.helpCentre.modal.' + openCard)}
    />
   </>
  );
}
