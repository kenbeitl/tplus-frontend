import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';


// [TODO]: can be imported from strapi backend
export const locales = ['en', 'zh-HK', 'zh-CN'] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});