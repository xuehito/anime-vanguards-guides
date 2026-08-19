# Ads config (Adsterra, AnvilWiki pattern)

English remains the default locale. Ads are opt-in per slot via env keys.

## Why iframe isolation

Each slot is `/ads/<type>/` with its own `window.atOptions`. Do not load multiple Adsterra units into the same page window.

## Env vars (Cloudflare Pages → Settings)

| Variable | Slot | Notes |
| --- | --- | --- |
| `PUBLIC_ADS_ENABLED` | in-article / footer on guide pages | `true` to show slots that already have keys |
| `PUBLIC_AD_BANNER_728X90` | Leaderboard | Homepage is live; falls back to the existing unit if unset |
| `PUBLIC_AD_MOBILE_320X50` | Sticky 320×50 | Highest-value slot; dismiss remembered in localStorage |
| `PUBLIC_AD_BANNER_300X250` | In-article | |
| `PUBLIC_AD_BANNER_468X60` | Classic banner | Optional |
| `PUBLIC_AD_SIDEBAR_160X300` | Sidebar | Optional |
| `PUBLIC_AD_SIDEBAR_160X600` | Sidebar tall | Optional |

Empty key → component returns nothing.

## Files

- `src/config/ads.ts` — keys + gating
- `src/components/ads/AdBanner.astro` — iframe
- `src/components/ads/StickyBanner.astro`
- `src/components/AdSlot.astro` — placement wrapper
- `src/pages/ads/[slot].astro` — isolated unit pages
- `public/ads.txt` — authorized sellers (fill publisher IDs when live)

## Do not ship

Popunder, Social Bar, or auto-redirect units.
