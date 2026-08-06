/**
 * Featured investment targets shown on the tier list page.
 * Names track Wiki examples used in tier guide prose — re-check after patches.
 */
export interface TopUnit {
  id: string;
  name: string;
  tier: 'SS' | 'S' | 'A';
  role: string;
  blurb: string;
  /** Official Wiki path when available */
  wikiPath?: string;
  /** In-page anchor on tier list */
  anchor: string;
  initial: string;
}

export const TOP_UNITS: TopUnit[] = [
  {
    id: 'cursed-copycat',
    name: 'Cursed Copycat (Pure)',
    tier: 'SS',
    role: 'Secret DPS',
    blurb: 'Priority home for Trait Rerolls and evolution mats.',
    wikiPath: '/Cursed_Copycat_(Pure)',
    anchor: 'ss-tier',
    initial: 'C',
  },
  {
    id: 'awakened-sibling',
    name: 'Awakened Sibling (Restricted)',
    tier: 'SS',
    role: 'Secret DPS',
    blurb: 'Banner-era carry — invest if you pull them.',
    wikiPath: '/Awakened_Sibling_(Restricted)',
    anchor: 'ss-tier',
    initial: 'A',
  },
  {
    id: 'divine-general',
    name: 'Divine General (Adaptation)',
    tier: 'S',
    role: 'Core DPS',
    blurb: 'Strong main when you lack every SS.',
    wikiPath: '/Divine_General_(Adaptation)',
    anchor: 's-tier',
    initial: 'D',
  },
  {
    id: 'story-a-core',
    name: 'Best A-tier Story clear',
    tier: 'A',
    role: 'Farm / clear',
    blurb: 'Reliable until you own S/SS — see A section.',
    anchor: 'a-tier',
    initial: 'A',
  },
  {
    id: 'utility-s',
    name: 'Top utility / amp',
    tier: 'S',
    role: 'Support',
    blurb: 'Slow / amp / economy that keeps carries alive.',
    anchor: 's-tier',
    initial: 'U',
  },
  {
    id: 'flex-boss',
    name: 'Boss / flex specialist',
    tier: 'S',
    role: 'Flex',
    blurb: 'Second core or boss slot after main DPS is built.',
    anchor: 'team-framework',
    initial: 'F',
  },
];

export const WIKI_BASE = 'https://wiki.vanguards.gg';
