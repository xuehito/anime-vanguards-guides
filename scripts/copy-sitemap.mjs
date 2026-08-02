/**
 * @astrojs/sitemap emits sitemap-index.xml + sitemap-0.xml.
 * Search Console and many tools expect /sitemap.xml — copy the urlset there.
 */
import { copyFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const distPath = fileURLToPath(new URL('../dist/', import.meta.url));

if (!existsSync(distPath)) {
  console.error('[copy-sitemap] dist/ not found — run astro build first');
  process.exit(1);
}

const files = readdirSync(distPath);
const chunk = files.find((f) => /^sitemap-\d+\.xml$/.test(f));
const sourceName = chunk || (files.includes('sitemap-index.xml') ? 'sitemap-index.xml' : null);

if (!sourceName) {
  console.error('[copy-sitemap] No sitemap-*.xml in dist/');
  process.exit(1);
}

const source = join(distPath, sourceName);
const dest = join(distPath, 'sitemap.xml');
copyFileSync(source, dest);
console.log(`[copy-sitemap] ${sourceName} → sitemap.xml`);
