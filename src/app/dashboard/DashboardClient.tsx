'use client';

import { useEffect, useMemo, useState } from "react";
import { Carousel, Spacer, StyledIcon } from "@/components";
import { useTranslations, useApp } from "@/contexts/AppContext";
import WelcomeSection from "./components/WelcomeSection";
import QuickActionsSection from "./components/QuickActionsSection";
import RecommendedForYouSection from "./components/RecommendedForYouSection";
import FreeTrialFeaturesSection from "./components/FreeTrialFeaturesSection";
import FeaturesTBCSection from "./components/FeaturesTBCSection";
import NeedHelpSection from "./components/NeedHelpSection";
import ModalWelcome from "./modal/welcome";
import { Badge, Box, Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import { getSVGIcon } from "@/helpers/utils";
import theme from "@/theme/theme";
import { useRouter } from "next/navigation";

export default function DashboardClient() {

    const t = useTranslations();
    const router = useRouter();
    const { showDashboardWelcomeModal, setShowDashboardWelcomeModal } = useApp();
    const [modalOpen, setModalOpen] = useState(false);
    
    const welcome = t('pages.dashboard.welcome');
    const freeTrialFeatures = t('pages.dashboard.freeTrialFeatures');
    const featuresTBC = t('pages.dashboard.featuresTBC');
    const needHelp = t('pages.dashboard.needHelp');

    useEffect(() => {
        // Show modal if user preference is set to show it
        if (showDashboardWelcomeModal) {
            setModalOpen(true);
        }
    }, [showDashboardWelcomeModal]);

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDontShowAgain = (dontShow: boolean) => {
        if (dontShow) {
            setShowDashboardWelcomeModal(false);
        }
    };

    const translations = useMemo(() => {
        const quickActions = t('pages.dashboard.quickActions');
        const recommenededForYou = t('pages.dashboard.recommendedForYou');
        return {
            quickActions,
            quickActionsList: quickActions.list,
            recommenededForYou,
            recommenededForYouList: recommenededForYou.list,
        }
    }, [t]);

    return (
        <>
            <ModalWelcome 
                open={modalOpen}
                onClose={handleCloseModal}
                onDontShowAgain={handleDontShowAgain}
            />
            
            <Carousel slideNum={2} />

            {welcome && (
                <>
                    <WelcomeSection 
                        title={welcome.title}
                        context={welcome.context}
                    />
                </>
            )}

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <QuickActionsSection
                        title={translations.quickActions.title}
                        context={translations.quickActions.context}
                        actions={translations.quickActionsList}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <RecommendedForYouSection
                        title={translations.recommenededForYou.title}
                        context={translations.recommenededForYou.context}
                        actions={translations.recommenededForYouList}
                    />
                </Grid>
            </Grid>
            <Spacer height={20} />
           
            {freeTrialFeatures && (
                <>
                    <FreeTrialFeaturesSection
                        title={freeTrialFeatures.title}
                        context={freeTrialFeatures.context}
                        features={freeTrialFeatures.features}
                        remarks={freeTrialFeatures.remarks}
                        viewSubscriptionPlansText={t('pages.dashboard.viewSubscriptionPlans')}
                    />
                    <Spacer height={20} />
                </>
            )}
            
            {featuresTBC && (
                <>
                    <FeaturesTBCSection
                        title={featuresTBC.title}
                        context={featuresTBC.context}
                        features={featuresTBC.list}
                        remarks={featuresTBC.remarks}
                        moreFeatures={featuresTBC.moreFeatures}
                        viewSubscriptionPlansText={t('pages.dashboard.viewSubscriptionPlans')}
                    />
                    <Spacer height={20} />
                </>
            )}
            
            {needHelp && (
                <NeedHelpSection
                    title={needHelp.title}
                    context={needHelp.context}
                    helpCentreText={t('nav.helpCentre')}
                    contactSupportText={t('common.contactSupport')}
                />
            )}
        </>
    );
}