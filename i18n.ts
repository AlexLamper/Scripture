import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => ({
  locales: ['en-US', 'nl-NL'],
  defaultLocale: 'en-US',
  messages: (await import(`./messages/${requestLocale}.json`)).default
}));
