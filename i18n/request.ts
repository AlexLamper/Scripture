import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  // Await the requestLocale, which may be undefined
  const locale = (await requestLocale) || 'en-US';

  return {
    // Define your supported locales
    locales: ['en-US', 'nl-NL'],
    // Specify the resolved locale
    locale,
    // Load your messages for the resolved locale
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
