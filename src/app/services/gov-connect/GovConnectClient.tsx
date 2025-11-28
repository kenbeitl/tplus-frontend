'use client';

import { Spacer, Tag, ActionButton, ButtonWithFormModal, Checklist } from '@/components';
import { Box, Card, Grid, Typography } from '@mui/material';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { useTranslations } from '@/contexts/AppContext';
import { getLucideIcon } from '@/helpers/utils';

export default function GovConnectClient() {
    const t = useTranslations();
    const GOV_SERVICE_LIST = t('pages.govConnect.services');
    const DUAL_DECLARATION_TEMPLATE_ID = 'govconnect-dual-declaration';
    return (
        <Box component="div" className="relative">
        <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.govConnect.title") }</Typography>
        <Typography variant="body2" component="p">{ t("pages.govConnect.context") }</Typography>
        <Tag label={ t('common.servicesAvailable') } className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
        <Spacer height={20} />
        <Grid container spacing={2}>
            {Array.isArray(GOV_SERVICE_LIST) && GOV_SERVICE_LIST.map((service, index: number) => (
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
                        <Box sx={{ display: 'flex', alignItems: 'top', gap: 1 }}>
                            {getLucideIcon(service.icon, 24)}
                            <Typography variant="h6" component="h2">{service.title}</Typography>
                        </Box>
                        <Typography sx={{ mt: 2 }} variant="body2" component="p">{service.description}</Typography>
                        <Checklist items={service.features} />
                        {service.formTemplateId ? (
                            <ButtonWithFormModal
                                templateId={DUAL_DECLARATION_TEMPLATE_ID}
                                buttonEndIcon={<ArrowRight />}
                                buttonText={t('common.applyNow')}
                            />
                        ) : (
                            <ActionButton
                                buttonText={t('common.comingSoon')}
                                endIcon={<ArrowRight />}
                                variant="gradient"
                                disabled={true}
                            />
                        )}                        
                    </Card>
                </Grid>
            ))}
        </Grid>
        </Box>
    );
}