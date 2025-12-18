'use client';

import { useMemo } from 'react';
import { Box, Card, Grid, Link, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Spacer } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';
import TokenPackCard, { TokenPack } from './TokenPackCard';

// TODO: Fetch from backend when available
const tokenPacks: TokenPack[] = [
    { amount: 25, price: 10, isActive: false },
    { amount: 50, bonus: 5, price: 18, isActive: false },
    { amount: 100, bonus: 15, price: 35, isActive: false },
    { amount: 200, bonus: 50, price: 80, isActive: false },
    { amount: 500, bonus: 125, price: 150, isActive: false },
];

interface AdditionalTokensSectionProps {
    remainingDays: number;
}

export default function AdditionalTokensSection({ remainingDays }: AdditionalTokensSectionProps) {
    const t = useTranslations();

    const translations = useMemo(() => {
        const additionalTokens = t('pages.subscriptions.additionalTokens');
        return {
            additionalTokens,
            additionalTokensPointToNote: additionalTokens?.pointToNote,
        };
    }, [t]);

    return (
        <Card variant="outlined" className="p-6">
            <Box component="div" className="flex items-center gap-2 mb-1">
                <Box component="div" className="shrink-0">
                    {getSVGIcon('coins', 20, theme.palette.text.gold)}
                </Box>
                <Typography variant="h6" component="h2">
                    {translations.additionalTokens?.title}
                </Typography>
            </Box>
            <Typography variant="body2" component="p">
                {translations.additionalTokens?.intro}
            </Typography>
            <Spacer height={20} />
            <Grid container spacing={2}>
                {tokenPacks.map((tokenPack, tp) => (
                    <TokenPackCard key={`token-plan-${tp}`} pack={tokenPack} />
                ))}
            </Grid>
            <Spacer height={10} />
            <Card variant="outlined" className="p-5 bg-amber-50! border-amber-200!">
                <Box component="div" className="flex items-center gap-2 mb-2">
                    <Box component="div" className="shrink-0">
                        {getSVGIcon('calendar', 24, theme.palette.text.darkAmber)}
                    </Box>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }} color={theme.palette.text.darkAmber}>
                        {translations.additionalTokensPointToNote?.title}
                    </Typography>
                </Box>
                <Typography variant="caption" component="p" color={theme.palette.text.darkAmber} sx={{ mb: 1 }}>
                    {translations.additionalTokensPointToNote?.body}
                    <strong>{subSlot(t('common.days'), '{days}', remainingDays)}</strong>
                </Typography>
                <Link variant="caption" href="/help-centre" underline="hover" sx={{ fontWeight: 700 }}>
                    {translations.additionalTokensPointToNote?.learnMoreAboutTokenPricing}
                </Link>
            </Card>
        </Card>
    );
}
