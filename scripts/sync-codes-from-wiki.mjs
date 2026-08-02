#!/usr/bin/env node
/**
 * Fetch active codes from official Wiki, diff against content MD, rewrite frontmatter.
 * Used by GitHub Action (PR) and local: node scripts/sync-codes-from-wiki.mjs
 *
 * Source: https://wiki.vanguards.gg/Codes (active table only)
 * Never invents codes — only mirrors Wiki active list + archives removed actives.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CODES_PATH = join(ROOT, 'src/content/guides/anime-vanguards-codes.md');
const WIKI_URL = 'https://wiki.vanguards.gg/Codes';
const USER_AGENT = 'animevanguards.co-code-sync/1.0 (+https://github.com/xuehito/anime-vanguards-guides)';

const REWARD_RE =
  /(Trait Rerolls?|Memoria Shards?|Extermination Tokens?|Copycat Tokens?|Gambler'?s?\s*Tokens?|Gems?|Gold|Green Essence|Rainbow Essence|Blue Essence|Yellow Essence|Purple Essence|Pink Essence|Red Essence|Stat Chips?|Super Stat Chips?|IcedTea\w*|Summer Capsules?|Flowers\d*|Leaves|Present|Cake Slice|Phoenix Shard|Elemental Shard|Corruption Crystal|Command Seal|Spirit Wisp|Unidentified Unit|Unrecognized Unit|Unrecognized Familiar)\s*([\d,]+)/gi;

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function monthYearTitle(d = new Date()) {
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeItemName(name) {
  let n = name.replace(/\s+/g, ' ').trim();
  // plural-ish display
  if (/^Trait Reroll$/i.test(n)) n = 'Trait Rerolls';
  if (/^Memoria Shard$/i.test(n)) n = 'Memoria Shards';
  if (/^Extermination Token$/i.test(n)) n = 'Extermination Tokens';
  if (/^Copycat Token$/i.test(n)) n = 'Copycat Tokens';
  if (/^Stat Chip$/i.test(n)) n = 'Stat Chips';
  if (/^Gem$/i.test(n)) n = 'Gems';
  if (/Gambler/i.test(n)) n = "Gambler's Tokens";
  if (/^Summer Capsule$/i.test(n)) n = 'Summer Capsules';
  return n;
}

function formatRewards(cellText) {
  const found = [];
  const seen = new Set();
  let m;
  REWARD_RE.lastIndex = 0;
  while ((m = REWARD_RE.exec(cellText)) !== null) {
    const amount = m[2].replace(/,/g, '');
    const item = normalizeItemName(m[1]);
    const key = `${item}:${amount}`;
    if (seen.has(key)) continue;
    seen.add(key);
    found.push(`${Number(amount).toLocaleString('en-US')} ${item}`);
  }
  if (found.length) return found.join(', ');
  // fallback: short cleaned text
  const cleaned = cellText
    .replace(/Gamemodes|Quests|Battlepasses|Codes|Bundles|Events|Dungeons|Raids|Challenges|Crafting|Legend Stages|Shops|Limited_Modes/gi, ' ')
    .replace(/These fragments[\s\S]{0,120}/gi, ' ')
    .replace(/Crystalized memoria[\s\S]{0,80}/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
  return cleaned || 'Rewards (see Wiki)';
}

function formatRequirement(cellText) {
  const m = cellText.match(/Level\s*(\d+)/i);
  if (m) return `Level ${m[1]}`;
  if (/none|n\/a|no requirement|—|-/i.test(cellText) && !/Level/i.test(cellText)) return '—';
  return '—';
}

/**
 * Parse only the ACTIVE codes table (before the Archived Codes section heading).
 * Prefer data-code attributes; rewards/req from table row cells.
 */
export function parseWikiActiveCodes(html) {
  // Prefer region starting at the "only currently active" blurb, ending at h2 Archived
  let region = html;
  const start = html.search(/Only currently active codes are listed/i);
  const end = html.search(/id=["']Archived_Codes["']|>Archived Codes<\/h2>/i);
  if (start >= 0 && end > start) {
    region = html.slice(start, end);
  } else if (end > 0) {
    region = html.slice(0, end);
  } else {
    // fallback: first table after "active"
    const m = html.match(
      /Only currently active codes are listed[\s\S]*?(<table[\s\S]*?<\/table>)/i,
    );
    if (m) region = m[1];
  }

  // Prefer the first table in region (active list)
  const tableMatch = region.match(/<table[\s\S]*?<\/table>/i);
  const activeHtml = tableMatch ? tableMatch[0] : region;

  // Row-based: each tr with data-code
  const rows = [];
  const trRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
  let tr;
  while ((tr = trRe.exec(activeHtml)) !== null) {
    const row = tr[1];
    const codeMatch = row.match(/data-code=["']([^"']+)["']/i);
    if (!codeMatch) continue;
    const code = codeMatch[1].trim();
    if (!code || code.length > 64) continue;

    const tds = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((x) => x[1]);
    // expect: code | rewards | requirement | availability
    const rewardsText = stripHtml(tds[1] || tds[0] || '');
    const reqText = stripHtml(tds[2] || '');

    rows.push({
      code,
      rewards: formatRewards(rewardsText),
      requirement: formatRequirement(reqText || rewardsText),
    });
  }

  // de-dupe by code, keep first
  const seen = new Set();
  const out = [];
  for (const r of rows) {
    if (seen.has(r.code)) continue;
    seen.add(r.code);
    out.push(r);
  }
  return out;
}

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('Invalid MD frontmatter in codes file');
  return { fm: m[1], body: m[2] };
}

/** Minimal YAML extract for activeCodes list of {code,rewards,requirement,new?} */
function extractActiveFromFm(fm) {
  const block = fm.match(/activeCodes:\n([\s\S]*?)(?=\narchivedByUpdate:|\nexpiredCodes:|\n[a-zA-Z]|$)/);
  if (!block) return [];
  const items = [];
  const parts = block[1].split(/\n(?=  - code:)/);
  for (const p of parts) {
    const code = p.match(/code:\s*"([^"]+)"/)?.[1];
    if (!code) continue;
    items.push({
      code,
      rewards: p.match(/rewards:\s*"(.*)"/)?.[1] ?? '',
      requirement: p.match(/requirement:\s*"(.*)"/)?.[1] ?? '—',
      new: /new:\s*true/.test(p),
    });
  }
  return items;
}

function extractArchivedFromFm(fm) {
  const block = fm.match(/archivedByUpdate:\n([\s\S]*?)$/);
  if (!block) return [];
  const groups = [];
  const groupChunks = block[1].split(/\n(?=  - update:)/);
  for (const g of groupChunks) {
    const update = g.match(/update:\s*"(.*)"/)?.[1];
    if (!update) continue;
    const codes = [];
    const codeChunks = g.split(/\n(?=      - code:)/);
    for (const c of codeChunks) {
      const code = c.match(/code:\s*"([^"]+)"/)?.[1];
      if (!code) continue;
      codes.push({
        code,
        rewards: c.match(/rewards:\s*"(.*)"/)?.[1] ?? '',
        requirement: c.match(/requirement:\s*"(.*)"/)?.[1] ?? '—',
      });
    }
    groups.push({ update, codes });
  }
  return groups;
}

function extractScalar(fm, key, fallback = '') {
  const m = fm.match(new RegExp(`^${key}:\\s*"(.*)"\\s*$`, 'm'));
  return m ? m[1] : fallback;
}

function yamlEscape(s) {
  return String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function emitCodeEntry(c, indent, withNew = false) {
  const pad = ' '.repeat(indent);
  let out = `${pad}- code: "${yamlEscape(c.code)}"\n`;
  out += `${pad}  rewards: "${yamlEscape(c.rewards)}"\n`;
  out += `${pad}  requirement: "${yamlEscape(c.requirement || '—')}"\n`;
  if (withNew && c.new) out += `${pad}  new: true\n`;
  return out;
}

function buildFrontmatter({ title, description, label, updated, type, order, patch, active, archived }) {
  let fm = '';
  fm += `title: "${yamlEscape(title)}"\n`;
  fm += `description: "${yamlEscape(description)}"\n`;
  fm += `label: "${yamlEscape(label)}"\n`;
  fm += `updated: "${yamlEscape(updated)}"\n`;
  fm += `type: ${type}\n`;
  fm += `order: ${order}\n`;
  fm += `patch: "${yamlEscape(patch)}"\n`;
  fm += `activeCodes:\n`;
  for (const c of active) fm += emitCodeEntry(c, 2, true);
  fm += `archivedByUpdate:\n`;
  for (const g of archived) {
    fm += `  - update: "${yamlEscape(g.update)}"\n`;
    fm += `    codes:\n`;
    for (const c of g.codes) fm += emitCodeEntry(c, 6, false);
  }
  return fm;
}

function mergeArchive(archived, removed, patchLabel) {
  if (!removed.length) return archived;
  const groups = archived.map((g) => ({
    update: g.update,
    codes: [...g.codes],
  }));
  const label = `Auto-archived ${todayISO()} (${patchLabel})`;
  let group = groups.find((g) => g.update === label);
  if (!group) {
    group = { update: label, codes: [] };
    groups.unshift(group);
  }
  const existing = new Set(groups.flatMap((g) => g.codes.map((c) => c.code)));
  for (const r of removed) {
    if (existing.has(r.code)) continue;
    group.codes.push({
      code: r.code,
      rewards: r.rewards,
      requirement: r.requirement || '—',
    });
    existing.add(r.code);
  }
  return groups;
}

function codesEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].code !== b[i].code) return false;
    // rewards/req may reformat — compare code set primarily for "meaningful" change
  }
  const ra = a.map((x) => x.code).join('\0');
  const rb = b.map((x) => x.code).join('\0');
  return ra === rb;
}

function detailedEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (
      a[i].code !== b[i].code ||
      a[i].rewards !== b[i].rewards ||
      a[i].requirement !== b[i].requirement
    ) {
      return false;
    }
  }
  return true;
}

async function fetchWikiHtml() {
  const res = await fetch(WIKI_URL, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'text/html',
    },
  });
  if (!res.ok) throw new Error(`Wiki fetch failed: ${res.status} ${res.statusText}`);
  return res.text();
}

function setOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    writeFileSync(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, { flag: 'a' });
  }
}

async function main() {
  const dry = process.argv.includes('--dry-run');
  console.log(`Fetching ${WIKI_URL} ...`);
  const html = await fetchWikiHtml();
  const wikiActive = parseWikiActiveCodes(html);
  if (!wikiActive.length) {
    throw new Error('Parsed 0 active codes from Wiki — aborting to avoid wiping the list');
  }
  console.log(`Wiki active codes: ${wikiActive.length}`);
  for (const c of wikiActive) console.log(`  - ${c.code}: ${c.rewards} (${c.requirement})`);

  const raw = readFileSync(CODES_PATH, 'utf8');
  const { fm, body } = parseFrontmatter(raw);
  const prevActive = extractActiveFromFm(fm);
  const prevArchived = extractArchivedFromFm(fm);
  const patch = extractScalar(fm, 'patch', 'Update 14.0');
  const label = extractScalar(fm, 'label', 'Codes');
  const description = extractScalar(
    fm,
    'description',
    'Working Anime Vanguards codes with one-tap copy and copy-all.',
  );
  const order = Number(fm.match(/^order:\s*(\d+)/m)?.[1] ?? 2);

  const prevSet = new Set(prevActive.map((c) => c.code));
  const wikiSet = new Set(wikiActive.map((c) => c.code));

  const added = wikiActive.filter((c) => !prevSet.has(c.code));
  const removed = prevActive.filter((c) => !wikiSet.has(c.code));

  // mark new
  const nextActive = wikiActive.map((c) => ({
    ...c,
    new: added.some((a) => a.code === c.code) ? true : undefined,
  }));

  const nextArchived = mergeArchive(prevArchived, removed, patch);

  const title = `Anime Vanguards Codes (${monthYearTitle()}) — Working + Copy`;
  const updated = todayISO();

  const unchanged =
    detailedEqual(
      prevActive.map((c) => ({
        code: c.code,
        rewards: c.rewards,
        requirement: c.requirement,
      })),
      wikiActive,
    ) && removed.length === 0;

  // still bump nothing if fully same
  if (unchanged) {
    console.log('No changes vs Wiki active list (codes + rewards + requirements).');
    setOutput('changed', 'false');
    setOutput('added', '0');
    setOutput('removed', '0');
    return;
  }

  console.log(`Changes: +${added.length} / -${removed.length}`);
  if (added.length) console.log('  added:', added.map((c) => c.code).join(', '));
  if (removed.length) console.log('  removed:', removed.map((c) => c.code).join(', '));

  const newFm = buildFrontmatter({
    title,
    description,
    label,
    updated,
    type: 'codes',
    order,
    patch,
    active: nextActive,
    archived: nextArchived,
  });

  const out = `---\n${newFm}---\n${body.startsWith('\n') ? body : '\n' + body}`;
  if (dry) {
    console.log('--- dry-run frontmatter preview ---');
    console.log(newFm.slice(0, 1500));
    setOutput('changed', 'true');
    return;
  }

  writeFileSync(CODES_PATH, out, 'utf8');
  console.log(`Wrote ${CODES_PATH}`);
  setOutput('changed', 'true');
  setOutput('added', String(added.length));
  setOutput('removed', String(removed.length));
  setOutput('added_codes', added.map((c) => c.code).join(',') || 'none');
  setOutput('removed_codes', removed.map((c) => c.code).join(',') || 'none');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
