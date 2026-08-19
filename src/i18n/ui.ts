/**
 * UI message loader — JSON strings + English fallback (AnvilWiki pattern).
 */

import en from '../locales/en.json';
import zh from '../locales/zh.json';

import { defaultLocale, type Locale } from './routing';

const messages: Record<Locale, Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  zh: zh as Record<string, unknown>,
};

function deepMerge(
  base: Record<string, unknown>,
  source: Record<string, unknown>,
): Record<string, unknown> {
  if (typeof base !== 'object' || base === null) return source;
  if (typeof source !== 'object' || source === null) return base;
  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      out[key] &&
      typeof out[key] === 'object' &&
      !Array.isArray(out[key])
    ) {
      out[key] = deepMerge(out[key] as Record<string, unknown>, value as Record<string, unknown>);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function getUi(locale: string): typeof en {
  if (locale === defaultLocale) return en;
  const locMessages = isLocaleSafe(locale) ? messages[locale] : {};
  return deepMerge(en as Record<string, unknown>, locMessages) as typeof en;
}

export function t(locale: string, key: string): unknown {
  const ui = getUi(locale);
  return key.split('.').reduce<unknown>((acc, k) => {
    return acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined;
  }, ui);
}

function isLocaleSafe(value: string): value is Locale {
  return value in messages;
}
