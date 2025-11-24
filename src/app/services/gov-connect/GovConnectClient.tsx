'use client';

import { Spacer, Tag, ActionButton, ButtonWithFormModal, Checklist } from '@/components';
import { Box, Card, Grid, Typography } from '@mui/material';
import { ArrowRight, Brain, CircleCheckBig, FileText, Search } from 'lucide-react';
import { useTranslations } from '@/contexts/AppContext';

const govServiceList = [
    {
        icon: <FileText size={24} />,
        title: 'Single Submission for Dual Declaration',
        description: 'Streamline customs declarations with single submission for both import and export requirements',
        features: [
            'Reduce paperwork by 60%',
            'Faster processing time',
            'Single point of submission'
        ],
        formTemplateId: 'govconnect-dual-declaration',
        buttonText: 'Apply Now'
    },
    {
        icon: <Search size={24} />,
        title: 'HS Code AI Classifier',
        description: 'Get AI-powered HS code classification for your products instantly',
        features: [
            'HK HS Code (Ask Tracie)',
            'China HS Code (Ask Xiao Cui)',
            'Instant classification results'
        ]
    },
    {
        icon: <Brain size={24} />,
        title: 'AI-Powered Customs Automation',
        description: 'Automate customs declarations with AI-powered document processing',
        features: [
            'Automated data extraction',
            'Import & export declarations',
            'Ready in 10 minutes'
        ]
    }
];

export default function GovConnectClient() {
    const t = useTranslations();
    const DUAL_DECLARATION_TEMPLATE_ID = 'govconnect-dual-declaration';
    return (
        <Box component="div" className="relative">
        <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.govConnect.title") }</Typography>
        <Typography variant="body2" component="p">{ t("pages.govConnect.context") }</Typography>
        <Tag label="Services Available" className="absolute top-4 right-4" startIcon={<CircleCheckBig />} variant="green" />
        <Spacer height={20} />
        <Grid container spacing={2}>
            {govServiceList.map((service) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
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
                            {service.icon}
                            <Typography variant="h6" component="h2">{service.title}</Typography>
                        </Box>
                        <Typography sx={{ mt: 2 }} variant="body2" component="p">{service.description}</Typography>
                        <Checklist items={service.features} />
                        {service.formTemplateId ? (
                            <ButtonWithFormModal
                                templateId={DUAL_DECLARATION_TEMPLATE_ID}
                                buttonEndIcon={<ArrowRight />}
                                buttonText="Apply Now"
                            />
                        ) : (
                            <ActionButton
                                buttonText="Coming Soon"
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