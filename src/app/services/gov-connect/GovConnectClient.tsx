'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { Box, Card, Grid, Typography } from '@mui/material';
import { Spacer, Tag, ActionButton, ButtonWithFormModal, Checklist } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import { getSVGIcon } from '@/helpers/utils';

export default function GovConnectClient() {
    const t = useTranslations();
    const pathname = usePathname();
    const translations = useMemo(() => {
        return {
            govServices: t('pages.govConnect.services')
        }
    }, [t]);
    const GOV_SERVICES = translations.govServices;

    return (
        <Box component="div" className="relative">
            <Box component="div" className="flex items-baseline justify-between">
            <Typography className="font-bold mb-4" variant="h4" component="h1">{ t("pages.govConnect.title") }</Typography>
            <Tag label={ t('common.servicesAvailable') } startIcon={ getSVGIcon('circle-check-big') } variant="green" />
            </Box>
            <Typography variant="body2" component="p">{ t("pages.govConnect.context") }</Typography>
            <Spacer height={20} />
            <Grid container spacing={2}>
                {Array.isArray(GOV_SERVICES) && GOV_SERVICES.map((service, index: number) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`gov-service-${index}`}>
                        <Card 
                            variant="outlined" 
                            className="p-6" 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <Box className="flex items-top gap-1">
                                {getSVGIcon(service.icon, 24)}
                                <Typography variant="h6" component="h2">{service.title}</Typography>
                            </Box>
                            <Typography className="mt-8" variant="body2" component="p">{service.description}</Typography>
                            <Checklist items={service.features} />
                            {
                                service.id === 'govconnect-dual-declaration' && 
                                <ButtonWithFormModal
                                    templateId={service.id}
                                    buttonEndIcon={ getSVGIcon('arrow-right') }
                                    buttonText={t('common.applyNow')}
                                />
                            }
                            {
                                service.id === 'hs-code-ai-classifier' && 
                                <ActionButton
                                    buttonText={service.buttonText}
                                    endIcon={ getSVGIcon('arrow-right') }
                                    variant="gradient"
                                    onClick={`${pathname}/${service.id}`}
                                />
                            }
                            {
                                service.id === 'ai-powered-customs-automation' && 
                                <ActionButton
                                    buttonText={service.buttonText}
                                    endIcon={ getSVGIcon('arrow-right') }
                                    variant="gradient"
                                    onClick={`http://192.168.221.73:8090/tdecForm`}
                                />
                            }
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}