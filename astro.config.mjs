// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Set SITE in env for production if needed
const site = process.env.SITE || 'https://animevanguards.co';

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
