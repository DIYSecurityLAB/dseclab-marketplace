import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'br'],

  // Used when no locale matches
  defaultLocale: 'br',

  // Optionally, you can configure the pathname for each locale
  // This enables locale prefixes in the URL (e.g. /en/products, /pt/produtos)
  localePrefix: 'always',

  // Automatically detect locale from browser's Accept-Language header
  // Will redirect user to their preferred language on first visit
  localeDetection: true,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
