'use client';

import React, { useMemo } from "react";
import { Box, Card, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, styled, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { Calendar, CircleCheckBig, Coins, Crown, Gift, Star, Zap } from "lucide-react";

import { useTranslations } from '@/contexts/AppContext';
import theme from "@/theme/theme";
import { Spacer, TabList as MuiTabList, Tab as MuiTab, TabPanel, ActionButton, Emoji, Tag } from "@/components";

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

const remainingDays = (expiryDate: Date): number => {
    const now = new Date();
    const remainingTime = expiryDate.getTime() - now.getTime();
    if (remainingTime > 0) return Math.ceil(remainingTime / (1000 * 3600 * 24));
    return 0;
}

interface subscriptionPlanProps {
    plan: {
        icon: React.ReactNode;
        name: string;
        price: {
            monthly: number;
            yearly: number;
        };
        classList: string;
        description: string;
        featureList: string[];
        isCurrentPlan?: boolean;
        buttonLabel?: string;
        totalTokens?: number;
    };
    isYearly?: boolean;
}

export function SubscriptionPlanCard ({ 
    plan,
    isYearly = false
}: subscriptionPlanProps) {
    const t = useTranslations();

    const { monthly, yearly } = plan.price;

    const discountOnYearly: number = useMemo(() => Math.floor(Math.abs(monthly - yearly) / monthly * 100), [plan.price.monthly, plan.price.yearly]);
    const yearlyPayment: number = useMemo(() => plan.price.yearly * 12, [plan.price.yearly]);

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" className={`p-4 h-full ${plan.classList}`}>
                <Box component="div" className="flex flex-col items-center gap-2">
                    {plan.icon}
                    <Typography variant="h6" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{plan.name}</Typography>
                    <Typography variant="h4" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>
                        HK${ plan.price[isYearly ? 'yearly' : 'monthly'] }
                        <Typography 
                            variant="body2" 
                            component="sub" 
                            sx={{ 
                                display: 'inline-block', 
                                verticalAlign: 'middle' 
                            }}
                        >/month</Typography>
                    </Typography>
                    {isYearly && (
                        <>
                            <Tag variant="green" label={`Save ${discountOnYearly}%`} />
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>Billed as HK${yearlyPayment}/year</Typography>
                        </>
                    )}
                    <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{plan.description}</Typography>
                    <List>
                        {plan.featureList?.map((f) => (
                            <ListItem key={f} disableGutters>
                                <ListItemIcon>
                                    <CircleCheckBig size={16} color={theme.palette.icon.green} />
                                </ListItemIcon>
                                <ListItemText
                                    slotProps={{ primary: { variant: 'body2', sx: { fontSize: '12px' } }}}
                                    primary={f}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Paper variant="outlined" className="w-full border-amber-200! bg-amber-50! rounded-md!">
                        <Box component="div" className="p-2 flex items-center justify-center gap-2">
                            <Coins size={16} color={theme.palette.text.gold} />{plan.totalTokens} tokens/month
                        </Box>
                    </Paper>
                    <ActionButton 
                        buttonText={plan.buttonLabel || "Select Plan"}
                        variant={plan.isCurrentPlan ? 'gradient' : 'outlined'}
                        color={plan.isCurrentPlan ? 'purple' : 'white' }
                        disabled
                    />
                    <Typography variant="caption" component="p" color={theme.palette.text[plan.isCurrentPlan ? 'purple' : 'primary']}>
                        {plan.isCurrentPlan ? `Enjoy ${remainingDays(new Date('2025-11-30'))} more days free!` : "Available after trial period"}
                    </Typography>
                    <ActionButton
                        buttonText={t('common.learnMore')}
                        variant="text"
                        onClick="/help-centre"
                    />
                </Box>                 
            </Card>
        </Grid>
    )
}

interface tokenPlanProps {
    tokenPlan: {
        amount: number;
        bonus?: number;
        price: number;
        isActive: boolean;
    };
}

export function TokenPlanCard({
    tokenPlan
}: tokenPlanProps) {
    const { amount, bonus, price, isActive } = tokenPlan;
    const bonusPercentage: number = useMemo(() => amount > 0 && bonus ? Math.round(bonus / amount * 100) : 0, [amount, bonus]);
    return (
        <Grid size={{ xs: 12, sm: 6, md: 2.4 }} sx={{ opacity: isActive ? 1 : 0.5, position: 'relative' }}>
            <Tag variant="outlined" color="yellow" label="Coming Soon" className="absolute top-2 right-2" />
            <Paper variant="outlined" className={`p-6 flex flex-col items-center h-full ${isActive ? '' : ''}`}>
                <Coins size={24} color={theme.palette.text.gold} />
                <Spacer height={10} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{amount}</Typography>
                {bonus && bonus > 0 && (
                    <Typography variant="caption" component="div" color={theme.palette.text.lightGreen} sx={{ mb: 1 }}>+{bonus} bonus</Typography>
                )}
                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>${price}</Typography>
                <Spacer height={10} />
                <ActionButton 
                    buttonText={isActive ? 'Purchase' : 'Available Soon'}
                    variant={isActive ? 'gradient' : 'outlined'}
                    color={isActive ? 'blue' : 'white' }
                    disabled
                />
                <Spacer height={10} />
                {bonusPercentage > 0 &&
                    <Tag variant="blue" label={`${bonusPercentage}% bonus`} />
                }
            </Paper>
        </Grid>
    );
}

export default function SubscriptionsClient() {
    const t = useTranslations();
    const [plan, setPlan] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPlan(newValue);
    }

    interface SubscriptionPlanProps {
        classList: string;
        icon: React.ReactNode;
        name: string;
        price: {
            monthly: number;
            yearly: number;
        };
        description: string;
        featureList: string[];
        totalTokens: number;
        isCurrentPlan?: boolean;
        buttonLabel?: string;
    }

    const subscriptionPlanList: SubscriptionPlanProps[] = [
        {
            classList: 'border-2! border-blue-200!',
            icon: <Zap size={30} color={theme.palette.text.blue} />,
            name: 'Basic',
            price: {monthly: 100, yearly: 90},
            description: 'Essential features for small businesses',
            featureList: [
                'Full platform access',
                '1 free digital identity (iD-One)',
                '2 web vulnerability assessments/year',
                'SignConnect - Tradelink DMSS',
                'PayConnect - Full Access',
                'GovConnect - Basic Access',
                'SafeConnect - T-Guard App',
                '5 tokens/month'
            ],
            totalTokens: 5,
            buttonLabel: 'Available Soon'
        },
        {
            classList: 'bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 border-2! border-purple-600!',
            icon: <Star size={30} color={theme.palette.text.purple} />,
            name: 'Professional',
            price: {monthly: 310, yearly: 250},
            description: 'Advanced features for growing businesses',
            featureList: [
                'All Basic features',
                '1 signing platform (DocuSign or Fadada)',
                '5 envelopes/month',
                '1 free corporate digital identity (iCorp-One)',
                'Free iD-One for all company users',
                '5 business reports from BizConnect/year',
                '2 web vulnerability assessments/year',
                '3 AI declaration generations/month',
                '100 tokens/month',
            ],
            totalTokens: 100,
            isCurrentPlan: true,
            buttonLabel: 'Current Plan (Free Trials)'
        },
        {
            classList: 'border-2! border-yellow-200!',
            icon: <Crown size={30} color={theme.palette.text.gold} />,
            name: 'Enterprise',
            price: {monthly: 700, yearly: 650},
            description: 'Complete solution for large organizations',
            featureList: [
                'Full access to all features',
                '1 signing platform (DocuSign or Fadada)',
                '20 envelopes/month',
                '1 free iCorp-One',
                'Unlimited free iD-One for all company users',
                '20 business reports from BizConnect/year',
                'Unlimited web vulnerability assessments',
                'Unlimited AI declaration generations',
                '400 tokens/month',
                'Dedicated account manager',
                'Priority support',
            ],
            totalTokens: 400,
            buttonLabel: 'Available Soon'
        }
    ];

    interface TokenPlanProps {
        amount: number;
        bonus?: number | undefined;
        price: number;
        isActive: boolean;
    }

    const tokenPlanList: TokenPlanProps[] = [
        {
            amount: 25,
            price: 10,
            isActive: false,
        },
        {
            amount: 50,
            bonus: 5,
            price: 18,
            isActive: false,
        },
        {
            amount: 100,
            bonus: 15,
            price: 35,
            isActive: false,
        },
        {
            amount: 200,
            bonus: 50,
            price: 80,
            isActive: false,
        },
        {
            amount: 500,
            bonus: 125,
            price: 150,
            isActive: false,
        }
    ]

    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.subscriptions.title") }</Typography>
            <Typography variant="body2" component="p">{ t("pages.subscriptions.context") }</Typography>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6 bg-linear-to-r! from-purple-50 to-indigo-50 border-2! border-purple-200! rounded-lg">
                <Box component="div" className="flex gap-2">
                    <Gift size={24} color={theme.palette.text.purple} />
                    <Box component="div" className="flex flex-col">
                        <Box component="div" className="flex gap-1">
                            <Emoji symbol="🎉" size={24} />
                            <Typography variant="h6" component="h2" color={theme.palette.text.darkPurple}>Welcome Gift: 6-Month Free Professional Plan</Typography>
                        </Box>
                        <Typography variant="caption" component="p" color={theme.palette.text.darkPurple}>As a valued new member, you're enjoying full access to our Professional plan absolutely free for 6 months! Explore all premium features including GovConnect, BizConnect, advanced security, and 100 monthly tokens.</Typography>
                        <Spacer height={10} />
                        <Box component="div" className="flex items-center gap-5">
                            <Box component="div" className="flex gap-2 items-center">
                                <Calendar size={16} color={theme.palette.text.purple} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700}} color={theme.palette.text.darkPurple}>0 days remaining</Typography>    
                            </Box>
                            <Typography variant="subtitle1" color={theme.palette.text.purple}>Trial ends: April 21, 2025</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-center gap-2 mb-1">
                    <Star size={20} color={theme.palette.text.purple} />
                    <Typography variant="h6" component="h2">Current Subscription</Typography>
                </Box>
                <Typography variant="body2" component="p">Your current plan and usage overview</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
                            <Box component="div" className="flex justify-between items-center mb-2">
                                <Typography variant="h6" component="h2">Professional Plan</Typography>
                                <Tag variant="purple" label="Current Plan" />
                            </Box>
                            <Box component="div" className="flex gap-3">
                                <Typography variant="h5" component="div" className="line-through" color={theme.palette.text.secondary}>HK$310</Typography>
                                <Typography variant="h5" component="div" color={theme.palette.text.lightGreen}>$0</Typography>
                            </Box>
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>6-month trial period</Typography>
                            <Spacer height={20} />
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>Trial ends:</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>Apr 21, 2025</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple}>Days remaining:</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>0 Days</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-blue-50! border-0! h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Coins size={20} color={theme.palette.text.gold} />
                                <Typography variant="h6" component="h2">Token Usage</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>Used: 150</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>Remaining: 500</Typography>
                            </Box>
                            <Spacer height={30} />
                            <Typography variant="caption" component="small" color={theme.palette.text.secondary}>Resets in 15 days</Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Calendar size={20} color={theme.palette.text.purple} />
                                <Typography variant="h6" component="h2">Free Trial Progress</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>Days used:</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>180 days</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>Days left:</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>0 days</Typography>
                            </Box>
                            <Spacer height={30} />
                            <Typography variant="caption" component="small" color={theme.palette.text.purple}>0% of trial remaining</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <TabContext value={plan}>
                    <Box component="div" className="flex justify-between items-center gap-15">
                        <Box component="div">
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>Subscription Plans</Typography>
                            <Typography variant="body2" component="p">Compare plans and choose the best option for your business. You're currently on a 6-month free trial of the Professional plan.</Typography>
                        </Box>
                        <Box component="div">
                            <TabList onChange={handleChange} variant="fullWidth">
                                <Tab label={t("pages.subscriptions.monthly")} value="1" disableRipple />
                                <Tab 
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                                            {t("pages.subscriptions.yearly")}
                                            <Tag variant="green" label="Save up to 19%" />
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
                        <TabPanel key={tabValue} value={tabValue} sx={{ p: 0 }}>
                            <Grid container spacing={2}>
                                {subscriptionPlanList.map((subscriptionPlan, index) => (
                                    <SubscriptionPlanCard
                                        key={`${tabValue === '2' ? 'yearly' : 'monthly'}-plan-${index}`}
                                        plan={subscriptionPlan}
                                        isYearly={tabValue === '2'}
                                    />
                                ))}
                            </Grid>
                            <Spacer height={20} />
                            <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                                <Box component="div" className="flex items-center gap-2 mb-2">
                                    <Emoji symbol="💡" size={24} />
                                    <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>After Your Free Trial</Typography>
                                </Box>
                                <Typography variant="caption" component="p" color={theme.palette.text.darkBlue} sx={{ mb: 1 }}>When your 6-month trial ends, you can choose to continue with the Professional plan starting at HK$250/month (yearly billing) or HK$310/month (monthly billing), or switch to another plan that better fits your needs. We'll send you reminders before your trial expires.</Typography>
                                <Box component="div" className="flex items-center gap-2">
                                    <Emoji symbol="💡" size={24} />
                                    <Typography variant="body2" component="p" color={theme.palette.text.blue} sx={{ fontWeight: 700 }}>Subscription purchases will be available {remainingDays(new Date('2025-11-30'))} days from now when your trial period ends.</Typography>
                                </Box>
                            </Card>
                        </TabPanel>
                    ))}
                </TabContext>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-center gap-2 mb-1">
                    <Coins size={20} color={theme.palette.text.gold} />
                    <Typography variant="h6" component="h2">Buy Additional Tokens</Typography>
                </Box>
                <Typography variant="body2" component="p">Token purchases will be available after your free trial period ends</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    {tokenPlanList.map((tokenPlan, tp) => 
                        <TokenPlanCard
                            key={`token-plan-${tp}`}
                            tokenPlan={tokenPlan}
                        />
                    )}
                </Grid>
                <Spacer height={10} />
                <Card variant="outlined" className="p-5 bg-amber-50! border-amber-200!">
                    <Box component="div" className="flex items-center gap-2 mb-2">
                        <Calendar size={24} color={theme.palette.text.darkAmber} />
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }} color={theme.palette.text.darkAmber}>Token Purchases During Free Trial</Typography>
                    </Box>
                    <Typography variant="caption" component="p" color={theme.palette.text.darkAmber} sx={{ mb: 1 }}>Token purchases are not available during your 6-month free trial period. You already have 150 tokens included with your Professional plan trial. Additional token purchases will become available when your trial ends in <strong>{remainingDays(new Date('2025-11-30'))} days</strong>.</Typography>
                    <Link variant="caption" href="/help-centre" underline="hover" sx={{ fontWeight: 700 }}>Learn more about token pricing</Link> 
                </Card>
            </Card>
        </>
    )
}