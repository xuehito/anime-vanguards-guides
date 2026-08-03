/**
 * Official-leaning trait rates from wiki.vanguards.gg/Traits (community wiki).
 * Always re-check Wiki after balance patches.
 */
export interface TraitRate {
  id: string;
  name: string;
  /** Probability per reroll, e.g. 0.001 = 0.1% */
  rate: number;
  /** Hard pity (guaranteed by this many rolls) when published */
  pity?: number;
  /** One-line effect summary */
  summary: string;
  /** Chase / solid / common */
  tier: 'chase' | 'strong' | 'good' | 'common';
}

export const OFFICIAL_TRAITS: TraitRate[] = [
  {
    id: 'monarch',
    name: 'Monarch',
    rate: 0.001,
    pity: 1500,
    summary: '+300% DMG, −10% SPA, +5% RNG, placement limit 1',
    tier: 'chase',
  },
  {
    id: 'ethereal',
    name: 'Ethereal',
    rate: 0.00175,
    pity: 858,
    summary: 'Greatly increased damage and attack speed',
    tier: 'chase',
  },
  {
    id: 'deadeye',
    name: 'Deadeye',
    rate: 0.00375,
    pity: 400,
    summary: '+45% crit-related accuracy/damage (see Wiki)',
    tier: 'strong',
  },
  {
    id: 'solar',
    name: 'Solar',
    rate: 0.005,
    pity: 300,
    summary: 'Increased range + mild DMG/SPA',
    tier: 'strong',
  },
  {
    id: 'range-blitz',
    name: 'Range Blitz',
    rate: 0.0185,
    pity: undefined,
    summary: '−20% SPA (faster attacks)',
    tier: 'good',
  },
  {
    id: 'fortune',
    name: 'Fortune',
    rate: 0.025,
    pity: undefined,
    summary: '+20% income / −10% cost (non-farm nuance on Wiki)',
    tier: 'good',
  },
  {
    id: 'marksman',
    name: 'Marksman',
    rate: 0.065,
    pity: undefined,
    summary: 'Common-strong range/accuracy style buff (see Wiki)',
    tier: 'good',
  },
  {
    id: 'vigor',
    name: 'Vigor (family ~26%)',
    rate: 0.26,
    pity: undefined,
    summary: 'Damage family (I/II/III sub-rolls share the pool)',
    tier: 'common',
  },
  {
    id: 'swift',
    name: 'Swift (family ~26%)',
    rate: 0.26,
    pity: undefined,
    summary: 'Attack speed family (I/II/III sub-rolls share the pool)',
    tier: 'common',
  },
];

export const WIKI_TRAITS_URL = 'https://wiki.vanguards.gg/Traits';
export const WIKI_REROLLS_URL = 'https://wiki.vanguards.gg/Trait_Rerolls';
export const WIKI_TRADING_URL = 'https://wiki.vanguards.gg/Trading';
