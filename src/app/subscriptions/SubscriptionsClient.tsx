'use client';

import React from "react";

import Spacer from "@/components/ui/Spacer";
import { Box, Card, getAppBarUtilityClass, Grid, styled, Typography } from "@mui/material";
import { useTranslations } from '@/contexts/AppContext';
import { Calendar, Coins, Crown, Gift, Star, Zap } from "lucide-react";
import theme from "@/theme/theme";
import Emoji from "@/components/Emoji";
import Tag from "@/components/Tag";
import TabContext from '@mui/lab/TabContext';
import { TabList as MuiTabList, Tab as MuiTab, TabPanel } from "@/components/ui/StyledTabs";

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

interface subscriptionPlanProps {
    icon: React.ReactNode;
    name: string;
    price: string;
    description: string;
    classList: string;
}

export function SubscriptionPlanCard ({ 
    icon, 
    name, 
    price, 
    description,
    classList
}: subscriptionPlanProps) {
    return (
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Card variant="outlined" className={classList}>
                <Box component="div" className="flex flex-col items-center gap-2">
                    {icon}
                    <Typography variant="h6" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>{name}</Typography>
                    <Typography variant="h4" component="div" color={theme.palette.text.primary} sx={{ fontWeight: 700 }}>
                        HK${price}
                        <Typography 
                            variant="body2" 
                            component="sub" 
                            sx={{ 
                                display: 'inline-block', 
                                verticalAlign: 'middle' 
                            }}
                        >/month</Typography>
                    </Typography>
                    <Typography variant="caption" component="p" color={theme.palette.text.secondary}>{description}</Typography>
                </Box>                 
            </Card>
        </Grid>
    )
}



export default function SubscriptionsClient() {
    const t = useTranslations();
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    }
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
                <TabContext value={value}>
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
                    <TabPanel value="1">
                        <Grid container spacing={2}>
                            <SubscriptionPlanCard
                                icon={<Zap size={30} color={theme.palette.text.blue} />}
                                name="Basic"
                                price="100"
                                classList="p-4 border-2! border-blue-200! rounded-lg h-full"
                                description="Essential features for small businesses"
                            />
                            <SubscriptionPlanCard
                                icon={<Star size={30} color={theme.palette.text.purple} />}
                                name="Professional"
                                price="310"
                                classList="p-4 bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 border-2! border-purple-600! rounded-lg h-full"
                                description="Advanced features for growing businesses"
                            />
                            <SubscriptionPlanCard
                                icon={<Crown size={30} color={theme.palette.text.gold} />}
                                name="Enterprise"
                                price="700"
                                classList="p-4 border-2! border-yellow-200! rounded-lg h-full"
                                description="Complete solution for large organizations"
                            />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                        <Grid container spacing={2}>
                           <SubscriptionPlanCard
                                icon={<Zap size={30} color={theme.palette.text.blue} />}
                                name="Basic"
                                price="100"
                                classList="p-4 border-2! border-blue-200! rounded-lg h-full"
                                description="Essential features for small businesses"
                            />
                            <SubscriptionPlanCard
                                icon={<Star size={30} color={theme.palette.text.purple} />}
                                name="Professional"
                                price="310"
                                classList="p-4 bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 border-2! border-purple-600! rounded-lg h-full"
                                description="Advanced features for growing businesses"
                            />
                            <SubscriptionPlanCard
                                icon={<Crown size={30} color={theme.palette.text.gold} />}
                                name="Enterprise"
                                price="700"
                                classList="p-4 border-2! border-yellow-200! rounded-lg h-full"
                                description="Complete solution for large organizations"
                            />
                        </Grid>
                    </TabPanel>
                    
                </TabContext>
            </Card>
        </>
    )
}