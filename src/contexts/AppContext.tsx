"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// Static imports for instant translation loading
import enMessages from '@/i18n/en.json';
import zhHKMessages from '@/i18n/zh-HK.json';
import zhCNMessages from '@/i18n/zh-CN.json';

export type Locale = 'en' | 'zh-HK' | 'zh-CN';

export const locales: Locale[] = ['en', 'zh-HK', 'zh-CN'];

export const localeLabels: Record<Locale, string> = {
  'en': 'English',
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文'
};

// Translation map for instant access
const translationMap: Record<Locale, Record<string, any>> = {
  'en': enMessages,
  'zh-HK': zhHKMessages,
  'zh-CN': zhCNMessages,
};

interface AppContextType {
  // Language
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => any;
  messages: Record<string, any>;
  // Drawer
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function AppProvider({ children, defaultLocale = 'en' }: AppProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>(translationMap[defaultLocale]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  // Load saved locale from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
    }
    
    // Load saved drawer state from localStorage
    const savedDrawerState = localStorage.getItem('drawerOpen');
    if (savedDrawerState !== null) {
      setDrawerOpen(savedDrawerState === 'true');
    }
  }, [defaultLocale]);

  // Switch translations instantly when locale changes
  useEffect(() => {
    setMessages(translationMap[locale]);
    if (isClient) {
      localStorage.setItem('locale', locale);
    }
  }, [locale, isClient]);

  // Save drawer state to localStorage when it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('drawerOpen', drawerOpen.toString());
    }
  }, [drawerOpen, isClient]);

  // Translation function that works with nested objects
  const t = (key: string, params?: Record<string, string | number>): any => {
    // Split the key by dots to handle nested objects (e.g., 'nav.dashboard')
    const keys = key.split('.');
    let translation: any = messages;
    
    // Navigate through the nested object
    for (const k of keys) {
      translation = translation?.[k];
      if (translation === undefined) break;
    }
    
    // If translation not found, return the key
    if (translation === undefined) {
      return key;
    }
    
    // If translation is an array, return it as-is
    if (Array.isArray(translation)) {
      return translation;
    }
    
    // If translation is an object (but not null), return it as-is
    if (typeof translation === 'object' && translation !== null) {
      return translation;
    }
    
    // Convert to string and replace parameters if provided
    let result = String(translation);
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        result = result.replace(`{${param}}`, String(value));
      });
    }
    
    return result;
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const value: AppContextType = {
    locale,
    setLocale,
    t,
    messages,
    drawerOpen,
    setDrawerOpen,
    toggleDrawer
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Hook for language functionality
export function useLanguage() {
  const { locale, setLocale, t, messages } = useApp();
  return { locale, setLocale, t, messages };
}

// Hook for just getting the translation function
export function useTranslations() {
  const { t } = useApp();
  return t;
}

// Hook for drawer functionality
export function useDrawer() {
  const { drawerOpen, setDrawerOpen, toggleDrawer } = useApp();
  return { drawerOpen, setDrawerOpen, toggleDrawer };
}
