'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/config/i18n/routing';
import { routing } from '@/config/i18n/routing';
import { localeConfigs } from '@/config/i18n/locales.config';
import { useState } from 'react';

export function LanguageSelector() {
  const t = useTranslations('navbar.languageSelector');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
        aria-label={t('label')}
      >
        <span className="text-sm font-medium">
          {localeConfigs[locale]?.nativeName || locale}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-black border border-white/20 rounded-md shadow-lg z-20">
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full text-left px-4 py-2 hover:bg-white/10 transition-colors first:rounded-t-md last:rounded-b-md ${
                  loc === locale ? 'bg-white/5 font-bold' : ''
                }`}
              >
                {localeConfigs[loc]?.nativeName || loc}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
