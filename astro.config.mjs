// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE in env for production, e.g. https://yourdomain.com
const site = process.env.SITE || 'https://animevanguards.guide';

// https://astro.build/config
export default defineConfig({
  site,
  output: 'static',
  integrations: [sitemap()],
  build: {
    format: 'directory',
  },
  trailingSlash: 'always',
});
