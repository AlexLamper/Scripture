import { NextResponse, type NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';

const locales = ['en-US', 'nl-NL'];

function getLocale(request: NextRequest): string {
  const negotiator = new Negotiator({
    headers: { 'accept-language': request.headers.get('accept-language') || '' }
  });
  const languages = negotiator.languages();
  return matchLocale(languages, locales, 'en-US');
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    // Public Routes
    '/',
    '/about',
    '/help',
    '/faq',

    // Protected Routes
    '/home',
    '/map',
    '/chapters',
    '/characters',
    '/places',
    '/events',
    '/themes',
    '/teachings',
    '/notes',
    '/leaderboard',
    '/settings',
    '/learn',

    // API and dynamic routes
    '/api/:path*',
    '/dashboard',

    // Exclude static assets
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
