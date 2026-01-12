'use client';
import { Box, Link, Paper, Typography } from '@mui/material';
import { InfoModal, Emoji } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import theme from '@/theme/theme';

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  emoji: string;
  source: string;
};

export default function ProviderDetails({ open, onClose, name, emoji, source }: Props) {
  const t = useTranslations();
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Box className="flex items-center mb-2">
        <Emoji symbol={emoji} size={36} className="mr-3" />
        <Typography variant="h5" component="h2" className="mb-4">{name}</Typography>
      </Box>
      <Typography variant="body2" component="p">{ t('pages.payConnect.detailedProductInfoFeatures') }</Typography>
      <Box 
        component="div"
        className="mt-12 mx-8 mb-8 border-dashed border-2 border-gray-300 rounded-xl bg-gray-200!"
      >
        <Paper className="aspect-[16/10] flex flex-col items-center justify-center bg-transparent! overflow-hidden" elevation={0}>
          <Emoji symbol={emoji} size={100} />
          <Typography variant="body1" component="div" color={theme.palette.text.primary}>Detailed product information image from { name }</Typography>
          <Typography variant="body1" component="div" color={theme.palette.text.primary}>Full service details, pricing, and specifications</Typography>
        </Paper>
      </Box>
    </InfoModal>
  );
}

