'use client';

import { useMemo } from 'react';
import { Box, Card, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Spacer } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';

interface TokenUsageCardProps {
    usedTokens: number;
    tokenCapacity: number;
    daysToReset: number;
}

export default function TokenUsageCard({ usedTokens, tokenCapacity, daysToReset }: TokenUsageCardProps) {
    const t = useTranslations();

    const translations = useMemo(() => {
        const currentTokenUsage = t('pages.subscriptions.currentPlan.tokenUsage');
        return { currentTokenUsage };
    }, [t]);

    return (
        <Card variant="outlined" className="p-4 bg-blue-50! border-0! h-full">
            <Box component="div" className="flex items-center gap-2 mb-2">
                <Box component="div" className="shrink-0">
                    {getSVGIcon('coins', 20, theme.palette.text.gold)}
                </Box>
                <Typography variant="h6" component="h2">
                    {translations.currentTokenUsage.title}
                </Typography>
            </Box>
            <Box component="div" className="flex justify-between items-center">
                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                    {subSlot(translations.currentTokenUsage.usedSlot, '{tokens}', usedTokens)}
                </Typography>
                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                    {subSlot(translations.currentTokenUsage.remainingSlot, '{tokens}', tokenCapacity)}
                </Typography>
            </Box>
            <Spacer height={30} />
            <Typography variant="caption" component="small" color={theme.palette.text.secondary}>
                {subSlot(translations.currentTokenUsage.resetDate, '{days}', daysToReset)}
            </Typography>
        </Card>
    );
}
