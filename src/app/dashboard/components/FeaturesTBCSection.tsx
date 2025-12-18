'use client';

import { useRouter } from 'next/navigation';
import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { ActionButton, Emoji, Spacer, StyledIcon } from '@/components';
import { getSVGIcon } from '@/helpers/utils';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface TBCFeature {
    icon: string;
    title: string;
    context: string;
    isActive: boolean;
}

interface FeaturesTBCSectionProps {
    title: string;
    context: string;
    features: TBCFeature[];
    remarksTitle?: string;
    remarksContext?: string;
    viewSubscriptionPlansText?: string;
}

export default function FeaturesTBCSection({ 
    title, 
    context, 
    features,
    remarksTitle,
    remarksContext,
    viewSubscriptionPlansText
}: FeaturesTBCSectionProps) {
    const router = useRouter();
    const isAboveMobile = useBreakpoint('mobile');

    return (
        <Card variant="outlined" className="p-6">
            <Box className="flex items-center">
                <Box component="span" sx={{ mr: 1 }}>
                    {getSVGIcon('calendar', 20, '#c05621')}
                </Box>
                <Emoji symbol="🔐" size={25} sx={{ mr: 1 }} />
                <Typography variant="body1" component="h3" color="#c05621">
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p" sx={{ mt: 2 }}>
                {context}
            </Typography>
            <Spacer height={20} />
            <Grid container spacing={2}>
                {Array.isArray(features) && features.map((feature, index) => (
                    <Grid size={12} key={`ftbc-${index}`}>
                        <Paper elevation={0} className={`p-3 ${feature.isActive ? 'bg-orange-50!' : 'bg-amber-50!'}`}>
                            <Box className="flex flex-col sm:flex-row items-top">
                                <StyledIcon 
                                    icon={getSVGIcon(feature.icon, 18)} 
                                    variant={feature.isActive ? 'orange' : 'amber'}
                                    size={36}
                                    square
                                    className={`mr-${isAboveMobile ? '3' : '0'} mb-${isAboveMobile ? '0' : '3'}`}
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">
                                        {feature.title}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        component="p" 
                                        color={feature.isActive ? '#C05621' : '#B45309'}
                                    >
                                        {feature.context}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                {remarksTitle && remarksContext && (
                    <Grid size={12}>
                        <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                            <Typography variant="body1" component="h4">
                                {remarksTitle}
                            </Typography>
                            <Typography variant="caption" component="h4" color="#2b7fff">
                                {remarksContext}
                            </Typography>
                            {viewSubscriptionPlansText && (
                                <ActionButton
                                    autoWidth
                                    variant="outlined" 
                                    color="blue" 
                                    buttonText={viewSubscriptionPlansText}
                                    onClick={() => router.push("/subscriptions")}
                                />
                            )}
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
}
