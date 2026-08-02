import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const codeEntry = z.object({
  code: z.string(),
  rewards: z.string(),
  requirement: z.string().optional(),
  new: z.boolean().optional(),
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
    /** Guide kind for templates */
    type: z
      .enum([
        'hub',
        'codes',
        'tier-list',
        'beginner',
        'traits',
        'trait-odds',
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
