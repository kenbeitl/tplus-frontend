'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { Spacer, Tag, ActionButton, ButtonWithFormModal, Checklist, HeroSection, Carousel, StyledIcon } from '@/components';
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
            <HeroSection
                title={ t("pages.govConnect.title") }
                description={ t("pages.govConnect.context") }
                icon={ getSVGIcon('file-text', 24, '#FFFFFF') }
                colorScheme="blue"
            />
            <Spacer height={20} />
            <Carousel slides={ t("pages.govConnect.slides") } />        
            <Divider className="!my-9" />
            <Box component="div" className="flex items-center mb-6">
                <StyledIcon
                    icon={getSVGIcon('shield', 24, '#FFFFFF')}
                    variant="blue-gradient"
                    size={48}
                    className="mr-3"
                    square
                />
                <Typography variant="h2" component="h2">{ t("common.ourServices") }</Typography>
            </Box>
            <Grid container spacing={2}>
                {Array.isArray(GOV_SERVICES) && GOV_SERVICES.map((service, index: number) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`gov-service-${index}`}>
                        <Card 
                            variant="outlined" 
                            className={`p-6 border-2! hover:shadow-lg! transition-all! duration-300 ease-in-out cursor-pointer focus:outline-none! focus:ring-2 focus:ring-offset-2! ${service.cardStyle}`} 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <StyledIcon
                                icon={getSVGIcon(service.icon, 32)}
                                variant={`${service.theme}-gradient` as any}
                                size={64}
                                className="mb-4"
                                square
                            />
                            <Typography className="mb-2!" variant="h4" component="h2">{service.title}</Typography>
                            <Typography className="mb-2!" variant="body1" component="p">{service.description}</Typography>
                            <Checklist items={service.features} />
                            {service.id === 'govconnect-dual-declaration' && (
                                <ButtonWithFormModal
                                    templateId={service.id}
                                    buttonEndIcon={getSVGIcon('arrow-right')}
                                    buttonText={t('common.applyNow')}
                                    variant="gradient"
                                    color={service.theme}
                                />
                            )}
                            {service.id === 'hs-code-ai-classifier' && (
                                <ActionButton
                                    buttonText={service.buttonText}
                                    endIcon={getSVGIcon('arrow-right')}
                                    variant="gradient"
                                    color={service.theme}
                                    onClick={`${pathname}/${service.id}`}
                                />
                            )}
                            {service.id === 'ai-powered-customs-automation' && (
                                <ActionButton
                                    buttonText={service.buttonText}
                                    endIcon={getSVGIcon('arrow-right')}
                                    variant="gradient"
                                    color={service.theme}
                                    onClick={() => window.open(process.env.NEXT_PUBLIC_TDEC_FORM_URL || '/tdecForm', '_blank')}
                                />
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}