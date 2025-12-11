'use client';

import React, { useMemo } from "react";

import theme from "@/theme/theme";
import { Box, Card, Grid, Link, List, ListItem, ListItemIcon, ListItemText, Paper, styled, Typography } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import { useLanguage, useTranslations } from '@/contexts/AppContext';
import { Spacer, TabList as MuiTabList, Tab as MuiTab, TabPanel, ActionButton, Emoji, Tag } from "@/components";
import { getSVGIcon, subSlot, getLocalDateString, getLocalCurrency } from "@/helpers/utils";

const PLAN_START_DATE = new Date('2025-10-23');
const FREE_TRIAL_DAYS = 180;
const RESET_TOKEN_DAYS = 30;
const TOKEN_CAPACITY = 100;
const USED_TOKENS = 25;

const calculateExpiryDate = (): Date => {
    const expiry = new Date(PLAN_START_DATE);
    expiry.setDate(expiry.getDate() + FREE_TRIAL_DAYS);
    return expiry;
};

const EXPIRY_DATE = calculateExpiryDate();

const calculateRemainingDays = (): number => {
    const today = new Date();
    const timeDiff = EXPIRY_DATE.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, Math.min(FREE_TRIAL_DAYS, daysDiff));
};

const calculateRemainingDaysPercent: number = Math.round(calculateRemainingDays() / FREE_TRIAL_DAYS * 100);

const USED_DAYS = Math.max(0, FREE_TRIAL_DAYS - calculateRemainingDays());

const calculateDaysToResetTokens = (): number => {
    const today = new Date();
    const nextResetDate = new Date(PLAN_START_DATE);
    nextResetDate.setDate(nextResetDate.getDate() + RESET_TOKEN_DAYS * Math.ceil((USED_DAYS + 1) / RESET_TOKEN_DAYS));
    const timeDiff = nextResetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, daysDiff);
}

const DAYS_TO_RESET_TOKENS = calculateDaysToResetTokens();


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
    remainingDays?: number;
}

export function SubscriptionPlanCard ({ 
    plan,
    isYearly = false,
    remainingDays = 0
}: SubscriptionPlanCardProps) {

    const t = useTranslations();

    const { monthly, yearly } = plan.bill;

    const discountOnYearly: number = useMemo(() => Math.floor(Math.abs(monthly - (yearly / 12)) / monthly * 100), [monthly, yearly]);

    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" className={`p-4 h-full ${plan.cardStyle}`}>
                <Box component="div" className="flex flex-col items-center gap-2">
                    {getSVGIcon(plan.icon, 30, theme.palette.text[plan.theme as keyof typeof theme.palette.text])}
                    <Typography variant="h6" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{plan.name}</Typography>
                    <Typography variant="h4" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>
                        {getLocalCurrency(isYearly ? plan.bill.yearly / 12 : plan.bill.monthly)}
                        <Typography 
                            variant="body2" 
                            component="sub" 
                            sx={{ 
                                display: 'inline-block', 
                                verticalAlign: 'middle' 
                            }}
                        >{t('pages.subscriptions.subscriptionPlans.perMonth')}</Typography>
                    </Typography>
                    {isYearly && (
                        <>
                            <Tag variant="green" label={subSlot(t('pages.subscriptions.subscriptionPlans.savePercentage'), '{percent}', discountOnYearly)} />
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{subSlot(t('pages.subscriptions.subscriptionPlans.billedAsPerYear'), '{amount}', plan.bill.yearly)}</Typography>
                        </>
                    )}
                    <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{plan.description}</Typography>
                    <List>
                        {plan.featureList?.map((f) => (
                            <ListItem key={f} disableGutters>
                                <ListItemIcon>
                                    { getSVGIcon('circle-check-big', 16, theme.palette.icon.green) }
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
                            { getSVGIcon('coins', 16, theme.palette.text.gold) }
                            { subSlot(t('pages.subscriptions.subscriptionPlans.tokensPerMonth'), '{tokens}', plan.totalTokens) }
                        </Box>
                    </Paper>
                    <ActionButton 
                        buttonText={t('common.availableSoon') || t('pages.subscriptions.subscriptionPlans.selectPlan')}
                        variant={plan.isCurrentPlan ? 'gradient' : 'outlined'}
                        color={plan.isCurrentPlan ? 'purple' : 'white' }
                        disabled
                    />
                    <Typography variant="caption" component="p" color={theme.palette.text[plan.isCurrentPlan ? 'purple' : 'primary']}>
                        {plan.isCurrentPlan ? subSlot(t('pages.subscriptions.subscriptionPlans.enjoyFreeDays'), '{days}', remainingDays) : t('pages.subscriptions.subscriptionPlans.availableAfterTrialPeriod')}
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
            <Tag variant="outlined" color="yellow" label={t('common.comingSoon')} className="absolute top-2 right-2" />
            <Paper variant="outlined" className={`p-6 flex flex-col items-center h-full ${isActive ? '' : ''}`}>
                { getSVGIcon('coins', 24, theme.palette.text.gold) }
                <Spacer height={10} />
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>{amount}</Typography>
                {bonus && bonus > 0 && (
                    <Typography variant="caption" component="div" color={theme.palette.text.lightGreen} sx={{ mb: 1 }}>{subSlot(t('pages.subscriptions.subscriptionPlans.extraBonus'), '{extra}', bonus)}</Typography>
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
                    <Tag variant="blue" label={subSlot(t('pages.subscriptions.subscriptionPlans.bonusPercentage'), '{percent}', bonusPercentage)} />
                }
            </Paper>
        </Grid>
    );
}

export default function SubscriptionsClient() {
    const t = useTranslations();
    const { locale } = useLanguage();
    const [plan, setPlan] = React.useState('1');

    const remainingDays = useMemo(() => calculateRemainingDays(), []);
    const expiryDateString = useMemo(() => getLocalDateString(EXPIRY_DATE.toISOString(), locale), [locale]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setPlan(newValue);
    }

    const translations = useMemo(() => {
        const welcome = t('pages.subscriptions.welcome');
        const currentPlan = t('pages.subscriptions.currentPlan');
        const subscriptionPlans = t('pages.subscriptions.subscriptionPlans');
        const additionalTokens = t('pages.subscriptions.additionalTokens');

        return {
            welcome,
            currentPlan,
            currentPlanInfo: currentPlan?.planInfo,
            currentTokenUsage: currentPlan?.tokenUsage,
            trialProgress: currentPlan?.trialProgress,
            subscriptionPlans,
            subscriptionPlanList: subscriptionPlans?.plans as SubscriptionPlan[] || [],
            subscriptionPlansPointToNote: subscriptionPlans?.pointToNote,
            additionalTokens,
            additionalTokensPointToNote: additionalTokens?.pointToNote,
        }
    }, [t]);    

    return (
        <>
            <Typography sx={{ fontWeight: 700, mb: 1 }} variant="h4" component="h1">{ t("pages.subscriptions.title") }</Typography>
            <Typography variant="body2" component="p">{ t("pages.subscriptions.context") }</Typography>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6 bg-linear-to-r! from-purple-50 to-indigo-50 border-2! border-purple-200! rounded-lg">
                <Box component="div" className="flex gap-2">
                    <Box component="div" className="shrink-0">{ getSVGIcon('gift', 24, theme.palette.text.purple) }</Box>
                    <Box component="div" className="flex flex-col">
                        <Box component="div" className="flex gap-1">
                            <Emoji symbol="🎉" size={24} />
                            <Typography variant="h6" component="h2" color={theme.palette.text.darkPurple}>{ translations.welcome.title }</Typography>
                        </Box>
                        <Typography variant="caption" component="p" color={theme.palette.text.darkPurple}>{ translations.welcome.body }</Typography>
                        <Spacer height={10} />
                        <Box component="div" className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-5">
                            <Box component="div" className="flex gap-2 items-center">
                                <Box component="div" className="shrink-0">{ getSVGIcon('calendar', 16, theme.palette.text.purple) }</Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700}} color={theme.palette.text.darkPurple}>
                                    { subSlot(translations.welcome.daysRemainingSlot, '{days}', remainingDays) }
                                </Typography>    
                            </Box>
                            <Typography variant="subtitle1" color={theme.palette.text.purple}>{ subSlot(translations.welcome.trialEndsSlot, "{date}", expiryDateString) }</Typography>
                        </Box>
                    </Box>
                </Box>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-center gap-2 mb-1">
                    <Box component="div" className="shrink-0">{ getSVGIcon('star', 20, theme.palette.text.purple) }</Box>
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
                                <Typography variant="h5" component="div" className="line-through" color={theme.palette.text.secondary}>{getLocalCurrency(310)}</Typography>
                                <Typography variant="h5" component="div" color={theme.palette.text.lightGreen}>$0</Typography>
                            </Box>
                            <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{ translations.currentPlanInfo.trialPeriod }</Typography>
                            <Spacer height={20} />
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ translations.currentPlanInfo.trialEnds }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{ expiryDateString }</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple}>{ translations.currentPlanInfo.daysRemaining }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>{ subSlot(t('common.days'), '{days}', remainingDays)}</Typography>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-blue-50! border-0! h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Box component="div" className="shrink-0">{ getSVGIcon('coins', 20, theme.palette.text.gold) }</Box>
                                <Typography variant="h6" component="h2">{ translations.currentTokenUsage.title }</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ subSlot(translations.currentTokenUsage.usedSlot, '{tokens}', USED_TOKENS) }</Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ subSlot(translations.currentTokenUsage.remainingSlot, '{tokens}', TOKEN_CAPACITY) }</Typography>
                            </Box>
                            <Spacer height={30} />
                            <Typography variant="caption" component="small" color={theme.palette.text.secondary}>{ subSlot(translations.currentTokenUsage.resetDate, '{days}', DAYS_TO_RESET_TOKENS) }</Typography>
                        </Card>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6, lg: 4 }}>
                        <Card variant="outlined" className="p-4 bg-purple-50! border-2! border-purple-200! rounded-lg h-full">
                            <Box component="div" className="flex items-center gap-2 mb-2">
                                <Box component="div" className="shrink-0">{ getSVGIcon('calendar', 20, theme.palette.text.purple) }</Box>
                                <Typography variant="h6" component="h2">
                                    { translations.trialProgress.title }
                                </Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>
                                    { translations.trialProgress.daysUsed }
                                </Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.primary}>{ subSlot(t('common.days'), '{days}', USED_DAYS) }</Typography>
                            </Box>
                            <Box component="div" className="flex justify-between items-center">
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                                    { translations.trialProgress.daysLeft }
                                </Typography>
                                <Typography variant="caption" component="p" color={theme.palette.text.purple} sx={{ fontWeight: 700 }}>
                                    { subSlot(t('common.days'), '{days}', remainingDays)}
                                </Typography>
                            </Box>
                            <Spacer height={30} />
                            <Typography variant="caption" component="small" color={theme.palette.text.purple}>{ subSlot(translations.trialProgress.percentTrialRemaining, "{percent}", calculateRemainingDaysPercent) }</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <TabContext value={plan}>
                    <Box component="div" className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-15">
                        <Box component="div">
                            <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>{ translations.subscriptionPlans.title }</Typography>
                            <Typography variant="body2" component="p">{ translations.subscriptionPlans.intro }</Typography>
                        </Box>
                        <Box component="div">
                            <TabList onChange={handleChange} variant="fullWidth">
                                <Tab label={t("common.monthly")} value="1" disableRipple />
                                <Tab 
                                    label={
                                        <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1, whiteSpace: 'nowrap' }}>
                                            {t("common.yearly")}
                                            <Tag variant="green" label={subSlot(translations.subscriptionPlans.discountTag, '{percent}', '19')} />
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
                                        remainingDays={remainingDays}
                                    />
                                ))}
                            </Grid>
                            <Spacer height={20} />
                            <Card variant="outlined" className="p-5 bg-blue-50! border-blue-200!">
                                <Box component="div" className="flex items-center gap-2 mb-2">
                                    <Emoji symbol="💡" size={24} />
                                    <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }}>{ translations.subscriptionPlansPointToNote?.title }</Typography>
                                </Box>
                                <Typography variant="caption" component="p" color={theme.palette.text.darkBlue} sx={{ mb: 1 }}>{ translations.subscriptionPlansPointToNote?.body }</Typography>
                                <Box component="div" className="flex items-center gap-2">
                                    <Emoji symbol="💡" size={24} />
                                    <Typography variant="body2" component="p" color={theme.palette.text.blue} sx={{ fontWeight: 700 }}>{ subSlot(translations.subscriptionPlansPointToNote?.essential || '', '{days}', remainingDays) }</Typography>
                                </Box>
                            </Card>
                        </TabPanel>
                    ))}
                </TabContext>
            </Card>
            <Spacer height={20} />
            <Card variant="outlined" className="p-6">
                <Box component="div" className="flex items-center gap-2 mb-1">
                    <Box component="div" className="shrink-0">{ getSVGIcon('coins', 20, theme.palette.text.gold) }</Box>
                    <Typography variant="h6" component="h2">{ translations.additionalTokens?.title }</Typography>
                </Box>
                <Typography variant="body2" component="p">{ translations.additionalTokens?.intro }</Typography>
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
                        <Box component="div" className="shrink-0">{ getSVGIcon('calendar', 24, theme.palette.text.darkAmber) }</Box>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 700 }} color={theme.palette.text.darkAmber}>{ translations.additionalTokensPointToNote?.title }</Typography>
                    </Box>
                    <Typography variant="caption" component="p" color={theme.palette.text.darkAmber} sx={{ mb: 1 }}>{ translations.additionalTokensPointToNote?.body }<strong>{ subSlot(t('common.days'), '{days}', remainingDays) }</strong></Typography>
                    <Link variant="caption" href="/help-centre" underline="hover" sx={{ fontWeight: 700 }}>{ translations.additionalTokensPointToNote?.learnMoreAboutTokenPricing }</Link> 
                </Card>
            </Card>
        </>
    )
}