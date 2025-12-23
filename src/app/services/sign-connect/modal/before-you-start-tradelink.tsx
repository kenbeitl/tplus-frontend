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
    
    if (!accessToken) {
      console.error('No access token available');
      window.open(t('pages.signConnect.modal.beforeYouStartTradelink.link'), '_blank');
      return;
    }

    setIsEstablishingSession(true);

    // Create hidden iframe to establish Keycloak session
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    
    // Build Keycloak auth endpoint URL with token
    const keycloakBaseUrl = process.env.NEXT_PUBLIC_KEYCLOAK_ISSUER || '';
    const redirectUri = encodeURIComponent(t('pages.signConnect.modal.beforeYouStartTradelink.link'));
    
    // Use Keycloak's token exchange or session establishment endpoint
    // This creates a Keycloak session cookie in the browser
    iframe.src = `${keycloakBaseUrl}/protocol/openid-connect/auth?` +
      `client_id=${process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID}` +
      `&redirect_uri=${redirectUri}` +
      `&response_type=code` +
      `&scope=openid` +
      `&prompt=none` +
      `&id_token_hint=${accessToken}`;
    
    document.body.appendChild(iframe);

    // Wait for iframe to load (session established), then open DMSS
    iframe.onload = () => {
      setTimeout(() => {
        // Session should now be established, open DMSS
        window.open(t('pages.signConnect.modal.beforeYouStartTradelink.link'), '_blank');
        
        // Cleanup
        document.body.removeChild(iframe);
        setIsEstablishingSession(false);
      }, 500); // Small delay to ensure session is fully established
    };

    // Fallback in case iframe fails to load
    iframe.onerror = () => {
      console.error('Failed to establish Keycloak session');
      window.open(t('pages.signConnect.modal.beforeYouStartTradelink.link'), '_blank');
      document.body.removeChild(iframe);
      setIsEstablishingSession(false);
    };
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

