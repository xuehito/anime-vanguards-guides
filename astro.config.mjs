// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { locales, defaultLocale } from './src/i18n/routing.ts';

const site = process.env.SITE || 'https://animevanguards.co';

export default defineConfig({
  site,
  output: 'static',
  i18n: {
    locales: [...locales],
    defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale,
        locales: Object.fromEntries(
          locales.map((l) => [l, l === 'zh' ? 'zh-Hans' : l]),
        ),
      },
      filter: (page) => !page.includes('/ads/'),
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/' || path === '/zh/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (path.includes('/codes')) {
          item.changefreq = 'daily';
          item.priority = 0.95;
        } else if (path.includes('/tier-list') || path.includes('/beginner')) {
          item.changefreq = 'weekly';
          item.priority = 0.9;
        } else if (path.includes('/anime-vanguards')) {
          item.changefreq = 'weekly';
          item.priority = 0.85;
        } else {
          item.changefreq = 'monthly';
          item.priority = 0.4;
        }
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
});
