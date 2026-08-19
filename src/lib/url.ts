/**
 * Locale-prefix URL helpers. English has no prefix; others do.
 * Trailing slashes match astro.config (`trailingSlash: 'always'`).
 */

import { defaultLocale, isLocale, type Locale } from '../i18n/routing';
import { siteUrl } from '../config/site';

function ensureTrailingSlash(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

/** Strip a leading locale prefix if present. */
export function stripLocalePrefix(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const segments = clean.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0]) && segments[0] !== defaultLocale) {
    const rest = segments.slice(1).join('/');
    return rest ? ensureTrailingSlash(`/${rest}`) : '/';
  }
  return clean === '/' ? '/' : ensureTrailingSlash(clean);
}

/** Build a path with the locale prefix applied (or none for default locale). */
export function localizePath(path: string, locale: Locale): string {
  const cleanPath = stripLocalePrefix(path);
  if (locale === defaultLocale) return cleanPath;
  if (cleanPath === '/') return `/${locale}/`;
  return `/${locale}${cleanPath}`;
}

/** Absolute URL (with domain) for a path + locale. */
export function absoluteUrl(path: string, locale: Locale): string {
  return `${siteUrl}${localizePath(path, locale)}`;
}

export function homeUrl(locale: Locale): string {
  return localizePath('/', locale);
}

/**
 * Generate hreflang alternates. Always includes x-default → English.
 */
export function languageAlternates(
  buildPath: (locale: Locale) => string,
  locales: readonly Locale[],
): Array<{ hreflang: string; href: string }> {
  const items = locales.map((loc) => ({
    hreflang: loc === 'zh' ? 'zh-Hans' : loc,
    href: `${siteUrl}${buildPath(loc)}`,
  }));
  items.push({
    hreflang: 'x-default',
    href: `${siteUrl}${buildPath(defaultLocale)}`,
  });
  return items;
}

/** Extract locale from a URL pathname. */
export function localeFromPath(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    return segments[0];
  }
  return defaultLocale;
}

/** Same page, different locale. */
export function pathForLocale(pathname: string, locale: Locale): string {
  return localizePath(stripLocalePrefix(pathname), locale);
}
