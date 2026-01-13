'use client';

import { HeroSection, Spacer } from "@/components";
import { useTranslations } from "@/contexts/AppContext";
import { getSVGIcon } from "@/helpers/utils";
import { useMemo } from "react";
import WhyYouNeedADigitalIdentity from "./components/WhyYouNeedADigitalIdentity";
import ChooseYourDigitalIdentity from "./components/ChooseYourDigitalIdentity";
import QuickComparison from "./components/QuickComparison";
import NeedHelpDeciding from "./components/NeedHelpDeciding";

export default function GetYourDigitalIDClient() {
  const t = useTranslations();

  const translations = useMemo(() => {
    const getYourDigitalID = t('pages.getYourDigitalID');
    return {
      whyYouNeedADigitalIdentity: getYourDigitalID?.whyYouNeedADigitalIdentity,
      quickEasyApply: getYourDigitalID?.whyYouNeedADigitalIdentity?.quickEasyApply,
      chooseYourDigitalIdentity: getYourDigitalID?.chooseYourDigitalIdentity,
      quickComparison: getYourDigitalID?.quickComparison,
      needHelpDeciding: getYourDigitalID?.needHelpDeciding,
    }
  }, [t]);

  return (
    <>
      <HeroSection
        title={ t('pages.getYourDigitalID.title') }
        description={ t('pages.getYourDigitalID.context') }
        icon={ getSVGIcon('id-card', 24, '#FFFFFF') }
        colorScheme="violet"
      />

      <Spacer height={30} />
      
      <WhyYouNeedADigitalIdentity
        whyYouNeedADigitalIdentity={translations.whyYouNeedADigitalIdentity}
        quickEasyApply={translations.quickEasyApply}
      />

      <Spacer height={30} />

      <ChooseYourDigitalIdentity 
        chooseYourDigitalIdentity={translations.chooseYourDigitalIdentity}
      />

      <Spacer height={30} />

      <QuickComparison
        quickComparison={translations.quickComparison}
      />

      <Spacer height={30} />

      <NeedHelpDeciding
        needHelpDeciding={translations.needHelpDeciding}
      />
    </>
  );
}