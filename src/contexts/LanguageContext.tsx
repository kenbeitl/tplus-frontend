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
  messages: Record<string, any>;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({ children, defaultLocale = 'en' }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);
  const [messages, setMessages] = useState<Record<string, any>>({});

  // Load messages for the current locale
  const loadMessages = async (localeToLoad: Locale) => {
    try {
      const messageModule = await import(`../messages/${localeToLoad}.json`);
      setMessages(messageModule.default || messageModule);
    } catch (error) {
      console.error(`Failed to load messages for locale: ${localeToLoad}`, error);
      // Fallback to English messages
      try {
        const fallbackModule = await import(`../messages/en.json`);
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

  const value: LanguageContextType = {
    locale,
    setLocale,
    t,
    messages
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