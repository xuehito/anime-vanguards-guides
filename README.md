# AV Guides — Anime Vanguards (static MD)

Unofficial guide site for Roblox **Anime Vanguards**: codes, tier list, beginner guide. English is the default locale (`/`); Chinese UI lives under `/zh/`.

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

## Ops (Route A)

Full checklists:

- Human: [`docs/ops-checklist.md`](docs/ops-checklist.md)
- Agent skill: `/av-guides-site` → `.grok/skills/av-guides-site/references/ops-checklist.md`

### Auto codes sync (Wiki → PR)

```bash
npm run sync:codes:dry   # preview
npm run sync:codes       # write activeCodes from Wiki
```

GitHub Action **Sync codes from Wiki** runs daily at **12:00 UTC** and opens a PR if the active list changed. Merge the PR to deploy.

## Update content (daily ops)

| Task | File |
|------|------|
| Active codes + archive by update | `src/content/guides/anime-vanguards-codes.md` (YAML frontmatter) |
| Home patch / hot bar | `src/components/VersionHotBar.astro` |
| Tier list prose | `src/content/guides/anime-vanguards-tier-list.md` |
| Beginner / traits / evolve / event | `src/content/guides/anime-vanguards-*.md` |
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
SITE=https://animevanguards.co npm run build
```

### Vercel

1. Import the Git repo.
2. Framework: **Astro** (or Other).
3. Build: `npm run build` · Output: `dist`
4. Env: `SITE=https://animevanguards.co`

`vercel.json` already adds basic security + long-cache headers for assets.

### Cloudflare Pages

详见 [`docs/cloudflare-setup.md`](docs/cloudflare-setup.md)。

**Git 构建（Dashboard 必填）**

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root | *(empty)* |
| Env `NODE_VERSION` | `22` |
| Env `SITE` | `https://animevanguards.co` |

若出现 `Output directory "dist" not found`，说明 Build command 为空，按上表补上后 Retry。

**备用：GitHub Actions**（`.github/workflows/deploy-cloudflare.yml`）  
Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。Push `main` 会 `build` + `wrangler pages deploy`。

## i18n + ads

See [`docs/i18n.md`](docs/i18n.md) and [`docs/ads.md`](docs/ads.md).

Ad slots use isolated iframes (`/ads/<type>/`). Empty `PUBLIC_AD_*` keys render nothing. Homepage 728×90 stays live with the existing unit unless you override `PUBLIC_AD_BANNER_728X90`. Guide in-article/footer slots also need `PUBLIC_ADS_ENABLED=true`.

## SEO checklist

- [x] Unique title + description per page
- [x] Canonical + Open Graph basics
- [x] `sitemap` integration (`@astrojs/sitemap`)
- [x] `robots.txt`
- [x] Domain: `animevanguards.co` in `SITE` / `robots.txt`
- [ ] Search Console verification after DNS is live
- [ ] Replace contact email before launch

## License / affiliation

Fan content only. Not affiliated with Roblox or Anime Vanguards developers.
