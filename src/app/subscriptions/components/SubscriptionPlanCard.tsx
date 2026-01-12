'use client';

import { useMemo } from 'react';
import { Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import Link from 'next/link';
import theme from '@/theme/theme';
import { Tag } from '@/components';
import { getSVGIcon, getLocalCurrency, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';

export interface SubscriptionPlan {
    theme: string;
    cardStyle: string;
    icon: string;
    name: string;
    currency: string;
    bill: {
        monthly: number;
        yearly: number;
    };
    description: string;
    featureList: string[];
    totalTokens: number;
    isCurrentPlan?: boolean;
}

interface SubscriptionPlanCardProps {
    plan: SubscriptionPlan;
    isYearly?: boolean;
    remainingDays?: number;
}

export default function SubscriptionPlanCard({ 
    plan,
    isYearly = false,
    remainingDays = 0
}: SubscriptionPlanCardProps) {
    const t = useTranslations();
    const { monthly, yearly } = plan.bill;

    const discountOnYearly: number = useMemo(
        () => Math.floor(Math.abs(monthly - (yearly / 12)) / monthly * 100), 
        [monthly, yearly]
    );

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" className={`p-4 h-full ${plan.cardStyle}`}>
                <Box component="div" className="flex flex-col items-center gap-2">
                    {getSVGIcon(plan.icon, 30, theme.palette.text[plan.theme as keyof typeof theme.palette.text])}
                    <Typography variant="h6" component="div" color={theme.palette.text.primary} className="font-bold">
                        {plan.name}
                    </Typography>
                    <Typography variant="h4" component="div" color={theme.palette.text.primary} className="font-bold">
                        {getLocalCurrency(isYearly ? plan.bill.yearly / 12 : plan.bill.monthly)}
                        <Typography 
                            variant="body2" 
                            component="sub" 
                            sx={{ 
                                display: 'inline-block', 
                                verticalAlign: 'middle' 
                            }}
                        >
                            {t('pages.subscriptions.subscriptionPlans.perMonth')}
                        </Typography>
                    </Typography>
                    {isYearly && (
                        <>
                            <Tag 
                                variant="green" 
                                label={subSlot(
                                    t('pages.subscriptions.subscriptionPlans.savePercentage'), 
                                    '{percent}', 
                                    discountOnYearly
                                )} 
                            />
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>
                                {subSlot(
                                    t('pages.subscriptions.subscriptionPlans.billedAsPerYear'), 
                                    '{amount}', 
                                    plan.bill.yearly
                                )}
                            </Typography>
                        </>
                    )}
                    <Typography variant="caption" component="p" color={theme.palette.text.secondary}>
                        {plan.description}
                    </Typography>
                    <List>
                        {plan.featureList?.map((f) => (
                            <ListItem key={f} disableGutters>
                                <ListItemIcon>
                                    {getSVGIcon('circle-check-big', 16, theme.palette.icon.green)}
                                </ListItemIcon>
                                <ListItemText
                                    slotProps={{ primary: { variant: 'caption' } }}
                                    primary={f}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Paper variant="outlined" className="w-full border-amber-200! bg-amber-50! rounded-md!">
                        <Box component="div" className="p-2 flex items-center justify-center gap-2">
                            {getSVGIcon('coins', 16, theme.palette.text.gold)}
                            {subSlot(
                                t('pages.subscriptions.subscriptionPlans.tokensPerMonth'), 
                                '{tokens}', 
                                plan.totalTokens
                            )}
                        </Box>
                    </Paper>
                    <Button 
                        className={plan.isCurrentPlan ? 'bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800' : ''}
                        variant={plan.isCurrentPlan ? 'contained' : 'outlined'}
                        disabled
                        sx={{ width: '100%', mt: 'auto' }}
                    >
                        {t('common.availableSoon') || t('pages.subscriptions.subscriptionPlans.selectPlan')}
                    </Button>
                    <Typography 
                        variant="caption" 
                        component="p" 
                        color={theme.palette.text[plan.isCurrentPlan ? 'purple' : 'primary']}
                    >
                        {plan.isCurrentPlan 
                            ? subSlot(
                                t('pages.subscriptions.subscriptionPlans.enjoyFreeDays'), 
                                '{days}', 
                                remainingDays
                            ) 
                            : t('pages.subscriptions.subscriptionPlans.availableAfterTrialPeriod')
                        }
                    </Typography>
                    <Button
                        component={Link}
                        href="/help-centre"
                        variant="text"
                    >
                        {t('common.learnMore')}
                    </Button>
                </Box>
            </Card>
        </Grid>
    );
}
