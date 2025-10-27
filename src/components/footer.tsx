"use client";

import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import { useRouter, usePathname } from "@/config/i18n/routing";
import { routing } from "@/config/i18n/routing";
import { currencies } from "@/config/currency.config";
import { useCurrency } from "@/contexts/currency-context";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { currency, setCurrency } = useCurrency();

  const [showCurrencySelector, setShowCurrencySelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setShowLanguageSelector(false);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
    setShowCurrencySelector(false);
  };

  const socialLinks = [
    { name: "Twitter", url: "https://x.com/diyseclab", icon: "M12.845 2.13398C14.0997 2.11363 14.7676 2.53229 15.4054 3.06445C15.9468 3.02216 16.6505 2.74528 17.065 2.55232C17.1993 2.48493 17.3337 2.41786 17.468 2.35046C17.2312 2.93602 16.9103 3.39474 16.417 3.74251C16.3074 3.81976 16.1987 3.92434 16.0613 3.97362C16.0613 3.97584 16.0613 3.97838 16.0613 3.98061C16.7643 3.97394 17.3441 3.6837 17.8947 3.52603C17.8947 3.52856 17.8947 3.5311 17.8947 3.53365C17.6055 3.95454 17.214 4.38147 16.7963 4.6876C16.6277 4.8103 16.4591 4.93301 16.2905 5.05571C16.2997 5.73696 16.2795 6.38704 16.1404 6.95989C15.3314 10.2888 13.1878 12.5491 9.7945 13.517C8.5761 13.8648 6.60702 14.0075 5.21102 13.6903C4.51872 13.5329 3.89334 13.3552 3.30644 13.1203C2.98052 12.9896 2.67854 12.8485 2.38972 12.6876C2.29496 12.6346 2.2001 12.5818 2.10522 12.5287C2.42018 12.5376 2.78846 12.6168 3.14052 12.5649C3.45896 12.5179 3.77128 12.53 4.06514 12.4712C4.79794 12.324 5.4486 12.1294 6.00916 11.829C6.2809 11.6834 6.69324 11.5124 6.88634 11.3026C6.52248 11.3083 6.19256 11.2311 5.9223 11.144C4.87436 10.8051 4.26436 10.1824 3.86752 9.2468C4.1851 9.27827 5.09982 9.35394 5.31368 9.18894C4.91398 9.16891 4.52956 8.95688 4.25478 8.7992C3.41184 8.31634 2.72438 7.50634 2.72954 6.26021C2.84022 6.30821 2.9509 6.35653 3.06148 6.40453C3.27324 6.48622 3.48848 6.52978 3.74112 6.57778C3.8478 6.59781 4.06114 6.65534 4.18362 6.6137C4.17836 6.6137 4.17308 6.6137 4.16782 6.6137C4.00476 6.43982 3.73902 6.32411 3.57512 6.1375C3.03438 5.52206 2.52758 4.57507 2.84812 3.44686C2.9294 3.16077 3.05842 2.90805 3.19586 2.67502C3.20114 2.67757 3.2064 2.67979 3.21168 2.68234C3.2746 2.80282 3.415 2.89152 3.50408 2.99229C3.78024 3.30573 4.1209 3.5877 4.46812 3.83629C5.65108 4.68347 6.71642 5.20386 8.42738 5.58946C8.86134 5.68706 9.36308 5.76176 9.88146 5.76238C9.73578 5.37424 9.78258 4.7461 9.89726 4.37035C10.1856 3.42557 10.8119 2.74402 11.7307 2.37907C11.9504 2.29197 12.1941 2.22838 12.4498 2.17722C12.5815 2.16291 12.7133 2.14861 12.845 2.13398Z" },
    { name: "Instagram", url: "https://www.instagram.com/dseclab.io/", icon: "M8 0C5.827 0 5.555.01 4.702.048 3.85.087 3.269.222 2.76.42a3.921 3.921 0 00-1.417.923c-.445.444-.719.89-.923 1.417-.198.509-.333 1.09-.372 1.942C.01 5.555 0 5.827 0 8s.01 2.445.048 3.298c.039.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.719 1.417.923.509.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.445-.01 3.298-.048c.852-.039 1.433-.174 1.942-.372a3.922 3.922 0 001.417-.923c.445-.444.719-.89.923-1.417.198-.509.333-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.298c-.039-.852-.174-1.433-.372-1.942a3.922 3.922 0 00-.923-1.417A3.921 3.921 0 0013.24.42c-.509-.198-1.09-.333-1.942-.372C10.445.01 10.173 0 8 0zm0 1.441c2.136 0 2.39.009 3.233.047.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.009 2.39-.047 3.233c-.036.78-.166 1.203-.276 1.485-.145.374-.318.64-.598.92-.28.28-.546.453-.92.598-.282.11-.705.24-1.485.276-.844.038-1.097.047-3.233.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.479 2.479 0 01-.92-.598 2.478 2.478 0 01-.598-.92c-.11-.282-.24-.705-.276-1.485-.038-.844-.047-1.097-.047-3.233s.009-2.39.047-3.233c.036-.78.166-1.203.276-1.485.145-.374.318-.64.598-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.844-.038 1.097-.047 3.233-.047zm0 9.226a2.667 2.667 0 110-5.334 2.667 2.667 0 010 5.334zm0-6.775a4.108 4.108 0 100 8.216 4.108 4.108 0 000-8.216zm5.23-.162a.96.96 0 11-1.92 0 .96.96 0 011.92 0z" },
    { name: "YouTube", url: "https://www.youtube.com/@DIYSecurityLab", icon: "M16.0325 0.369454C16.807 0.572743 17.4168 1.17173 17.6238 1.9324C18 3.31101 18 6.1875 18 6.1875C18 6.1875 18 9.06389 17.6238 10.4427C17.4168 11.2033 16.807 11.8023 16.0325 12.0056C14.6288 12.375 9 12.375 9 12.375C9 12.375 3.37122 12.375 1.96752 12.0056C1.19311 11.8023 0.583159 11.2033 0.376159 10.4427C0 9.06389 0 6.1875 0 6.1875C0 6.1875 0 3.31101 0.376159 1.9324C0.583159 1.17173 1.19311 0.572743 1.96752 0.369454C3.37122 0 9 0 9 0C9 0 14.6288 0 16.0325 0.369454ZM11.8636 6.1876L7.1591 8.79913V3.57588L11.8636 6.1876Z" },
    { name: "TikTok", url: "https://www.tiktok.com/@diyseclab.io", icon: "M13.6893 6.47331C13.5586 6.48602 13.4273 6.49268 13.296 6.49327C11.8552 6.49347 10.5114 5.76723 9.72211 4.56182V11.1389C9.72211 13.8236 7.54571 16 4.86099 16C2.17627 16 -0.00012207 13.8236 -0.00012207 11.1389C-0.00012207 8.45417 2.17627 6.27777 4.86099 6.27777C4.96247 6.27777 5.06166 6.28689 5.16143 6.29317V8.68866C5.06166 8.67669 4.96361 8.65845 4.86099 8.65845C3.49077 8.65845 2.37998 9.76923 2.37998 11.1395C2.37998 12.5097 3.49077 13.6205 4.86099 13.6205C6.23148 13.6205 7.44177 12.5407 7.44177 11.1702L7.46571 0H9.75745C9.97355 2.05512 11.6307 3.66035 13.6916 3.81102V6.47331" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/diy-security-lab/", icon: "M3.12412 1.56485C3.12412 0.70105 2.42432 0 1.56256 0C0.697275 0 0 0.70105 0 1.56485C0 2.42916 0.697275 3.13021 1.56256 3.13021C2.42432 3.13021 3.12412 2.42916 3.12412 1.56485ZM2.91019 13H0.213925V4.31649H2.91019V13ZM7.18264 4.31648H4.6004V13H7.29112V8.70525C7.29112 7.57205 7.50505 6.47473 8.90666 6.47473C10.2891 6.47473 10.3068 7.77018 10.3068 8.77702V13H13V8.23771C13 5.89903 12.496 4.10117 9.76892 4.10117C8.45812 4.10117 7.57871 4.82092 7.21948 5.50377H7.18264V4.31648Z" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
      <div className="container mx-auto px-8 md:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Customer Service */}
          <div className="min-w-[300px]">
            <h3 className="font-bold text-lg mb-4">{t("customerService.title")}</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {t("customerService.hours")}
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {t("customerService.email")} <span className="text-white">contato@diyseclab.io</span>
              </li>
            </ul>

            <a
              href="https://api.whatsapp.com/send?phone=5511919050416"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-3 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <div className="text-left">
                <div className="font-semibold text-sm">{t("customerService.whatsapp.button")}</div>
                <div className="text-xs">{t("customerService.whatsapp.via")}</div>
              </div>
            </a>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-bold text-lg mb-4">{t("social.follow")}</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-accent rounded-lg transition-colors"
                  aria-label={social.name}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={social.icon} clipRule="evenodd" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Language and Currency Selectors */}
          <div className="flex gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCurrencySelector(!showCurrencySelector)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                {currencies[currency]?.code} {currencies[currency]?.symbol}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCurrencySelector && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCurrencySelector(false)} />
                  <div className="absolute bottom-full mb-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-700">
                        {t("selectors.country")}
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {Object.values(currencies).map((curr) => (
                          <button
                            key={curr.code}
                            onClick={() => handleCurrencyChange(curr.code)}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded ${
                              currency === curr.code ? 'bg-gray-700 font-semibold' : ''
                            }`}
                          >
                            {curr.name} ({curr.code} {curr.symbol})
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center gap-2 transition-colors"
              >
                {locale === 'br' ? 'Português (Brasil)' : 'English'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLanguageSelector && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowLanguageSelector(false)} />
                  <div className="absolute bottom-full mb-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 min-w-[200px]">
                    <div className="p-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b border-gray-700">
                        {t("selectors.language")}
                      </div>
                      {routing.locales.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => handleLanguageChange(loc)}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 rounded ${
                            locale === loc ? 'bg-gray-700 font-semibold' : ''
                          }`}
                        >
                          {loc === 'br' ? 'Português (Brasil)' : 'English'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
