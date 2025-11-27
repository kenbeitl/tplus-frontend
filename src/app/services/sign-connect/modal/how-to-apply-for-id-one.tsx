'use client';

import theme from '@/theme/theme';
import { Box, Card, List, ListItem, ListItemText, Typography } from '@mui/material';
import { InfoModal, Spacer, StyledIcon } from '@/components';
import { useTranslations } from '@/contexts/AppContext';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalHowToApplyForIDOne({ open, onClose }: ModalProps) {
  const t = useTranslations();
  const ELIGIBILITY_REQUIREMENTS = t('pages.signConnect.modal.howToApplyForIdOne.eligibility.requirements');
  const APPLICATION_STEPS = t('pages.signConnect.modal.howToApplyForIdOne.applicationSteps');
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 1 }}>{ t('pages.signConnect.modal.howToApplyForIdOne.title') }</Typography>
      <Typography variant="body2" component="p">{ t('pages.signConnect.modal.howToApplyForIdOne.context') }</Typography>
      <Spacer height={20} />
      <Card 
        variant="outlined" 
        className="p-4 bg-blue-50! border-2! border-blue-200!"
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.darkBlue, mb: 1 }}>{ t('pages.signConnect.modal.howToApplyForIdOne.eligibility.title') }</Typography>
        <List sx={{ color: theme.palette.text.blue, fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
          {Array.isArray(ELIGIBILITY_REQUIREMENTS) && ELIGIBILITY_REQUIREMENTS.map((requirement: string, i: number) => (
            <ListItem key={`requirement-${i}`} sx={{ py: 0 }}>
              <ListItemText primary={requirement} />
            </ListItem>
          ))}
        </List>
      </Card>
      <Spacer height={20} />
      <Typography variant="h6" component="h3" sx={{ mb: 1 }}>{ t('pages.signConnect.modal.howToApplyForIdOne.applicationSteps.title') }</Typography>
      {Array.isArray(APPLICATION_STEPS) && APPLICATION_STEPS.map((step, s) => (
        <Box className="flex items-top mb-3" key={`step-${s}`}>
          <StyledIcon 
            icon={s + 1} 
            variant="blue-inverted"
            size={24}
            className="mr-3"
          />
          <Box>
            <Typography variant="body1" component="h4">{step.title}</Typography>
            <Typography variant="caption" component="p">{step.context}</Typography>
          </Box>
        </Box>
      ))}
      <Spacer height={10} />
      <Card 
        variant="outlined" 
        className="p-4 bg-green-50! border-2 border-green-200!"
      >
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: theme.palette.text.green, mb: 1 }}>{ t('pages.signConnect.modal.howToApplyForIdOne.processTime.title') }</Typography>
        <Typography variant="caption" component="p">{ t('pages.signConnect.modal.howToApplyForIdOne.processTime.body') }</Typography>
      </Card>
    </InfoModal>
  );
}

