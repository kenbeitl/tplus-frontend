'use client';
import { Box, Card, Typography } from '@mui/material';
import { InfoModal, Spacer, StyledIcon, Tag, ActionButton } from '@/components';
import theme from '@/theme/theme';
import { TriangleAlert } from 'lucide-react';
import { useTranslations } from '@/contexts/AppContext';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ModalBeforeYouStartTradelink({ open, onClose }: Props) {
  const t = useTranslations();
  const TRADELINK_NOTES = t('pages.signConnect.modal.beforeYouStartTradelink.notes');
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>{ t('pages.signConnect.modal.beforeYouStartTradelink.title') }</Typography>
      <Typography variant="body2" component="p">{ t('pages.signConnect.modal.beforeYouStartTradelink.body') }</Typography>
      <Spacer height={20} />
      {Array.isArray(TRADELINK_NOTES) && TRADELINK_NOTES.map((note, s) => (
        <Box className="flex items-top mb-3" key={`note-${s}`}>
          <StyledIcon 
            icon={s + 1} 
            variant="blue"
            size={24}
            className="mr-3"
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
            startIcon={<TriangleAlert size={16} color={theme.palette.text.orange} />}
          />
        </Box>
      </Card>
      <Spacer height={20} />
      <Box className="flex justify-center">
        <ActionButton
          autoWidth 
          noIcon
          buttonText={ t('pages.signConnect.modal.beforeYouStartTradelink.buttonText') }
          onClick="https://dmss.tradelink.com.hk/dmss/web/login?lang=en_US"
        />
      </Box>
    </InfoModal>
  );
}

