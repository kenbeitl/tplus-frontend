'use client';

import { useMemo } from 'react';
import { Typography } from '@mui/material';
import { Spacer } from '@/components';
import { useTranslations } from '@/contexts/AppContext';
import WelcomeBanner from './components/WelcomeBanner';
import CurrentPlanSection from './components/CurrentPlanSection';
import SubscriptionPlansSection from './components/SubscriptionPlansSection';
import AdditionalTokensSection from './components/AdditionalTokensSection';

// Constants
const PLAN_START_DATE = new Date('2025-10-23');
const FREE_TRIAL_DAYS = 180;
const RESET_TOKEN_DAYS = 30;
const TOKEN_CAPACITY = 100;
const USED_TOKENS = 25;

// Helper functions
const calculateExpiryDate = (): Date => {
    const expiry = new Date(PLAN_START_DATE);
    expiry.setDate(expiry.getDate() + FREE_TRIAL_DAYS);
    return expiry;
};

const calculateRemainingDays = (): number => {
    const today = new Date();
    const timeDiff = calculateExpiryDate().getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, Math.min(FREE_TRIAL_DAYS, daysDiff));
};

const calculateUsedDays = (): number => {
    return Math.max(0, FREE_TRIAL_DAYS - calculateRemainingDays());
};

const calculateDaysToResetTokens = (): number => {
    const today = new Date();
    const usedDays = calculateUsedDays();
    const nextResetDate = new Date(PLAN_START_DATE);
    nextResetDate.setDate(nextResetDate.getDate() + RESET_TOKEN_DAYS * Math.ceil((usedDays + 1) / RESET_TOKEN_DAYS));
    const timeDiff = nextResetDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(0, daysDiff);
};

const calculateRemainingDaysPercent = (): number => {
    return Math.round(calculateRemainingDays() / FREE_TRIAL_DAYS * 100);
};


export default function SubscriptionsClient() {
    const t = useTranslations();

    const expiryDate = useMemo(() => calculateExpiryDate(), []);
    const remainingDays = useMemo(() => calculateRemainingDays(), []);
    const usedDays = useMemo(() => calculateUsedDays(), []);
    const remainingPercent = useMemo(() => calculateRemainingDaysPercent(), []);
    const daysToReset = useMemo(() => calculateDaysToResetTokens(), []);

    return (
        <>
            <Typography className="font-bold mb-1" variant="h4" component="h1">
                {t("pages.subscriptions.title")}
            </Typography>
            <Typography variant="body2" component="p">
                {t("pages.subscriptions.context")}
            </Typography>
            <Spacer height={30} />
            
            <WelcomeBanner expiryDate={expiryDate} remainingDays={remainingDays} />
            <Spacer height={30} />
            
            <CurrentPlanSection
                expiryDate={expiryDate}
                remainingDays={remainingDays}
                usedDays={usedDays}
                remainingPercent={remainingPercent}
                usedTokens={USED_TOKENS}
                tokenCapacity={TOKEN_CAPACITY}
                daysToReset={daysToReset}
            />
            <Spacer height={30} />
            
            <SubscriptionPlansSection remainingDays={remainingDays} />
            <Spacer height={30} />
            
            <AdditionalTokensSection remainingDays={remainingDays} />
        </>
    );
}
