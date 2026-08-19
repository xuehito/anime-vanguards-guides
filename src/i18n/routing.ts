/**
 * i18n routing — single source of truth for supported locales.
 *
 * When adding a language, sync three places:
 *   1. locales here
 *   2. src/locales/<locale>.json
 *   3. translated content (or English fallback)
 *
 * URL strategy (as-needed prefix, Astro prefixDefaultLocale: false):
 *   - English (default) has NO prefix: /anime-vanguards/codes/
 *   - Other locales ARE prefixed:      /zh/anime-vanguards/codes/
 */

export const locales = ['en', 'zh'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/** English label for each locale (language switcher). */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
};

/** BCP 47 tags for <html lang> and date formatting. */
export const LOCALE_BCP47: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-CN',
};

/** hreflang values (zh uses Hans for Simplified). */
export const LOCALE_HREFLANG: Record<Locale, string> = {
  en: 'en',
  zh: 'zh-Hans',
};

export function isDefaultLocale(locale: string): boolean {
  return locale === defaultLocale;
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
