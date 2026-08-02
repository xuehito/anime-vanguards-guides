---
name: av-guides-site
description: >
  Operate the Anime Vanguards English guide site (Astro + Markdown on Cloudflare):
  Route A content ops (codes sync, archive by update, version hot bar), daily/weekly
  checklists, git push + Actions deploy, DNS, GA4/GSC, sitemap. Use when the user
  says 更新 codes, 周运营, 运营检查清单, sync codes with wiki, Route A, animevanguards.co
  ops, or runs /av-guides-site.
metadata:
  short-description: "AV Guides ops, codes sync, deploy"
---

# AV Guides Site Ops

## Project facts

| Item | Value |
|------|--------|
| Local root | `/Users/starx/anime-vanguards-guides` |
| GitHub | `https://github.com/xuehito/anime-vanguards-guides` |
| Production | `https://animevanguards.co` |
| Pages project | `anime-vanguards-guides` |
| Deploy | GitHub Actions → `wrangler pages deploy` |

Work in the project root. Prefer edit → build → push → watch Actions over manual Dashboard clicks.

## Positioning (do not fight official sites)

| Site | Role |
|------|------|
| vanguards.gg | Patch truth / changelog |
| wiki.vanguards.gg | Database (units, full codes archive, tier authority) |
| **animevanguards.co** | Fast codes + decision path (what to do next) |

Link out for authority; never invent codes; never claim official.

---

## Route A — default operating mode

**Goal:** Keep codes fresh, patch label honest, deploy green, glance GSC/GA weekly.

**Primary reference (full checklists):**  
`references/ops-checklist.md`  
Human copy: `docs/ops-checklist.md`

### When user says「更新 codes / 有新码 / sync codes」

**Prefer automated script first:**

```bash
cd /Users/starx/anime-vanguards-guides
npm run sync:codes:dry    # preview
npm run sync:codes        # write MD from Wiki active table
npm run build
```

Then commit + push **or** let user merge the daily PR from `Sync codes from Wiki` workflow.

If script fails or Discord has codes Wiki lacks: fall back to manual edit per `references/ops-checklist.md` §1.

Scheduled automation: `.github/workflows/sync-codes.yml` (daily 12:00 UTC → PR on branch `chore/sync-codes-wiki`).

### When user says「周运营 / 每周检查 / weekly ops」

Execute **§3 Weekly** in `references/ops-checklist.md`:

1. Re-diff active codes vs Wiki
2. Remind/check GSC sitemap + queries (user may need to open Console UI)
3. Summarize GA focus: landing pages, pages/session, `copy_all` / `click_related`
4. Smoke `animevanguards.co` + sitemap.xml headers

### When user says「大更新 / Update X 上线」

Execute **§2 Patch day** in `references/ops-checklist.md`:

1. `VersionHotBar.astro` version + note
2. Codes active + new archive group title
3. Event / tier `patch` text if stale
4. Deploy + mobile smoke home + codes

### Definition of Done (codes update)

- [x] `updated` is today  
- [x] active matches known-good sources  
- [x] expired moved to `archivedByUpdate`  
- [x] build OK + Actions success  
- [x] live Codes shows new Last checked  

---

## Workflow index

| Intent | Section |
|--------|---------|
| Codes / 运营清单 | Route A + `references/ops-checklist.md` |
| Local preview | B |
| Git deploy | C |
| Domain DNS | D + `references/dns-and-domain.md` |
| CF dist not found | E + `references/deploy-checklist.md` |
| GA / GSC / sitemap | F |
| Ads toggle | G |

---

## A. Content files map

| File | URL / role |
|------|------------|
| `src/content/guides/anime-vanguards-codes.md` | `/anime-vanguards/codes/` — **highest priority** |
| `src/components/VersionHotBar.astro` | Home patch banner + hot tasks |
| `src/content/guides/anime-vanguards-event.md` | Event playbook |
| `src/content/guides/anime-vanguards-tier-list.md` | Investment narrative; link Wiki tier |
| `...-traits.md` / `...-evolve.md` / beginner / hub | Supporting path |

### Codes frontmatter (current schema)

```yaml
title: "Anime Vanguards Codes (Month Year) — Working + Copy"
updated: "YYYY-MM-DD"
type: codes
order: 2
patch: "Update 14.0"
activeCodes:
  - code: "X"
    rewards: "..."
    requirement: "Level 30"
    new: true
archivedByUpdate:
  - update: "Update 14.0 Part 1"
    codes:
      - code: "Old"
        rewards: "..."
        requirement: "Level 30"
```

Optional legacy: `expiredCodes` flat list (layout prefers `archivedByUpdate` when present).

---

## B. Local dev

```bash
cd /Users/starx/anime-vanguards-guides
npm run dev -- --host 127.0.0.1 --port 4321
npm run build   # required before claiming ready; runs copy-sitemap
```

---

## C. Git + deploy

```bash
git add -A
git commit -m "$(cat <<'EOF'
Update Anime Vanguards codes (active + archive)

Sync with Wiki/Discord; refresh updated date.
EOF
)"
git push origin main
gh run list -R xuehito/anime-vanguards-guides --limit 3
gh run watch <id> -R xuehito/anime-vanguards-guides --exit-status
```

Secrets (do not print): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Smoke:

```bash
curl -sI --max-time 15 https://animevanguards.co/anime-vanguards/codes/ | head -8
curl -sI --max-time 15 https://animevanguards.co/sitemap.xml | head -8
```

If local DNS is `198.18.x` (proxy Fake-IP), note that live checks may need non-proxy network.

---

## D–E. Domain / CF build

See `references/dns-and-domain.md` and `references/deploy-checklist.md`.  
Empty CF Build command → set `npm run build` + output `dist`.

---

## F. SEO & analytics

- Sitemap: auto on build → `https://animevanguards.co/sitemap.xml`
- GA4 id: `G-Y1DW60FQMH` in `BaseLayout.astro`
- Events: `copy_code`, `copy_all`, `click_related`, `click_start_path`
- GSC verification files go in `public/google*.html`

Weekly: user opens GSC/GA; agent prepares what to look for and can curl public URLs.

---

## G. Ads

Default **off** (`PUBLIC_ADS_ENABLED` not true). Route A does not enable ads.

---

## Safety

- No invented codes  
- No force-push unless asked  
- No secrets in commits or chat  
- No RMT / account sales content  
- Stay unofficial in copy  

## References

- **`references/ops-checklist.md`** — full daily / patch / weekly checklists (Route A)
- `docs/ops-checklist.md` — short human checklist
- `references/deploy-checklist.md`
- `references/dns-and-domain.md`
- `docs/cloudflare-setup.md`
