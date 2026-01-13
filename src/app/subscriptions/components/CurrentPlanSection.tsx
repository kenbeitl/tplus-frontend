'use client';

import { useMemo } from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Spacer } from '@/components';
import { getSVGIcon } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';
import CurrentPlanCard from './CurrentPlanCard';
import TokenUsageCard from './TokenUsageCard';
import TrialProgressCard from './TrialProgressCard';

interface CurrentPlanSectionProps {
    expiryDate: Date;
    remainingDays: number;
    usedDays: number;
    remainingPercent: number;
    usedTokens: number;
    tokenCapacity: number;
    daysToReset: number;
}

export default function CurrentPlanSection({
    expiryDate,
    remainingDays,
    usedDays,
    remainingPercent,
    usedTokens,
    tokenCapacity,
    daysToReset,
}: CurrentPlanSectionProps) {
    const t = useTranslations();

    const translations = useMemo(() => {
        const currentPlan = t('pages.subscriptions.currentPlan');
        return { currentPlan };
    }, [t]);

    return (
        <Card variant="outlined" className="p-6">
            <Box component="div" className="flex items-center gap-2 mb-1">
                <Box component="div" className="shrink-0">
                    {getSVGIcon('star', 20, theme.palette.text.purple)}
                </Box>
                <Typography variant="h6" component="h2">
                    {translations.currentPlan.title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p">
                {translations.currentPlan.intro}
            </Typography>
            <Spacer height={30} />
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <CurrentPlanCard expiryDate={expiryDate} remainingDays={remainingDays} />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <TokenUsageCard 
                        usedTokens={usedTokens} 
                        tokenCapacity={tokenCapacity} 
                        daysToReset={daysToReset} 
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                    <TrialProgressCard 
                        usedDays={usedDays} 
                        remainingDays={remainingDays} 
                        remainingPercent={remainingPercent} 
                    />
                </Grid>
            </Grid>
        </Card>
    );
}
