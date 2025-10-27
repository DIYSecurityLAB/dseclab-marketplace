/**
 * Locale configuration
 * Centralized locale settings and display names
 */

export interface LocaleConfig {
  code: string;
  name: string;
  nativeName: string;
}

/**
 * Available locales with their display names
 */
export const localeConfigs: Record<string, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
  },
  br: {
    code: 'br',
    name: 'Portuguese (Brazil)',
    nativeName: 'Português (Brasil)',
  },
};

/**
 * Get all supported locale codes
 */
export const supportedLocales = Object.keys(localeConfigs);

/**
 * Default locale
 */
export const defaultLocale = 'br';
