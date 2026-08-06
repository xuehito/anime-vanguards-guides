export interface HubLink {
  href: string;
  title: string;
  blurb: string;
}

export interface HubCategory {
  id: string;
  title: string;
  description: string;
  links: HubLink[];
}

/** Session-oriented hub grid — decision layer, not full Wiki mirror. */
export const HUB_CATEGORIES: HubCategory[] = [
  {
    id: 'codes-economy',
    title: 'Codes & free rewards',
    description: 'Redeem first, then spend smart.',
    links: [
      {
        href: '/anime-vanguards/codes/',
        title: 'Working codes',
        blurb: 'Copy active codes with requirements.',
      },
      {
        href: '/anime-vanguards/farm-trait-rerolls/',
        title: 'Farm Trait Rerolls',
        blurb: 'Boss / Rift shops and free tracks.',
      },
      {
        href: '/anime-vanguards/trading/',
        title: 'Trading pre-flight',
        blurb: 'Level gates, traits, what not to trade.',
      },
    ],
  },
  {
    id: 'progression',
    title: 'Progression',
    description: 'New or returning — first session path.',
    links: [
      {
        href: '/anime-vanguards/beginner-guide/',
        title: 'Beginner guide',
        blurb: 'What to farm first; what not to waste.',
      },
      {
        href: '/anime-vanguards/returning-guide/',
        title: 'Returning path',
        blurb: 'Back after a break in 10–30 minutes.',
      },
      {
        href: '/anime-vanguards/lobby-guide/',
        title: 'Lobby guide',
        blurb: 'Mandra, shops, where to click.',
      },
      {
        href: '/anime-vanguards/evolve/',
        title: 'Evolution priority',
        blurb: 'Who to evolve before a week of farm.',
      },
    ],
  },
  {
    id: 'meta-tools',
    title: 'Meta & tools',
    description: 'Where gems and rerolls should go.',
    links: [
      {
        href: '/anime-vanguards/tier-list/',
        title: 'Tier list',
        blurb: 'Investment ranks, not a name dump.',
      },
      {
        href: '/anime-vanguards/traits/',
        title: 'Traits guide',
        blurb: 'Spend tree for free code RR.',
      },
      {
        href: '/anime-vanguards/trait-reroll-odds/',
        title: 'Trait reroll odds',
        blurb: 'Monarch 0.1% + hard pity math.',
      },
      {
        href: '/anime-vanguards/summon-pity/',
        title: 'Summon pity planner',
        blurb: 'Gem budget for featured pulls.',
      },
    ],
  },
  {
    id: 'events',
    title: 'Events & limited',
    description: 'Shop order while the mode is live.',
    links: [
      {
        href: '/anime-vanguards/event/',
        title: 'Event playbook',
        blurb: 'Free rewards and RR before cosmetics.',
      },
      {
        href: '/anime-vanguards/codes/',
        title: 'Event codes',
        blurb: 'Often expire with the patch window.',
      },
    ],
  },
];
