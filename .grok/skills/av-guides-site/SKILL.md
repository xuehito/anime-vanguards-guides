---
name: av-guides-site
description: >
  Operate the Anime Vanguards English guide site (Astro + Markdown static site on
  Cloudflare Pages): update codes/tier list content, local dev/build, git push,
  Cloudflare Git + GitHub Actions deploy, custom domain DNS diagnostics, GA4,
  sitemap.xml, Google Search Console verification, and ad-slot toggles.
  Use when the user mentions animevanguards.co, Anime Vanguards guides, AV codes
  page, CF Pages deploy, dist not found, sitemap, GSC verify, or runs /av-guides-site.
metadata:
  short-description: "Anime Vanguards guide site ops & deploy"
---

# AV Guides Site Ops

## Project facts (do not invent paths)

| Item | Value |
|------|--------|
| Local root | `/Users/starx/anime-vanguards-guides` |
| GitHub | `https://github.com/xuehito/anime-vanguards-guides` |
| Production domain | `https://animevanguards.co` |
| Pages default | `https://anime-vanguards-guides.pages.dev` |
| Pages project name | `anime-vanguards-guides` |
| Stack | Astro 7, static MD content collections, Node 22 |
| Deploy primary | GitHub Actions → Wrangler `pages deploy` |
| Deploy secondary | Cloudflare Pages Git build (must set Build command) |

Work **inside the project root** unless the user says otherwise.

## When to use which workflow

| User intent | Workflow |
|-------------|----------|
| 改 codes / tier / 文案 | A. Content update |
| 本地预览 | B. Local dev |
| push / 上线 | C. Git + deploy |
| 域名打不开 / DNS | D. Domain DNS |
| CF 构建失败 dist | E. Cloudflare build fix |
| 加 GA / sitemap / GSC 文件 | F. SEO & analytics |
| 开/关广告位 | G. Ads toggle |

Always prefer **automation** (edit files, `npm run build`, `git push`, `gh run watch`) over asking the user to click, except where secrets/Dashboard-only settings are required.

---

## A. Content update (daily ops)

### Codes (highest traffic)

Edit only:

`src/content/guides/anime-vanguards-codes.md`

Frontmatter schema (required fields for codes type):

```yaml
title: "Anime Vanguards Codes (Month Year)"
description: "..."
updated: "YYYY-MM-DD"
type: codes
order: 2
activeCodes:
  - code: "EXAMPLE"
    rewards: "..."
    requirement: "Level 30"   # or "—"
    new: true                   # optional
expiredCodes:
  - code: "OLD"
    rewards: "..."
    requirement: "Level 30"
```

Body: redeem steps, FAQ, links to tier list / beginner.

### Other guides

| File | URL |
|------|-----|
| `src/content/guides/anime-vanguards.md` | `/anime-vanguards/` |
| `...-tier-list.md` | `/anime-vanguards/tier-list/` |
| `...-beginner-guide.md` | `/anime-vanguards/beginner-guide/` |

After edits:

```bash
cd /Users/starx/anime-vanguards-guides
npm run build    # must pass before push if structural change
```

Then **C. Git + deploy**.

### Codes source of truth

Prefer official Discord codes channel; if uncertain, mark rewards carefully and note community-verified. Do not invent codes.

---

## B. Local dev

```bash
cd /Users/starx/anime-vanguards-guides
npm install      # if needed
npm run dev -- --host 127.0.0.1 --port 4321
```

Open `http://127.0.0.1:4321/`. Background the dev server; do not block the session.

```bash
npm run build && npm run preview
```

Build runs `astro build` then `scripts/copy-sitemap.mjs` → must produce `dist/sitemap.xml`.

---

## C. Git + deploy (automated)

### Commit & push

```bash
cd /Users/starx/anime-vanguards-guides
git status
git add -A
git commit -m "$(cat <<'EOF'
<short why>

<optional body>
EOF
)"
git push origin main
```

### Watch deploy

```bash
gh run list -R xuehito/anime-vanguards-guides --limit 3
gh run watch <id> -R xuehito/anime-vanguards-guides --exit-status
```

Workflow: `.github/workflows/deploy-cloudflare.yml`  
Secrets (already on repo; do not print values):

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

On success, verify:

```bash
curl -sI --max-time 15 https://animevanguards.co/ | head -15
curl -sI --max-time 15 https://animevanguards.co/sitemap.xml | head -10
```

### If Actions fails

1. `gh run view <id> --log-failed -R xuehito/anime-vanguards-guides | tail -80`
2. Common: missing Pages project → create with wrangler or first-create step; invalid token; build error
3. Project create (local, needs token in env):

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
npx wrangler pages project create anime-vanguards-guides --production-branch=main
```

**Never** put API tokens in chat or commit them.

---

## D. Custom domain DNS

### Expected end state

| Type | Name | Content | Proxy |
|------|------|---------|--------|
| CNAME | `@` | `anime-vanguards-guides.pages.dev` | Proxied |
| CNAME | `www` | `anime-vanguards-guides.pages.dev` | Proxied |

NS must be Cloudflare (`*.ns.cloudflare.com`), not Spaceship (`launch*.spaceship.net`).

Pages → **Custom domains**: `animevanguards.co` (+ `www`) status **Active**.  
Domain Zone and Pages project must be **same Cloudflare account**.

### Auto path (Dashboard)

Pages → Custom domains → add domain → allow CF to create DNS record.  
If stuck: remove domain from Custom domains, re-add.

### Diagnose (agent can run)

```bash
dig @1.1.1.1 animevanguards.co NS +short
dig @1.1.1.1 animevanguards.co A +short
dig @8.8.8.8 animevanguards.co NS +short
curl -sI --max-time 15 https://anime-vanguards-guides.pages.dev/ | head -12
curl -sI --max-time 15 https://animevanguards.co/ | head -12
```

| Symptom | Likely cause |
|---------|----------------|
| pages.dev 200, custom domain fail | Custom domain / SSL / DNS not linked to Pages |
| NS still Spaceship | Registrar nameservers not switched |
| dig empty A/CNAME on 1.1.1.1 | Zone has no records → re-add Custom domain |
| Local resolves `198.18.x` | Clash/Surge Fake-IP → test with phone data or disable proxy |
| TLS handshake hang / no cert | Universal SSL pending (up to ~24h after NS change) |

Full notes: `docs/cloudflare-setup.md` and `references/dns-and-domain.md`.

### Optional API DNS (user provides token in shell env only)

See `references/dns-and-domain.md` curl recipes. Do not request tokens to be pasted into chat.

---

## E. Cloudflare Git build fix

Error:

```text
No build command specified. Skipping build step.
Error: Output directory "dist" not found.
```

**Dashboard** → Workers & Pages → project → Settings → Builds:

| Field | Value |
|-------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | *(empty)* |
| Env `NODE_VERSION` | `22` |
| Env `SITE` | `https://animevanguards.co` |

Then Retry deployment.

Prefer Actions deploy if Git build remains broken. Avoid relying on empty Build command.

---

## F. SEO & analytics

### Sitemap (already automated on build)

- Build emits `dist/sitemap-0.xml`, `sitemap-index.xml`, copies → **`dist/sitemap.xml`**
- `public/robots.txt` lists both `sitemap.xml` and `sitemap-index.xml`
- Config: `astro.config.mjs` (`@astrojs/sitemap` serialize priorities)
- Live: `https://animevanguards.co/sitemap.xml`

Do not hand-write a static sitemap unless build pipeline is removed.

### GA4

In `src/layouts/BaseLayout.astro` head:

- gtag id: `G-Y1DW60FQMH` (current)
- Keep `is:inline` on config script
- Privacy page must mention Google Analytics when GA is enabled

To change ID: replace in BaseLayout + privacy.

### Google Search Console HTML file

Place verification file under **`public/`** (served at site root):

```bash
# example
cp /path/to/googleXXXX.html public/
git add public/googleXXXX.html
# commit + push (workflow C)
```

Verify URL: `https://animevanguards.co/googleXXXX.html`  
Then user clicks Verify in GSC. Submit sitemap: `https://animevanguards.co/sitemap.xml`

---

## G. Ads

`src/components/AdSlot.astro` renders **nothing** unless:

```bash
PUBLIC_ADS_ENABLED=true
```

Slots already wired in `GuideLayout` / home. When enabling:

1. Set env on CF Pages + document in `.env.example`
2. Uncomment AdSense loader in `BaseLayout` when approved
3. Update Privacy for ads/cookies

Default: keep ads **off**.

---

## Site map (routes)

| Path | Source |
|------|--------|
| `/` | `src/pages/index.astro` |
| `/anime-vanguards/` | guide MD hub |
| `/anime-vanguards/codes/` | codes MD + CodeTable |
| `/anime-vanguards/tier-list/` | tier MD |
| `/anime-vanguards/beginner-guide/` | beginner MD |
| `/about/` `/privacy/` `/disclaimer/` `/contact/` | static pages |

Content schema: `src/content.config.ts`.

---

## Safety

- No force-push to `main` unless user asks
- No commit of `.env`, tokens, or secrets
- No RMT / account-selling content
- Unofficial fan site: keep disclaimer affiliation language

## References

- `references/dns-and-domain.md` — DNS recipes & diagnostics
- `references/deploy-checklist.md` — deploy / CF Dashboard checklist
- Repo `docs/cloudflare-setup.md` — human-facing CF notes
- Repo `README.md` — overview
