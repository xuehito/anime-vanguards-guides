/**
 * Site configuration — game-specific metadata.
 */

export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  domain: string;
  tagline: string;
  legalNotice: string;
  social: {
    official: string;
    discord: string;
    wiki: string;
    wikiCodes: string;
    changelog: string;
    roblox: string;
  };
  game: {
    name: string;
    platform: string;
  };
}

export const site: SiteConfig = {
  name: 'AV Guides',
  shortName: 'AV Guides',
  description:
    'Unofficial English Anime Vanguards guides: working codes, tier list, traits, evolve, and events.',
  domain: 'animevanguards.co',
  tagline: 'Fast codes + what to do next',
  legalNotice:
    'Unofficial fan resource for Roblox Anime Vanguards. Not affiliated with Roblox or the game developers.',
  social: {
    official: 'https://vanguards.gg/',
    discord: 'https://discord.com/invite/animevanguards',
    wiki: 'https://wiki.vanguards.gg/Anime_Vanguards_Wiki',
    wikiCodes: 'https://wiki.vanguards.gg/Codes',
    changelog: 'https://vanguards.gg/changelog',
    roblox: 'https://www.roblox.com/games/16146832113',
  },
  game: {
    name: 'Anime Vanguards',
    platform: 'Roblox',
  },
};

export const siteUrl: string = (process.env.SITE || `https://${site.domain}`).replace(/\/$/, '');
