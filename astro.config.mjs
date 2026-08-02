// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE in env for production if needed
const site = process.env.SITE || 'https://animevanguards.co';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [
    sitemap({
      // Prefer higher priority for money/traffic pages
      serialize(item) {
        const path = new URL(item.url).pathname;
        if (path === '/') {
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
