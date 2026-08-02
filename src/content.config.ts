import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const codeEntry = z.object({
  code: z.string(),
  rewards: z.string(),
  requirement: z.string().optional(),
  new: z.boolean().optional(),
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
      .enum(['hub', 'codes', 'tier-list', 'beginner', 'traits', 'evolve', 'event', 'guide'])
      .default('guide'),
    /** Order on hub / home (lower = first) */
    order: z.number().default(99),
    draft: z.boolean().default(false),
    /** For type=codes only */
    activeCodes: z.array(codeEntry).optional(),
    expiredCodes: z.array(codeEntry).optional(),
  }),
});

export const collections = { guides };
