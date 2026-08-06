/**
 * Summon / banner planning presets for Anime Vanguards.
 * Rates are planning defaults — always confirm live banner UI / Wiki after patches.
 * Source of truth for unit kits: https://wiki.vanguards.gg/
 */
export interface BannerPreset {
  id: string;
  name: string;
  /** Probability of the target unit (or rate-up slot) per single pull */
  rate: number;
  /** Hard pity pulls (0 / omit = none). Soft pity not modeled. */
  pity?: number;
  /** Gems (or currency) cost per single pull */
  gemsPerPull: number;
  summary: string;
}

export const WIKI_HOME_URL = 'https://wiki.vanguards.gg/Anime_Vanguards_Wiki';
export const DEFAULT_GEMS_PER_PULL = 50;

/**
 * Planning presets — not official published drop tables.
 * Prefer Custom when you know the exact rate-up %.
 */
export const BANNER_PRESETS: BannerPreset[] = [
  {
    id: 'featured-secret',
    name: 'Featured Secret (planning)',
    rate: 0.005,
    pity: 100,
    gemsPerPull: DEFAULT_GEMS_PER_PULL,
    summary: 'Chase Secret on a featured banner — 0.5% default, pity 100 (edit if banner differs)',
  },
  {
    id: 'featured-mythic',
    name: 'Featured Mythic (planning)',
    rate: 0.01,
    pity: 80,
    gemsPerPull: DEFAULT_GEMS_PER_PULL,
    summary: 'Featured Mythic rate-up — 1% default, pity 80 (verify in-game)',
  },
  {
    id: 'standard-rate-up',
    name: 'Rate-up unit (planning)',
    rate: 0.015,
    pity: 60,
    gemsPerPull: DEFAULT_GEMS_PER_PULL,
    summary: 'Generic rate-up slot — 1.5% default for rough gem budgets',
  },
  {
    id: 'any-mythic-plus',
    name: 'Any Mythic+ (planning)',
    rate: 0.03,
    pity: undefined,
    gemsPerPull: DEFAULT_GEMS_PER_PULL,
    summary: 'Hit any high rarity (not a specific unit) — looser estimate',
  },
];
