import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const codeEntry = z.object({
  code: z.string(),
  rewards: z.string(),
  requirement: z.string().optional(),
  new: z.boolean().optional(),
  /** Display expiry, e.g. "Aug 3, 2026" or "Expired · Aug 3, 2026" */
  expires: z.string().optional(),
  /** ISO date YYYY-MM-DD when known (for sorting / future filters) */
  expiresAt: z.string().optional(),
});

const archiveGroup = z.object({
  update: z.string(),
  codes: z.array(codeEntry),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Short label in nav / cards */
    label: z.string().optional(),
    /** SEO & display: last content update (ISO date) */
    updated: z.string(),
    /**
     * Planned next refresh (ISO datetime). For codes: typically last sync + 24h.
     * Optional — UI falls back to updated (noon) + 24 hours.
     */
    nextUpdate: z.string().optional(),
    /** Guide kind for templates */
    type: z
      .enum([
        'hub',
        'codes',
        'tier-list',
        'beginner',
        'returning',
        'traits',
        'trait-odds',
        'summon-pity',
        'farm-rr',
        'lobby',
        'evolve',
        'event',
        'trading',
        'guide',
      ])
      .default('guide'),
    /** Order on hub / home (lower = first) */
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /** Optional patch label shown in UI */
    patch: z.string().optional(),
    /** For type=codes only */
    activeCodes: z.array(codeEntry).optional(),
    /** Flat expired list (optional if using archive) */
    expiredCodes: z.array(codeEntry).optional(),
    /** Wiki-style archive grouped by update */
    archivedByUpdate: z.array(archiveGroup).optional(),
  }),
});

export const collections = { guides };
