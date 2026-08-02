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

### Cloudflare Pages（连接 Git，自动构建）

**仅使用 Cloudflare Pages 拉 Git 构建**（仓库内已无 GitHub Actions 部署 workflow）。

Dashboard → Workers & Pages → 你的项目 → Settings / Builds：

| Setting | Value |
|---------|--------|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output | `dist` |
| Root | `/` |
| Env `SITE` | `https://animevanguards.co` |
| Env `NODE_VERSION` | `22` |

Push 到 `main` 即自动部署。`public/_headers` 会进 `dist`。

**自定义域名打不开？** 见 [`docs/cloudflare-setup.md`](docs/cloudflare-setup.md)  
（当前常见问题：域名还在 Spaceship 停放页，DNS 未指到 Pages。）

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
