'use client';
import { useRouter } from 'next/navigation';

import theme from '@/theme/theme';
import { InfoModal } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { useMemo } from 'react';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { Box, Button, Card, Typography } from '@mui/material';

type docTypes = "hkid" | "e-Passport";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  docType: docTypes | null;
  handleContinue: () => void;
};

interface signingPlatformProps {
  signVia: string;
  platform: string;
  platformLink: string;
  logo: string;
  digitalSigning: string;
  buttonText: string;
  buttonLink: string;
}

export default function ModalBeforeYouStart({ open, onClose, docType, handleContinue }: ModalProps) {
  const t = useTranslations();

  const router = useRouter();

  const translations = useMemo(() => {
    const modal = t('pages.signConnect.modal.beforeYouStart');
    const selectedDigitalSigning = docType ? t('pages.signConnect.digitalSigning')[docType] as signingPlatformProps : null;
    const selectedPlatform = selectedDigitalSigning ? selectedDigitalSigning.platform : '';
    return {
      modal,
      selectedDigitalSigning,
      selectedPlatform
    }
  }, [t, docType]);

  const handleNavigate = (link: string) => {
    if (!link) return;
    
    if (link === 'open-modal') {
      handleContinue();
      return;
    }
    
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      router.push(link);
    }
  }

  return (
    <InfoModal
      open={open}
      onClose={onClose}
      title={translations.modal.title}
      subtitle={subSlot(translations.modal.context, '{slot}', translations.selectedDigitalSigning ? translations.selectedDigitalSigning.signVia : '') as string}
      maxWidth={800}
      bgcolor={theme.palette.background.slate}
    >
      <Card variant="outlined" className="p-3 mb-6! bg-blue-50! border! border-blue-200! flex flex-col items-center">
        <Typography 
          variant="subtitle1" 
          component="h6" 
          className="font-bold! mb-5!" 
          color={theme.palette.text.darkBlue}
        >
          { subSlot(translations.modal.digitalIdentityRequired, '{digitalIdentity}', translations.selectedPlatform) }
        </Typography>
        <img 
          src={`/assets/logo/${translations.selectedDigitalSigning?.logo}`} 
          alt={translations.selectedPlatform} 
          width={150} 
        />
        <Button 
          variant="text" 
          color="primary" 
          className="mt-6!" 
          onClick={() => handleNavigate(translations.selectedDigitalSigning?.platformLink || '')} 
          endIcon={ getSVGIcon('arrow-right', 16) }
        >
          { subSlot(translations.modal.applyFor, '{digitalIdentity}', translations.selectedPlatform) }
        </Button>
      </Card>
      <Box component="div" className="flex justify-center gap-3">
        <Button variant="outlined" onClick={onClose}>{ t('common.cancel') }</Button>
        <Button variant="gradient" color="blue" onClick={() => handleNavigate(translations.selectedDigitalSigning?.buttonLink || '')}>{ subSlot(translations.modal.buttonText, '{signingPlatform}', translations.selectedDigitalSigning?.digitalSigning) }</Button>
      </Box>
    </InfoModal>
  );
}

