export interface FaqItem {
  question: string;
  answer: string;
}

/** Shared FAQ copy for Codes / Tier / Reroll pages (UI + FAQPage schema). */

export const CODES_FAQ: FaqItem[] = [
  {
    question: 'Do Anime Vanguards codes expire?',
    answer:
      'Yes. Most event and milestone codes expire after a short window. Redeem as soon as you can and re-check this list after each update.',
  },
  {
    question: 'Are Anime Vanguards codes case-sensitive?',
    answer:
      'Usually yes. Use the Copy button and paste exactly into the in-game Codes panel — do not retype by hand if you can avoid it.',
  },
  {
    question: 'Why doesn’t an Anime Vanguards code work?',
    answer:
      'Common reasons: already redeemed, expired, wrong spelling, level requirement not met (often Level 10 or 30), or an old server. Rejoin a fresh server and try again.',
  },
  {
    question: 'Where do new codes drop first?',
    answer:
      'Usually official Discord announcements, then Wiki Codes. This site syncs from the Wiki when possible — always cross-check if a redeem fails.',
  },
  {
    question: 'Is this codes list official?',
    answer:
      'No. This is an unofficial fan site. Codes originate from the developers; full archives also live on the official Wiki Codes page.',
  },
  {
    question: 'What should I do after redeeming codes?',
    answer:
      'Spend free Trait Rerolls on a unit you will main (see the tier list and traits guide). Extra currency can go into limited event shops before cosmetics.',
  },
];

export const TIER_FAQ: FaqItem[] = [
  {
    question: 'Is this the official Anime Vanguards tier list?',
    answer:
      'No. The official competitive rankings live on the Wiki Tier List. This page focuses on investment priority — who deserves Trait Rerolls, evolution mats, and banner gems.',
  },
  {
    question: 'How often is the tier list updated?',
    answer:
      'We refresh after major patches (see the Last checked date). Meta can shift mid-update; always re-check the Wiki for brand-new units.',
  },
  {
    question: 'Should I only play SS-tier units?',
    answer:
      'SS units are the safest long-term investments, but strong S/A units with good traits often clear content fine. Prefer a unit you will actually place and upgrade.',
  },
  {
    question: 'Where should free code Trait Rerolls go?',
    answer:
      'On your main DPS or a clear endgame carry — not on temporary fillers. Pair this list with the traits guide and reroll odds calculator before mass-rerolling.',
  },
  {
    question: 'Story vs Infinite — same tier list?',
    answer:
      'Investment priority is similar early on. Some units shine more in Infinite or events; use Wiki mode notes when you specialize.',
  },
];

export const REROLL_FAQ: FaqItem[] = [
  {
    question: 'What are the official Monarch trait rates?',
    answer:
      'Per the official Wiki Traits page, Monarch is 0.1% (1/1,000) with hard pity at 1,500 rerolls. Always re-check Wiki after balance patches.',
  },
  {
    question: 'How does hard pity work in the calculator?',
    answer:
      'If a trait has a pity value, the model treats that roll as guaranteed if you have not hit earlier. Rolls until pity = pity − your current progress.',
  },
  {
    question: 'Is Ethereal better than Monarch?',
    answer:
      'Monarch is usually the endgame target on carries (huge DMG, placement tradeoffs). Ethereal is more common and still excellent — pick based on unit kit and bank size.',
  },
  {
    question: 'How do I get more Trait Rerolls?',
    answer:
      'Redeem active codes, clear event free tracks/shops, and follow the farm Trait Rerolls guide. Reroll at Mandra in the lobby.',
  },
  {
    question: 'Should I reroll every unit?',
    answer:
      'No. Bank RR for mains and SS/S investments. Filler units can stay on default or cheap traits until you have surplus.',
  },
];

export const SUMMON_FAQ: FaqItem[] = [
  {
    question: 'Are the summon pity rates official?',
    answer:
      'Presets are planning estimates for gem budgets. Always confirm live banner rate-up % and pity in the game UI or official Wiki before spending a large bank.',
  },
  {
    question: 'How does hard pity work in this calculator?',
    answer:
      'If a pity value is set, the model treats that pull as guaranteed if you have not hit earlier. Soft pity ramps are not modeled — use Custom if you only know a soft curve.',
  },
  {
    question: 'What is gems per pull?',
    answer:
      'The cost of one single summon in gems (or equivalent currency). Multi-pulls are just N × single cost in this planner.',
  },
  {
    question: 'Should I pull every featured unit?',
    answer:
      'No. Check the investment tier list first. Bank gems for SS/S holes in your clear team rather than every FOMO banner.',
  },
  {
    question: 'What do I do after I pull the unit?',
    answer:
      'Evolve and trait the unit if it is a long-term main. Use free code Trait Rerolls and the trait odds calculator — do not spread RR across fillers.',
  },
];

export const FAQ_BY_TYPE: Partial<Record<string, FaqItem[]>> = {
  codes: CODES_FAQ,
  'tier-list': TIER_FAQ,
  'trait-odds': REROLL_FAQ,
  'summon-pity': SUMMON_FAQ,
};

export function faqPageLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
