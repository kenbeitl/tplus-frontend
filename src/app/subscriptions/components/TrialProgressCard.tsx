'use client';

import { useMemo } from 'react';
import { Box, Card, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Spacer } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';

interface TrialProgressCardProps {
    usedDays: number;
    remainingDays: number;
    remainingPercent: number;
}

export default function TrialProgressCard({ usedDays, remainingDays, remainingPercent }: TrialProgressCardProps) {
    const t = useTranslations();

    const translations = useMemo(() => {
        const trialProgress = t('pages.subscriptions.currentPlan.trialProgress');
        return { trialProgress };
    }, [t]);

    return (
        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
            <Box component="div" className="flex items-center gap-2 mb-2">
                <Box component="div" className="shrink-0">
                    {getSVGIcon('calendar', 20, theme.palette.text.purple)}
                </Box>
                <Typography variant="h6" component="h2">
                    {translations.trialProgress.title}
                </Typography>
            </Box>
            <Box component="div" className="flex justify-between items-center">
                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                    {translations.trialProgress.daysUsed}
                </Typography>
                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                    {subSlot(t('common.days'), '{days}', usedDays)}
                </Typography>
            </Box>
            <Box component="div" className="flex justify-between items-center">
                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                    {translations.trialProgress.daysLeft}
                </Typography>
                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                    {subSlot(t('common.days'), '{days}', remainingDays)}
                </Typography>
            </Box>
            <Spacer height={30} />
            <Typography variant="caption" component="small" color={theme.palette.text.purple}>
                {subSlot(translations.trialProgress.percentTrialRemaining, "{percent}", remainingPercent)}
            </Typography>
        </Card>
    );
}
