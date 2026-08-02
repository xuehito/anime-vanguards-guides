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

### Cloudflare Pages (automated via GitHub Actions)

Workflow: `.github/workflows/deploy-cloudflare.yml`  
Push to `main` → `npm ci` → `npm run build` → `wrangler pages deploy dist`.

**One-time setup**

1. Cloudflare Dashboard → **My Profile → API Tokens → Create Token**  
   Use template **Edit Cloudflare Workers** (includes Pages), or custom:
   - Account → Cloudflare Pages → Edit  
   - Account → Account Settings → Read (if prompted)
2. Copy **Account ID** (Workers & Pages overview sidebar).
3. Add GitHub secrets on the repo:

```bash
# from a machine with gh auth
gh secret set CLOUDFLARE_API_TOKEN -R xuehito/anime-vanguards-guides
gh secret set CLOUDFLARE_ACCOUNT_ID -R xuehito/anime-vanguards-guides
```

4. Create the Pages project once (optional; first deploy may create it):

```bash
npx wrangler login
npx wrangler pages project create anime-vanguards-guides --production-branch=main
```

5. Custom domain: Pages project → **Custom domains** → `animevanguards.co`  
   Build env in Actions already sets `SITE=https://animevanguards.co`.

**Manual local deploy**

```bash
npx wrangler login
npm run deploy:cf
```

`public/_headers` is copied into `dist` for CF header rules.

#### Alternative: Cloudflare “Connect to Git” (no Actions secrets)

Dashboard → Pages → Create → Connect GitHub → select this repo:

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output | `dist` |
| Root | `/` |
| Env `SITE` | `https://animevanguards.co` |
| Env `NODE_VERSION` | `22` |

Do **not** enable both Connect-to-Git and the Actions deploy for the same project (double deploys).

### Dual deploy

Same `dist/` artifact works on both. Point DNS (or use one host + the other as preview). Prefer **one production origin** for SEO; use the second for staging if you want.

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
