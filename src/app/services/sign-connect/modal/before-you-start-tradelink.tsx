'use client';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, Typography } from '@mui/material';

import theme from '@/theme/theme';
import { InfoModal, Spacer, StyledIcon, Tag } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalBeforeYouStartTradelink({ open, onClose }: ModalProps) {
  const t = useTranslations();
  const router = useRouter();
  const TRADELINK_NOTES = t('pages.signConnect.modal.beforeYouStartTradelink.notes');
  
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
      bgcolor="#F8FAFC"
    >
      <Typography variant="h3" component="h2" className="mb-4">{ t('pages.signConnect.modal.beforeYouStartTradelink.title') }</Typography>
      <Typography variant="body1" component="p" color={theme.palette.text.secondary}>{ t('pages.signConnect.modal.beforeYouStartTradelink.body') }</Typography>
      <Spacer height={30} />
      {Array.isArray(TRADELINK_NOTES) && TRADELINK_NOTES.map((note, s) => (
        <Box className="flex items-top mb-3" key={`note-${s}`}>
          <StyledIcon 
            icon={s + 1} 
            variant="blue"
            size={24}
            className="mr-3 shrink-0"
          />
          <Box>
            <Typography variant="body1" component="h4">{note.text}</Typography>
            <Typography variant="caption" component="p" dangerouslySetInnerHTML={{ __html: note.description }} />
          </Box>
        </Box>
      ))}
      <Card variant="outlined" className="p-3 bg-orange-50! border-orange-200!">
        <Box className="flex items-center">
          <Tag
            className='text-only text-orange-700!'
            variant="transparent"
            label={ t('pages.signConnect.modal.beforeYouStartTradelink.warning') }
            startIcon={ getSVGIcon('triangle-alert', 16, theme.palette.text.orange) }
          />
        </Box>
      </Card>
      <Spacer height={30} />
      <Box className="flex justify-center">
        <Button
          variant="contained"
          onClick={() => {
            const link = t('pages.signConnect.modal.beforeYouStartTradelink.link');
            if (link.startsWith('http')) {
              window.open(link, '_blank');
            } else {
              router.push(link);
            }
          }}
          sx={{ width: 'auto' }}
        >
          { t('pages.signConnect.modal.beforeYouStartTradelink.buttonText') }
        </Button>
      </Box>
    </InfoModal>
  );
}

