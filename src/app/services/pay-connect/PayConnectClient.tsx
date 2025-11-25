'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { ButtonWithModal, Carousel, Tag, Spacer, StyledIcon } from '@/components';
import ProviderModal from './modal/provider-modal';
import { useTranslations } from '@/contexts/AppContext';
import { getLucideIcon } from '@/helpers/utils';

export default function PayConnectClient() {

    const t = useTranslations();

    const getProviderCount = (key: string) => {
        const providers = t(`pages.payConnect.modal.${key}.providers`);
        return Array.isArray(providers) ? providers.length : 0;
    };

    const DIALOG_CARD = t('pages.payConnect.cards');

    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.payConnect.title") }</Typography>
            <Typography variant="body2" component="p">{ t("pages.payConnect.context") }</Typography>
            <Spacer height={20} />
            <Tag label={ t('pages.payConnect.sponsoredPartnerOffers') } className="text-base! text-only" startIcon={<Sparkles className="h-4 w-4 text-amber-500" />} />
            <Spacer height={20} />
            <Carousel slideNum={2} />
            <Spacer height={40} />
            <Grid container spacing={2}>
                {Array.isArray(DIALOG_CARD) && DIALOG_CARD.map((item) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                        <Card variant="outlined" className="p-6 card-hover" sx={{ height: '100%' }}>
                            <Box className="flex items-center">
                            <StyledIcon
                                icon={getLucideIcon(item.icon)} 
                                variant="blue-gradient"
                                size={36}
                                square
                                className="mr-3 shrink-0"
                            />
                            <Box>
                                <Typography variant="body1" component="h4">{item.title}</Typography>
                            </Box>
                            </Box>
                            <Typography sx={{ mt: 2 }} variant="body2" component="p">{item.description}</Typography>
                            <Spacer height={20} />
                            <Card variant="outlined" className="p-3 border-2! bg-blue-50! border-blue-200! center-layout">
                                <StyledIcon 
                                    icon={getProviderCount(item.type)} 
                                    variant="transparent"
                                />
                                <Typography variant="caption" component="p">{ t('pages.payConnect.serviceProvidersAvailable') }</Typography>
                            </Card>
                            <Spacer height={20} />
                            <ButtonWithModal
                                buttonProps={{
                                    variant: 'gradient',
                                    color: 'blue',
                                    className: 'w-full',
                                }}
                                buttonText={ t('pages.payConnect.viewAllProviders') }
                                buttonEndIcon={<ArrowRight />}
                                modalContent={(open: boolean, onClose: () => void) => 
                                    <ProviderModal 
                                        open={open} 
                                        onClose={onClose} 
                                        type={item.type} 
                                        emoji={item.emoji} 
                                    />
                                }
                            /> 
                        </Card>
                    </Grid>        
                ))}        
            </Grid>
        </>
    );
}
