'use client';

import { useMemo } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import theme from '@/theme/theme';
import { ActionButton, Spacer, Tag } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';

export interface TokenPack {
    amount: number;
    bonus?: number | undefined;
    price: number;
    isActive: boolean;
}

interface TokenPackCardProps {
    pack: TokenPack;
}

export default function TokenPackCard({ pack }: TokenPackCardProps) {
    const t = useTranslations();
    const { amount, bonus, price, isActive } = pack;
    
    const bonusPercentage: number = useMemo(
        () => amount > 0 && bonus ? Math.round(bonus / amount * 100) : 0, 
        [amount, bonus]
    );

    return (
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} sx={{ opacity: isActive ? 1 : 0.5, position: 'relative' }}>
            <Tag 
                variant="outlined" 
                color="yellow" 
                label={t('common.comingSoon')} 
                className="absolute top-2 right-2" 
            />
            <Paper variant="outlined" className="p-6 flex flex-col items-center h-full">
                {getSVGIcon('coins', 24, theme.palette.text.gold)}
                <Spacer height={10} />
                <Typography variant="h6" component="div" className="font-bold">
                    {amount}
                </Typography>
                {bonus && bonus > 0 && (
                    <Typography 
                        variant="caption" 
                        component="div" 
                        color={theme.palette.text.lightGreen} 
                        className="mb-1"
                    >
                        {subSlot(t('pages.subscriptions.subscriptionPlans.extraBonus'), '{extra}', bonus)}
                    </Typography>
                )}
                <Typography variant="h5" component="div" className="font-bold">
                    ${price}
                </Typography>
                <Spacer height={10} />
                <ActionButton 
                    buttonText={isActive ? 'Purchase' : t('common.availableSoon')}
                    variant={isActive ? 'gradient' : 'outlined'}
                    color={isActive ? 'blue' : 'white'}
                    disabled
                />
                <Spacer height={10} />
                {bonusPercentage > 0 && (
                    <Tag 
                        variant="blue" 
                        label={subSlot(
                            t('pages.subscriptions.subscriptionPlans.bonusPercentage'), 
                            '{percent}', 
                            bonusPercentage
                        )} 
                    />
                )}
            </Paper>
        </Grid>
    );
}
