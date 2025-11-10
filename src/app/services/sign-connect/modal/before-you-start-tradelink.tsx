'use client';
import { Box, Card, Link, Typography } from '@mui/material';
import InfoModal from '@/components/InfoModal';
import Spacer from '@/components/ui/Spacer';
import theme from '@/theme/theme';
import StyledIcon from '@/components/StyledIcon';
import Tag from '@/components/Tag';
import ActionButton from '@/components/ActionButton';
import { TriangleAlert } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
};

const TRADELINK_NOTES = [
  {
    title: 'Digital Identity Required',
    context: 'You\'ll need a certified digital identity: iAM Smart or iD-One.',
    remarks: <>Not sure which one to choose? <Link variant='caption' href="/help-centre" sx={{ color: theme.palette.text.blue }} underline="hover">View here for a quick comparison and application steps.</Link></>,
  },
  {
    title: 'Email Registration on DMSS',
    context: 'You must register using the same email you used for T+, which will be auto-filled when you proceed.',
  },
  {
    title: 'Single Sign-On (SSO)',
    context: 'Once registered, your T+ and DMSS account will be connected for seamless future sign-ins.',
  }
]

export default function ModalBeforeYouStartTradelink({ open, onClose }: Props) {
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>Before You Start</Typography>
      <Typography variant="body2" component="p">To sign documents via Tradelink, please note:</Typography>
      <Spacer height={20} />
      {TRADELINK_NOTES.map((note, s) => (
        <Box className="flex items-top mb-3" key={`note-${s}`}>
          <StyledIcon 
            icon={s + 1} 
            variant="blue"
            size={24}
            className="mr-3"
          />
          <Box>
            <Typography variant="body1" component="h4">{note.title}</Typography>
            <Typography variant="caption" component="p">{note.context}</Typography>
            {note.remarks && (
              <Typography variant="caption" component="p">{note.remarks}</Typography>
            )}
          </Box>
        </Box>
      ))}
      <Card variant="outlined" className="p-3 bg-orange-50! border-orange-200!">
        <Box className="flex items-center">
          <Tag
            className='text-only text-orange-700!'
            variant="transparent"
            label="If you register DMSS using iAM Smart, SSO will not be available."
            startIcon={<TriangleAlert size={16} color={theme.palette.text.orange} />}
          />
        </Box>
      </Card>
      <Spacer height={20} />
      <Box className="flex justify-center">
        <ActionButton
          autoWidth 
          noIcon
          buttonText='Continue to sign document'
          onClick="https://dmss.tradelink.com.hk/dmss/web/login?lang=en_US"
        />
      </Box>
    </InfoModal>
  );
}

