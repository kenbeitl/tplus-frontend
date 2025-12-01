'use client';

import { Box, Card, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Building, ExternalLink, Eye } from 'lucide-react';
import { InfoModal, StyledIcon, Spacer, Emoji, ButtonWithModal, ButtonWithFormModal } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import ProviderDetails from '@/app/services/pay-connect/modal/provider-details';
import { substituteSlot } from '@/helpers/utils';

interface Provider {
  name: string;
  context: string;
  features?: string[];
  coverage?: string;
  fees?: string;
  minDeposit?: string;
  successRate?: string;
  processingTime?: string;
  details?: string;
  formId?: string; // Optional: specific formId for this provider
}

type Props = {
  open: boolean;
  onClose: () => void;
  type: string;
  emoji: string;
};

export default function ProviderModal({ open, onClose, type, emoji }: Props) {
  const t = useTranslations();
  const modalNode = `pages.payConnect.modal.${type}`;
  const providerList = Array.isArray(t(`${modalNode}.providers`)) ? t(`${modalNode}.providers`) : [];
  const providerCount = providerList.length || 0;
  
  return (
    <InfoModal
      open={open}
      onClose={onClose}
      maxWidth={768}
    >
      <Box className="flex items-center">
        <StyledIcon
          icon={<Building size={18} />} 
          variant="blue-gradient"
          size={36}
          square
          className="mr-3"
        />
        <Box>
          <Typography variant="body1" component="h4">{ t(`${modalNode}.title`) }</Typography>
          <Typography variant="caption" component="p" sx={{ color: 'text.secondary' }}>{ t(`${modalNode}.context`) }</Typography>
        </Box>
      </Box>
      <Spacer height={30} />
      <Typography variant="caption" component="p" sx={{ color: 'text.secondary' }}>{ substituteSlot(t('pages.payConnect.compareSelectProvider'), '{slot}', providerCount) }</Typography>
      <Spacer height={20} />
      <Grid container spacing={2}>
        {providerList.map((provider: Provider, index: number) => (
          <Grid key={index} size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" className="p-4 h-full">
              <Box className="flex items-center mb-4">
                <Emoji symbol={emoji} size={40} />
                <Typography variant="h6" component="h3" sx={{ ml: 2 }}>{ provider.name }</Typography>
              </Box>
              <Typography variant="h6" component="p" sx={{ color: 'text.secondary' }}>{ provider.context }</Typography>
              <Spacer height={20} />
              <Typography variant="subtitle1" component="p">{ t('pages.payConnect.keyFeatures') }</Typography>
              <List sx={{ color: 'text.primary', fontSize: 12, py: 0, pl: 2, listStyleType: 'disc', '& .MuiListItem-root': { display: 'list-item' } }}>
                {provider.features?.map((feature: string, f_idx: number) => (
                  <ListItem key={`features-${f_idx}`} sx={{ py: 0 }}>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
              <Spacer height={20} />
              <Box className="p-3 bg-gray-50 rounded">
                <Grid container spacing={2}>
                  {provider.coverage && (
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        { t('pages.payConnect.coverage') }
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {provider.coverage}
                      </Typography>
                    </Grid>
                  )}
                  {provider.minDeposit && (
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        { t('pages.payConnect.minDeposit') }
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        ${Number(provider.minDeposit).toLocaleString('en-US')}
                      </Typography>
                    </Grid>
                  )}
                  {provider.fees && (
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        { t('pages.payConnect.fees') }
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {provider.fees}
                      </Typography>
                    </Grid>
                  )}
                  {provider.successRate && (
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        { t('pages.payConnect.successRate') }
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {provider.successRate}
                      </Typography>
                    </Grid>
                  )}
                  {provider.processingTime && (
                    <Grid size={6}>
                      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                        { t('pages.payConnect.processingTime') }
                      </Typography>
                      <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                        {provider.processingTime}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
              {provider.details && (
                <>
                  <Spacer height={20} />
                  <ButtonWithModal
                    buttonText={ t('pages.payConnect.viewDetailedInformation') }
                    buttonProps={{
                      variant: 'outlined',
                      sx: { width: '100%' }
                    }}
                    buttonStartIcon={<Eye size={16} />}
                    modalContent={(open: boolean, onClose: () => void) => <ProviderDetails open={open} onClose={onClose} name={provider.name} emoji={emoji} source={provider.details || ''} />}
                  />
                </>
              )}
              <Spacer height={provider.details ? 10 : 20} />
              <ButtonWithFormModal
                  templateId="payconnect-service-providers"
                  formId={`payconnect-service-providers@${provider.formId}`}
                  buttonText={ t('pages.payConnect.useService') }
                  buttonProps={{
                    variant: 'gradient',
                    sx: { width: '100%' }
                  }}
                  buttonStartIcon={<ExternalLink size={16} />}
                />
            </Card>
          </Grid>
        ))}
      </Grid>
    </InfoModal>
  );
}

