# AV Guides — Anime Vanguards (static MD)

Unofficial English guide site for Roblox **Anime Vanguards**: codes, tier list, beginner guide.

Stack: **Astro** (static output) + **Markdown** content collections. Deploy to **Vercel** and/or **Cloudflare Pages**.

## Quick start

```bash
cd anime-vanguards-guides
npm install
npm run dev
```

Open http://localhost:4321

```bash
npm run build    # → dist/
npm run preview  # preview production build
```

## Update content (daily ops)

| Task | File |
|------|------|
| Active / expired codes | `src/content/guides/anime-vanguards-codes.md` (YAML frontmatter) |
| Tier list prose | `src/content/guides/anime-vanguards-tier-list.md` |
| Beginner guide | `src/content/guides/anime-vanguards-beginner-guide.md` |
| Hub page | `src/content/guides/anime-vanguards.md` |

For codes, edit only the frontmatter arrays:

```yaml
updated: "2026-08-02"
activeCodes:
  - code: "EXAMPLE"
    rewards: "50 Trait Rerolls"
    requirement: "Level 30"
    new: true
expiredCodes:
  - code: "OLD"
    rewards: "..."
```

Then rebuild / push — no CMS.

## Project map

```
src/
  content/guides/*.md     # all article content
  content.config.ts       # MD schema (codes arrays, SEO fields)
  components/             # Header, Footer, CodeTable, AdSlot, Seo
  layouts/                # BaseLayout, GuideLayout
  pages/                  # routes (static)
  styles/global.css
public/                   # robots.txt, favicon, CF _headers
vercel.json
wrangler.toml
```

## Deploy

### Site URL

Set `SITE` so sitemap + canonical tags are correct:

```bash
# local / CI
SITE=https://yourdomain.com npm run build
```

### Vercel

1. Import the Git repo.
2. Framework: **Astro** (or Other).
3. Build: `npm run build` · Output: `dist`
4. Env: `SITE=https://your-production-domain`

`vercel.json` already adds basic security + long-cache headers for assets.

### Cloudflare Pages

1. New project → connect repo.
2. Build command: `npm run build`
3. Build output directory: `dist`
4. Env var: `SITE=https://your-production-domain`
5. Node version: **22** (see `package.json` engines)

`public/_headers` is copied into `dist` for CF header rules.

### Dual deploy

Same `dist/` artifact works on both. Point DNS (or use one host + the other as preview). Prefer **one production origin** for SEO; use the second for staging if you want.

## Ads (later)

1. Placeholder slots: `src/components/AdSlot.astro` (leaderboard / in-article / footer).
2. When AdSense (or similar) is approved, add the loader script in `BaseLayout.astro` and paste `<ins class="adsbygoogle">` inside `AdSlot`.
3. Keep Privacy Policy + Disclaimer updated.
4. Reserved min-heights reduce CLS when ads load.

## SEO checklist

- [x] Unique title + description per page
- [x] Canonical + Open Graph basics
- [x] `sitemap` integration (`@astrojs/sitemap`)
- [x] `robots.txt`
- [ ] Search Console + real domain in `SITE` / `robots.txt`
- [ ] Replace contact email before launch

## License / affiliation

Fan content only. Not affiliated with Roblox or Anime Vanguards developers.
