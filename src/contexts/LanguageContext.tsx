"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'zh-HK' | 'zh-CN';

export const locales: Locale[] = ['en', 'zh-HK', 'zh-CN'];

export const localeLabels: Record<Locale, string> = {
  'en': 'English',
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文'
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation function (can be replaced with next-intl later)
const translations: Record<Locale, Record<string, string>> = {
  'en': {
    'nav.dashboard': 'Dashboard',
    'nav.services': 'Services',
    'nav.govConnect': 'GovConnect',
    'nav.bizConnect': 'BizConnect',
    'nav.payConnect': 'PayConnect',
    'nav.safeConnect': 'SafeConnect',
    'nav.signConnect': 'SignConnect',
    'app.title': 'TPlus Frontend',
    'menu.language': 'Language',
  },
  'zh-HK': {
    'nav.dashboard': '儀表板',
    'nav.services': '服務',
    'nav.govConnect': '政府連接',
    'nav.bizConnect': '商業連接',
    'nav.payConnect': '支付連接',
    'nav.safeConnect': '安全連接',
    'nav.signConnect': '簽署連接',
    'app.title': 'TPlus 前端',
    'menu.language': '語言',
  },
  'zh-CN': {
    'nav.dashboard': '仪表板',
    'nav.services': '服务',
    'nav.govConnect': '政府连接',
    'nav.bizConnect': '商业连接',
    'nav.payConnect': '支付连接',
    'nav.safeConnect': '安全连接',
    'nav.signConnect': '签署连接',
    'app.title': 'TPlus 前端',
    'menu.language': '语言',
  }
};

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale = 'en' }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    }
  }, []);

  // Save locale to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Simple translation function
  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[locale][key] || key;
    
    // Replace parameters if provided
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Hook for just getting the translation function
export function useTranslations() {
  const { t } = useLanguage();
  return t;
}