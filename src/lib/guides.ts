/** Guide URL slug → content collection id + optional extra widgets. */

export type GuideExtra = 'hub' | 'top-units' | 'summon-pity' | 'reroll';

export interface GuideDef {
  slug: string;
  contentId: string;
  extras?: GuideExtra[];
}

export const GUIDE_DEFS: GuideDef[] = [
  { slug: '', contentId: 'anime-vanguards', extras: ['hub'] },
  { slug: 'codes', contentId: 'anime-vanguards-codes' },
  { slug: 'tier-list', contentId: 'anime-vanguards-tier-list', extras: ['top-units'] },
  { slug: 'beginner-guide', contentId: 'anime-vanguards-beginner-guide' },
  { slug: 'returning-guide', contentId: 'anime-vanguards-returning-guide' },
  { slug: 'traits', contentId: 'anime-vanguards-traits' },
  { slug: 'trait-reroll-odds', contentId: 'anime-vanguards-trait-reroll-odds', extras: ['reroll'] },
  { slug: 'summon-pity', contentId: 'anime-vanguards-summon-pity', extras: ['summon-pity'] },
  { slug: 'farm-trait-rerolls', contentId: 'anime-vanguards-farm-trait-rerolls' },
  { slug: 'lobby-guide', contentId: 'anime-vanguards-lobby-guide' },
  { slug: 'trading', contentId: 'anime-vanguards-trading' },
  { slug: 'evolve', contentId: 'anime-vanguards-evolve' },
  { slug: 'event', contentId: 'anime-vanguards-event' },
];

export function guideBySlug(slug: string): GuideDef | undefined {
  return GUIDE_DEFS.find((g) => g.slug === slug);
}

export function hrefForGuide(slug: string): string {
  return slug ? `/anime-vanguards/${slug}/` : '/anime-vanguards/';
}
