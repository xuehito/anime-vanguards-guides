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

## Ads (later)

Ad slots are **hidden by default** (no placeholders on the page).

1. Slots stay wired in layouts via `AdSlot` (leaderboard / in-article / footer).
2. Enable with env: `PUBLIC_ADS_ENABLED=true`
3. When AdSense is approved, add the loader script in `BaseLayout.astro` and paste `<ins class="adsbygoogle">` inside `AdSlot`.
4. Keep Privacy Policy + Disclaimer updated.

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
