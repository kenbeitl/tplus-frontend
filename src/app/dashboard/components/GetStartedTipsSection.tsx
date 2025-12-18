'use client';

import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Emoji, Spacer, StyledIcon } from '@/components';
import { getSVGIcon } from '@/helpers/utils';
import { useBreakpoint } from '@/hooks/useBreakpoint';

type ThemeColorType = Record<string, { border: string; from: string; to: string }>;

interface GetStartedStep {
    theme: string;
    icon: string;
    title: string;
    description: string;
}

interface GetStartedTipsSectionProps {
    title: string;
    context: string;
    steps: GetStartedStep[];
}

export default function GetStartedTipsSection({ title, context, steps }: GetStartedTipsSectionProps) {
    const isAboveMobile = useBreakpoint('mobile');

    const getThemeColors = (themeName: string) => {
        const colors: ThemeColorType = {
            blue: { border: '#BFDBFE', from: '#EFF6FF', to: '#DBEAFE' },
            purple: { border: '#E9D5FF', from: '#FAF5FF', to: '#F3E8FF' },
            indigo: { border: '#C7D2FE', from: '#EEF2FF', to: '#E0E7FF' },
        } as const;
        return colors[themeName] || colors.blue;
    };

    return (
        <Card variant="outlined" className="p-6">
            <Box className="flex items-center">
                <Emoji symbol="🚀" size={25} sx={{ mr: 1 }} />
                <Typography variant="body1" component="h3">
                    {title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p" sx={{ mt: 2 }}>
                {context}
            </Typography>
            <Spacer height={20} />
            <Grid container spacing={2}>
                {Array.isArray(steps) && steps.map((step, index) => {
                    const themeColors = getThemeColors(step.theme);
                    
                    return (
                        <React.Fragment key={index}>
                            <Grid size={{ xs: 12, sm: 'grow' }}>
                                <Card 
                                    variant="outlined" 
                                    className="p-3 lg:p-6 gap-4 center-layout h-full"
                                    sx={{ 
                                        height: '100%',
                                        borderWidth: '2px',
                                        borderColor: themeColors.border,
                                        background: `linear-gradient(to bottom right, ${themeColors.from}, ${themeColors.to})`
                                    }}
                                >
                                    <StyledIcon 
                                        icon={getSVGIcon(step.icon, 25)} 
                                        variant={`${step.theme}-inverted` as any}
                                        size={50}
                                    />
                                    <StyledIcon 
                                        icon={index + 1} 
                                        variant={`${step.theme}-inverted` as any}
                                        size={32}
                                    />
                                    <Typography variant="body2" component="h4">
                                        {step.title}
                                    </Typography>
                                    <Typography 
                                        variant="caption" 
                                        component="p" 
                                        color={theme.palette.text[step.theme as keyof typeof theme.palette.text]}
                                    >
                                        {step.description}
                                    </Typography>
                                </Card>
                            </Grid>
                            {index < steps.length - 1 && (
                                <Grid size={{ xs: 12, sm: 1 }} sx={{ alignSelf: 'center' }}>
                                    <Card elevation={0} className="center-layout">
                                        {getSVGIcon(`arrow-${isAboveMobile ? 'right' : 'down'}`, undefined, themeColors.border)}
                                    </Card>
                                </Grid>
                            )}
                        </React.Fragment>
                    );
                })}
            </Grid>
        </Card>
    );
}
