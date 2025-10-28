"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Locale = 'en' | 'zh-HK' | 'zh-CN';

export const locales: Locale[] = ['en', 'zh-HK', 'zh-CN'];

export const localeLabels: Record<Locale, string> = {
  'en': 'English',
  'zh-HK': '繁體中文',
  'zh-CN': '简体中文'
};

interface AppContextType {
  // Language
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
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
  const [messages, setMessages] = useState<Record<string, any>>({});
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Load messages for the current locale
  const loadMessages = async (localeToLoad: Locale) => {
    try {
      const messageModule = await import(`../i18n/${localeToLoad}.json`);
      setMessages(messageModule.default || messageModule);
    } catch (error) {
      console.error(`Failed to load messages for locale: ${localeToLoad}`, error);
      // Fallback to English messages
      try {
        const fallbackModule = await import(`../i18n/en.json`);
        setMessages(fallbackModule.default || fallbackModule);
      } catch (fallbackError) {
        console.error('Failed to load fallback messages', fallbackError);
        setMessages({});
      }
    }
  };

  // Load saved locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && locales.includes(savedLocale)) {
      setLocale(savedLocale);
      loadMessages(savedLocale);
    } else {
      loadMessages(defaultLocale);
    }
  }, [defaultLocale]);

  // Load messages when locale changes
  useEffect(() => {
    loadMessages(locale);
    localStorage.setItem('locale', locale);
  }, [locale]);

  // Translation function that works with nested objects
  const t = (key: string, params?: Record<string, string | number>) => {
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
