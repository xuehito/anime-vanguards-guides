/**
 * Ads configuration — Adsterra keys via PUBLIC_AD_* env vars (AnvilWiki pattern).
 *
 * Empty key → that slot does not render.
 * PUBLIC_ADS_ENABLED=true turns on in-article / footer slots that already have keys.
 * Homepage leaderboard uses `live` and the 728×90 key (existing unit kept as fallback).
 */

export type AdSlotId =
  | 'banner-320x50'
  | 'banner-300x250'
  | 'banner-728x90'
  | 'banner-468x60'
  | 'sidebar-160x600'
  | 'sidebar-160x300';

export interface AdSlotDef {
  id: AdSlotId;
  width: number;
  height: number;
  env: string;
  /** Placement used by the older AdSlot API */
  placement?: 'leaderboard' | 'in-article' | 'footer' | 'sidebar';
}

export const AD_SLOTS: Record<AdSlotId, AdSlotDef> = {
  'banner-320x50': {
    id: 'banner-320x50',
    width: 320,
    height: 50,
    env: 'PUBLIC_AD_MOBILE_320X50',
  },
  'banner-300x250': {
    id: 'banner-300x250',
    width: 300,
    height: 250,
    env: 'PUBLIC_AD_BANNER_300X250',
    placement: 'in-article',
  },
  'banner-728x90': {
    id: 'banner-728x90',
    width: 728,
    height: 90,
    env: 'PUBLIC_AD_BANNER_728X90',
    placement: 'leaderboard',
  },
  'banner-468x60': {
    id: 'banner-468x60',
    width: 468,
    height: 60,
    env: 'PUBLIC_AD_BANNER_468X60',
  },
  'sidebar-160x600': {
    id: 'sidebar-160x600',
    width: 160,
    height: 600,
    env: 'PUBLIC_AD_SIDEBAR_160X600',
    placement: 'sidebar',
  },
  'sidebar-160x300': {
    id: 'sidebar-160x300',
    width: 160,
    height: 300,
    env: 'PUBLIC_AD_SIDEBAR_160X300',
    placement: 'sidebar',
  },
};

/** Existing live homepage 728×90 unit — used only when env key is empty. */
const LEGACY_LEADERBOARD_KEY = '54f713ed15b4e0ccb1dbce29218460bb';

function readEnv(name: string): string {
  const env = import.meta.env as Record<string, string | undefined>;
  return (env[name] || '').trim();
}

export function getAdKey(slot: AdSlotId): string {
  const key = readEnv(AD_SLOTS[slot].env);
  if (key) return key;
  if (slot === 'banner-728x90') return LEGACY_LEADERBOARD_KEY;
  return '';
}

/** Master switch for layout slots that are not marked live. */
export function adsMasterEnabled(): boolean {
  return readEnv('PUBLIC_ADS_ENABLED') === 'true';
}

export function isSlotOn(
  slot: AdSlotId,
  opts: { live?: boolean; enabled?: boolean } = {},
): boolean {
  if (!getAdKey(slot)) return false;
  if (opts.live === true || opts.enabled === true) return true;
  return adsMasterEnabled();
}

export function slotFromPlacement(
  placement: 'leaderboard' | 'in-article' | 'footer' | 'sidebar',
): AdSlotId {
  if (placement === 'leaderboard' || placement === 'footer') return 'banner-728x90';
  if (placement === 'sidebar') return 'sidebar-160x300';
  return 'banner-300x250';
}
