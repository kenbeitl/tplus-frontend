'use client';

import React, { useMemo } from 'react';
import { Box, Card, Grid, styled, Tab as MuiTab, Typography } from '@mui/material';
import { TabContext } from '@mui/lab';
import theme from '@/theme/theme';
import { Emoji, Spacer, Tag, TabList as MuiTabList, TabPanel } from '@/components';
import { getSVGIcon, subSlot } from '@/helpers/utils';
import { useTranslations } from '@/contexts/AppContext';
import SubscriptionPlanCard, { SubscriptionPlan } from './SubscriptionPlanCard';

const TabList = styled(MuiTabList)({
    borderRadius: '8px !important',
    '& .MuiTabs-list': {
        gap: '6px'
    }
});

const Tab = styled(MuiTab)({
    flexBasis: 'auto',
    padding: '0 15px',
    borderRadius: '8px !important',
    '&.Mui-selected': {
        color: theme.palette.text.white,
        background: theme.palette.gradient.blue,
    },
    '&:not(.Mui-selected):hover': {
        background: theme.palette.background.lightblue,
    }
});

interface SubscriptionPlansSectionProps {
    remainingDays: number;
}

export default function SubscriptionPlansSection({ remainingDays }: SubscriptionPlansSectionProps) {
    const t = useTranslations();
    const [plan, setPlan] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPlan(newValue);
    };

    const translations = useMemo(() => {
        const subscriptionPlans = t('pages.subscriptions.subscriptionPlans');
        return {
            subscriptionPlans,
            subscriptionPlanList: subscriptionPlans?.plans as SubscriptionPlan[] || [],
            subscriptionPlansPointToNote: subscriptionPlans?.pointToNote,
        };
    }, [t]);

    return (
        <Card variant="outlined" className="p-6">
            <TabContext value={plan}>
                <Box component="div" className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-15">
                    <Box component="div">
                        <Typography variant="h6" component="h2" className="font-bold">
                            {translations.subscriptionPlans.title}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {translations.subscriptionPlans.intro}
                        </Typography>
                    </Box>
                    <Box component="div">
                        <TabList onChange={handleChange} variant="fullWidth">
                            <Tab label={t("common.monthly")} value="1" disableRipple />
                            <Tab 
                                label={
                                    <Box component="span" className="flex items-center gap-1 whitespace-nowrap">
                                        {t("common.yearly")}
                                        <Tag 
                                            variant="green" 
                                            label={subSlot(translations.subscriptionPlans.discountTag, '{percent}', '19')} 
                                        />
                                    </Box>
                                } 
                                value="2" 
                                disableRipple
                            />
                        </TabList>
                    </Box>
                </Box>
                <Spacer height={20} />
                {['1', '2'].map((tabValue) => (
                    <TabPanel key={tabValue} value={tabValue} className="p-0">
                        <Grid container spacing={2}>
                            {translations.subscriptionPlanList.map((subscriptionPlan, index) => (
                                <SubscriptionPlanCard
                                    key={`${tabValue === '2' ? 'yearly' : 'monthly'}-plan-${index}`}
                                    plan={subscriptionPlan}
                                    isYearly={tabValue === '2'}
                                    remainingDays={remainingDays}
                                />
                            ))}
                        </Grid>
                        <Spacer height={20} />
                        <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Emoji symbol="💡" size={24} />
                                <Typography variant="h6" component="h2" className="font-bold">
                                    {translations.subscriptionPlansPointToNote?.title}
                                </Typography>
                            </Box>
                            <Typography variant="caption" component="p" color={theme.palette.text.darkBlue} className="mb-1">
                                {translations.subscriptionPlansPointToNote?.body}
                            </Typography>
                            <Box component="div" className="flex items-center gap-2">
                                <Emoji symbol="💡" size={24} />
                                <Typography variant="body2" component="p" color={theme.palette.text.blue} className="font-bold">
                                    {subSlot(translations.subscriptionPlansPointToNote?.essential || '', '{days}', remainingDays)}
                                </Typography>
                            </Box>
                        </Card>
                    </TabPanel>
                ))}
            </TabContext>
        </Card>
    );
}
