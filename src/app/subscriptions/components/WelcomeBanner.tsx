'use client';

import { useMemo } from 'react';
import { Box, Card, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { Emoji, Spacer } from '@/components';
import { getSVGIcon, subSlot, getLocalDateString } from '@/helpers/utils';
import { useLanguage, useTranslations } from '@/contexts/AppContext';

interface WelcomeBannerProps {
    expiryDate: Date;
    remainingDays: number;
}

export default function WelcomeBanner({ expiryDate, remainingDays }: WelcomeBannerProps) {
    const t = useTranslations();
    const { locale } = useLanguage();
    
    const expiryDateString = useMemo(() => 
        getLocalDateString(expiryDate.toISOString(), locale), 
        [expiryDate, locale]
    );

    const translations = useMemo(() => {
        const welcome = t('pages.subscriptions.welcome');
        return { welcome };
    }, [t]);

    return (
        <Card variant="outlined" className={`p-6 ${theme.palette.gradientClasses.purpleIndigoLight}! border-2! border-purple-200! rounded-lg`}>
            <Box component="div" className="flex gap-2">
                <Box component="div" className="shrink-0">
                    {getSVGIcon('gift', 24, theme.palette.text.purple)}
                </Box>
                <Box component="div" className="flex flex-col">
                    <Box component="div" className="flex gap-1">
                        <Emoji symbol="🎉" size={24} />
                        <Typography variant="h6" component="h2" color={theme.palette.text.darkPurple}>
                            {translations.welcome.title}
                        </Typography>
                    </Box>
                    <Typography variant="caption" component="p" color={theme.palette.text.darkPurple}>
                        {translations.welcome.body}
                    </Typography>
                    <Spacer height={10} />
                    <Box component="div" className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-5">
                        <Box component="div" className="flex gap-2 items-center">
                            <Box component="div" className="shrink-0">
                                {getSVGIcon('calendar', 16, theme.palette.text.purple)}
                            </Box>
                            <Typography variant="subtitle1" className="font-bold" color={theme.palette.text.darkPurple}>
                                {subSlot(translations.welcome.daysRemainingSlot, '{days}', remainingDays)}
                            </Typography>
                        </Box>
                        <Typography variant="subtitle1" color={theme.palette.text.purple}>
                            {subSlot(translations.welcome.trialEndsSlot, "{date}", expiryDateString)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
}
