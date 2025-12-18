'use client';

import React from "react";
import { Carousel, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import WelcomeSection from "./components/WelcomeSection";
import GetStartedTipsSection from "./components/GetStartedTipsSection";
import FreeTrialFeaturesSection from "./components/FreeTrialFeaturesSection";
import FeaturesTBCSection from "./components/FeaturesTBCSection";
import NeedHelpSection from "./components/NeedHelpSection";

export default function DashboardClient() {
    const t = useTranslations();
    
    const welcome = t('pages.dashboard.welcome');
    const getStartedTips = t('pages.dashboard.getStartedTips');
    const freeTrialFeatures = t('pages.dashboard.freeTrialFeatures');
    const featuresTBC = t('pages.dashboard.featuresTBC');
    const needHelp = t('pages.dashboard.needHelp');

    return (
        <>
            <Carousel slideNum={2} />

            {welcome && (
                <>
                    <WelcomeSection 
                        title={welcome.title}
                        line1={welcome.line1}
                        line2={welcome.line2}
                    />
                </>
            )}
        
            {getStartedTips && (
                <>
                    <GetStartedTipsSection
                        title={getStartedTips.title}
                        context={getStartedTips.context}
                        steps={getStartedTips.steps}
                    />
                    <Spacer height={20} />
                </>
            )}

            {freeTrialFeatures && (
                <>
                    <FreeTrialFeaturesSection
                        title={freeTrialFeatures.title}
                        context={freeTrialFeatures.context}
                        features={freeTrialFeatures.list}
                        remarksBody={freeTrialFeatures.remarks?.body}
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
                        remarksTitle={featuresTBC.remarks?.title}
                        remarksContext={featuresTBC.remarks?.context}
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