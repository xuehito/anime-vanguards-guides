# Deploy checklist

## GitHub Actions (repo workflow)

File: `.github/workflows/deploy-cloudflare.yml`

On push to `main`:

1. `npm ci`
2. `npm install -D wrangler@4`
3. `SITE=https://animevanguards.co npm run build`
4. `wrangler pages deploy dist --project-name=anime-vanguards-guides --branch=main`

Secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

```bash
gh secret list -R xuehito/anime-vanguards-guides
gh run list -R xuehito/anime-vanguards-guides --limit 5
gh run watch <id> -R xuehito/anime-vanguards-guides --exit-status
```

## Cloudflare Pages Git build

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root | empty |
| `NODE_VERSION` | `22` |
| `SITE` | `https://animevanguards.co` |

Empty Build command → `dist not found` failure.

## Post-deploy smoke

```bash
curl -sI https://animevanguards.co/ | head -8
curl -sI https://animevanguards.co/anime-vanguards/codes/ | head -8
curl -sI https://animevanguards.co/sitemap.xml | head -8
curl -s https://animevanguards.co/google02feb1972b04d9c9.html
```

Expect: HTTP 200, `server: cloudflare` where applicable; sitemap `application/xml` or XML body; GSC file body matches verification string.

## Dual deploy note

Actions + CF Git both on = two builds per push. Prefer one primary path after both work.
