'use client';

import { useMemo } from 'react';
import { Box, Card, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Tag } from '@/components';
import { getLocalCurrency, subSlot, getLocalDateString } from '@/helpers/utils';
import { useLanguage, useTranslations } from '@/contexts/AppContext';

interface CurrentPlanCardProps {
    expiryDate: Date;
    remainingDays: number;
}

export default function CurrentPlanCard({ expiryDate, remainingDays }: CurrentPlanCardProps) {
    const t = useTranslations();
    const { locale } = useLanguage();
    
    const expiryDateString = useMemo(() => 
        getLocalDateString(expiryDate.toISOString(), locale), 
        [expiryDate, locale]
    );

    const translations = useMemo(() => {
        const currentPlan = t('pages.subscriptions.currentPlan');
        return {
            currentPlan,
            currentPlanInfo: currentPlan?.planInfo,
        };
    }, [t]);

    return (
        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
            <Box component="div" className="flex justify-between items-center mb-2">
                <Typography variant="h6" component="h2">
                    {translations.currentPlanInfo.planName}
                </Typography>
                <Tag variant="purple" label={translations.currentPlan.label} />
            </Box>
            <Box component="div" className="flex gap-3">
                <Typography variant="h5" component="div" className="line-through" color={theme.palette.text.secondary}>
                    {getLocalCurrency(310)}
                </Typography>
                <Typography variant="h5" component="div" color={theme.palette.text.lightGreen}>
                    $0
                </Typography>
            </Box>
            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>
                {translations.currentPlanInfo.trialPeriod}
            </Typography>
            <Box component="div" className="mt-5 space-y-1">
                <Box component="div" className="flex justify-between items-center">
                    <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                        {translations.currentPlanInfo.trialEnds}
                    </Typography>
                    <Typography variant="caption" component="p" color={theme.palette.text.primary} className="font-bold">
                        {expiryDateString}
                    </Typography>
                </Box>
                <Box component="div" className="flex justify-between items-center">
                    <Typography variant="caption" component="p" color={theme.palette.text.purple}>
                        {translations.currentPlanInfo.daysRemaining}
                    </Typography>
                    <Typography variant="caption" component="p" color={theme.palette.text.purple} className="font-bold">
                        {subSlot(t('common.days'), '{days}', remainingDays)}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}
