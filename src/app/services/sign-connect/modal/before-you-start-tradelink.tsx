'use client';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import theme from '@/theme/theme';
import { InfoModal, Spacer, StyledIcon, Tag, ActionButton } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalBeforeYouStartTradelink({ open, onClose }: ModalProps) {
  const t = useTranslations();
  const { data: session } = useSession();
  const TRADELINK_NOTES = t('pages.signConnect.modal.beforeYouStartTradelink.notes');
  const [isEstablishingSession, setIsEstablishingSession] = useState(false);
  
  const handleContinue = () => {
    const accessToken = (session as any)?.accessToken;
    const idToken = (session as any)?.idToken;
    
    if (!accessToken) {
      console.error('No access token available');
      window.open(t('pages.signConnect.modal.beforeYouStartTradelink.link'), '_blank');
      return;
    }

    setIsEstablishingSession(true);

    // Build Keycloak auth endpoint URL to establish session
    const keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || '';
    const dmssUrl = t('pages.signConnect.modal.beforeYouStartTradelink.link');
    const redirectUri = encodeURIComponent(dmssUrl);
    
    // Use Keycloak's silent authentication to establish session cookie
    // This will redirect directly to DMSS after establishing the session
    const authUrl = `${keycloakBaseUrl}/protocol/openid-connect/auth?` +
      `client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=openid` +
      `&prompt=none` +
      `&id_token_hint=${idToken}`;
    
    // Open popup to establish Keycloak session, then it auto-redirects to DMSS
    const popup = window.open(authUrl, '_blank', 'width=600,height=600');
    
    // Monitor popup - if it successfully redirects to DMSS, we're done
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        setIsEstablishingSession(false);
      }
    }, 500);

    // Reset loading state after 3 seconds regardless
    setTimeout(() => {
      setIsEstablishingSession(false);
      clearInterval(checkPopup);
    }, 3000);
  };
  
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
      <Spacer height={20} />
      <Box className="flex justify-center">
        <ActionButton
          autoWidth 
          noIcon
          buttonText={ isEstablishingSession ? 'Connecting to DMSS...' : t('pages.signConnect.modal.beforeYouStartTradelink.buttonText') }
          onClick={ handleContinue }
          disabled={ isEstablishingSession }
          startIcon={ isEstablishingSession ? <CircularProgress size={16} /> : undefined }
        />
      </Box>
    </InfoModal>
  );
}

