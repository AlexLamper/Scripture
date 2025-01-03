"use client";

import './globals.css';
import { IntlProvider, NextIntlClientProvider } from 'next-intl'; 
import Navbar2 from '@/components/common/Navbar2';
import Footer from '@/components/common/Footer';
import Sidebar from '@/components/common/Sidebar';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  
  // Fallback to 'en' if locale is undefined
  const currentLocale = locale || 'en';

  return (
    <html lang={currentLocale}>
      <head>
        <title>Scripture</title>
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider locale={currentLocale}>
            <IntlProvider locale={currentLocale} messages={require(`../locales/${currentLocale}/common.json`)}>
              <Navbar2 />
              <div className={`flex ${isHomePage ? 'lg:max-h-[100vh] md:max-h-[100vh]' : ''}`}>
                <Sidebar />
                <main className="flex-grow">{children}</main>
              </div>
              {!isHomePage && <Footer />}
            </IntlProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

