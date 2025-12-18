'use client';

import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Emoji, Spacer, StyledIcon } from '@/components';
import { getSVGIcon } from '@/helpers/utils';
import { useBreakpoint } from '@/hooks/useBreakpoint';

interface Feature {
    icon: string;
    title: string;
    context: string;
}

interface FreeTrialFeaturesSectionProps {
    title: string;
    context: string;
    features: Feature[];
    remarksBody?: string;
}

export default function FreeTrialFeaturesSection({ 
    title, 
    context, 
    features, 
    remarksBody 
}: FreeTrialFeaturesSectionProps) {
    const isAboveMobile = useBreakpoint('mobile');

    return (
        <Card variant="outlined" className="p-6">
            <Box className="flex items-center">
                <Box component="span" sx={{ mr: 1 }}>
                    {getSVGIcon('circle-check-big', 20, theme.palette.text.green)}
                </Box>
                <Emoji symbol="🆓" size={25} sx={{ mr: 1 }} />
                <Typography variant="body1" component="h3" color={theme.palette.text.green}>
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p" sx={{ mt: 2 }}>
                {context}
            </Typography>
            <Spacer height={20} />
            <Grid container spacing={2}>
                {Array.isArray(features) && features.map((feature, index) => (
                    <Grid size={12} key={`ftf-${index}`}>
                        <Paper elevation={0} className="p-3 bg-green-50!">
                            <Box className="flex flex-col sm:flex-row items-top">
                                <StyledIcon 
                                    icon={getSVGIcon(feature.icon, 18)} 
                                    variant="green"
                                    size={36}
                                    square
                                    className={`mr-${isAboveMobile ? '3' : '0'} mb-${isAboveMobile ? '0' : '3'}`}
                                />
                                <Box>
                                    <Typography variant="body1" component="h4">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="caption" component="p" color={theme.palette.text.green}>
                                        {feature.context}
                                    </Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
                {remarksBody && (
                    <Grid size={12}>
                        <Card variant="outlined" className="p-3 bg-blue-50! border-blue-200!">
                            <Typography variant="caption" component="h4" color="#2b7fff">
                                <em>{remarksBody}</em>
                            </Typography>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
}
