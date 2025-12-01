'use client';

import React, { useMemo } from "react";
import { Box, Card, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, styled, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { Calendar, CircleCheckBig, Coins, Gift, Star } from "lucide-react";

import { useLanguage, useTranslations } from '@/contexts/AppContext';
import theme from "@/theme/theme";
import { Spacer, TabList as MuiTabList, Tab as MuiTab, TabPanel, ActionButton, Emoji, Tag } from "@/components";
import { getLucideIcon, substituteSlot, getLocalDateString } from "@/helpers/utils";

const PLAN_START_DATE = new Date('2025-06-01');
const FREE_TRIAL_DAYS = 180;

const calculateExpiryDate = (): Date => {
    const expiry = new Date(PLAN_START_DATE);
    expiry.setDate(expiry.getDate() + FREE_TRIAL_DAYS);
    return expiry;
};

const EXPIRY_DATE = calculateExpiryDate();

const calculateRemainingDays = (): number => {
    const today = new Date();
    const timeDiff = EXPIRY_DATE.getTime() - today.getTime();
    return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 3600 * 24)) : 0;
};

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

interface SubscriptionPlan {
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
}

export function SubscriptionPlanCard ({ 
    plan,
    isYearly = false
}: SubscriptionPlanCardProps) {

    const t = useTranslations();

    const { monthly, yearly } = plan.bill;

    const discountOnYearly: number = useMemo(() => Math.floor(Math.abs(monthly - (yearly / 12)) / monthly * 100), [plan.bill.monthly, plan.bill.yearly]);

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" className={`p-4 h-full ${plan.cardStyle}`}>
                <Box component="div" className="flex flex-col items-center gap-2">
                    {getLucideIcon(plan.icon, 30, theme.palette.text[plan.theme as keyof typeof theme.palette.text])}
                    <Typography variant="h6" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{plan.name}</Typography>
                    <Typography variant="h4" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>
                        HK${ isYearly ? plan.bill.yearly / 12 : plan.bill.monthly }
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
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>Billed as HK${plan.bill.yearly}/year</Typography>
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
                        buttonText={t('common.availableSoon') || "Select Plan"}
                        variant={plan.isCurrentPlan ? 'gradient' : 'outlined'}
                        color={plan.isCurrentPlan ? 'purple' : 'white' }
                        disabled
                    />
                    <Typography variant="caption" component="p" color={theme.palette.text[plan.isCurrentPlan ? 'purple' : 'primary']}>
                        {plan.isCurrentPlan ? `Enjoy ${calculateRemainingDays()} more days free!` : "Available after trial period"}
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

interface TokenPack {
    amount: number;
    bonus?: number | undefined;
    price: number;
    isActive: boolean;
}

interface TokenPackProps {
    pack: TokenPack;
}

// TODO: Fetch from backend when available
const tokenPacks: TokenPack[] = [
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

export function TokenPlanCard({ pack }: TokenPackProps) {
    const t = useTranslations();
    const { amount, bonus, price, isActive } = pack;
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
                    buttonText={isActive ? 'Purchase' : t('common.availableSoon')}
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
    const { locale } = useLanguage();
    const [plan, setPlan] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPlan(newValue);
    }

    const translations = useMemo(() => {
        const welcome = t('pages.subscriptions.welcome');
        const currentPlan = t('pages.subscriptions.currentPlan');
        const subscriptionPlans = t('pages.subscriptions.subscriptionPlans');

        return {
            welcome,
            currentPlan,
            currentPlanInfo: currentPlan?.planInfo,
            currentTokenUsage: currentPlan?.tokenUsage,
            trialProgress: currentPlan?.trialProgress,
            subscriptionPlanList: subscriptionPlans?.plans as SubscriptionPlan[] || [],
        }
    }, [t]);    

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
                            <Typography variant="h6" component="h2" color={theme.palette.text.darkPurple}>{ translations.welcome.title }</Typography>
                        </Box>
                        <Typography variant="caption" component="p" color={theme.palette.text.darkPurple}>{ translations.welcome.body }</Typography>
                        <Spacer height={10} />
                        <Box component="div" className="flex items-center gap-5">
                            <Box component="div" className="flex gap-2 items-center">
                                <Calendar size={16} color={theme.palette.text.purple} />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700}} color={theme.palette.text.darkPurple}>
                                    { substituteSlot(translations.welcome.daysRemainingSlot, '{days}', calculateRemainingDays()) }
                                </Typography>    
                            </Box>
                            <Typography variant="subtitle1" color={theme.palette.text.purple}>{ substituteSlot(translations.welcome.trialEndsSlot, "{date}", getLocalDateString(EXPIRY_DATE.toISOString(), locale)) }</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-center gap-2 mb-1">
                    <Star size={20} color={theme.palette.text.purple} />
                    <Typography variant="h6" component="h2">{ translations.currentPlan.title }</Typography>
                </Box>
                <Typography variant="body2" component="p">{ translations.currentPlan.intro }</Typography>
                <Spacer height={20} />
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
                            <Box component="div" className="flex justify-between items-center mb-2">
                                <Typography variant="h6" component="h2">{ translations.currentPlanInfo.planName }</Typography>
                                <Tag variant="purple" label={ translations.currentPlan.label } />
                            </Box>
                            <Box component="div" className="flex gap-3">
                                <Typography variant="h5" component="div" className="line-through" color={theme.palette.text.secondary}>HK$310</Typography>
                                <Typography variant="h5" component="div" color={theme.palette.text.lightGreen}>$0</Typography>
                            </Box>
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{ translations.currentPlanInfo.trialPeriod }</Typography>
                            <Spacer height={20} />
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ translations.currentPlanInfo.trialEnds }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{ getLocalDateString(EXPIRY_DATE.toISOString(), locale) }</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple}>{ translations.currentPlanInfo.daysRemaining }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>{ substituteSlot(t('common.days'), '{days}', calculateRemainingDays())}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-blue-50! border-0! h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Coins size={20} color={theme.palette.text.gold} />
                                <Typography variant="h6" component="h2">{ translations.currentTokenUsage.title }</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ substituteSlot(translations.currentTokenUsage.usedSlot, '{tokens}', 150) }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ substituteSlot(translations.currentTokenUsage.remainingSlot, '{tokens}', 500) }</Typography>
                            </Box>
                            <Spacer height={30} />
                            <Typography variant="caption" component="small" color={theme.palette.text.secondary}>{ substituteSlot(translations.currentTokenUsage.resetDate, '{days}', 15) }</Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Calendar size={20} color={theme.palette.text.purple} />
                                <Typography variant="h6" component="h2">
                                    { translations.trialProgress.title }
                                </Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                                    { translations.trialProgress.daysUsed }
                                </Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>180 days</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                                    { translations.trialProgress.daysLeft }
                                </Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                                    { substituteSlot(t('common.days'), '{days}', calculateRemainingDays())}
                                </Typography>
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
                                <Tab label={t("common.monthly")} value="1" disableRipple />
                                <Tab 
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                                            {t("common.yearly")}
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
                                {translations.subscriptionPlanList.map((subscriptionPlan, index) => (
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
                                    <Typography variant="body2" component="p" color={theme.palette.text.blue} sx={{ fontWeight: 700 }}>Subscription purchases will be available {calculateRemainingDays()} days from now when your trial period ends.</Typography>
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
                    {tokenPacks.map((tokenPack, tp) => 
                        <TokenPlanCard
                            key={`token-plan-${tp}`}
                            pack={tokenPack}
                        />
                    )}
                </Grid>
                <Spacer height={10} />
                <Card variant="outlined" className="p-5 bg-amber-50! border-amber-200!">
                    <Box component="div" className="flex items-center gap-2 mb-2">
                        <Calendar size={24} color={theme.palette.text.darkAmber} />
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }} color={theme.palette.text.darkAmber}>Token Purchases During Free Trial</Typography>
                    </Box>
                    <Typography variant="caption" component="p" color={theme.palette.text.darkAmber} sx={{ mb: 1 }}>Token purchases are not available during your 6-month free trial period. You already have 150 tokens included with your Professional plan trial. Additional token purchases will become available when your trial ends in <strong>{calculateRemainingDays()} days</strong>.</Typography>
                    <Link variant="caption" href="/help-centre" underline="hover" sx={{ fontWeight: 700 }}>Learn more about token pricing</Link> 
                </Card>
            </Card>
        </>
    )
}