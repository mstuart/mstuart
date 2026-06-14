// Keeps the auto-managed repo blocks in README.md in sync with GitHub.
//
// Every public, non-fork, non-archived repo that is NOT already linked in a
// hand-curated section gets routed by its name prefix into the matching themed
// section (flagged 🆕 so you can write a real summary and merge it up into the
// curated list). Anything that matches no prefix lands in the catch-all
// "Recently Published" block. Curated lines are never touched.
//
// Run `DRY=1 node scripts/update-readme.mjs` to preview routing without writing.

import { readFile, writeFile } from 'node:fs/promises';

const USER = 'mstuart';
const README = new URL('../README.md', import.meta.url);

// Prefix → section routing. A fresh repo whose name starts with one of a
// section's prefixes is appended to that section's in-README auto-block.
// First match wins, so keep prefixes section-distinct. Edit freely.
const SECTIONS = [
  { key: 'graphql', prefixes: ['graphql-', 'xoom-graphql-'] },
  { key: 'ai', prefixes: ['mcp-', 'ai-', 'agent-', 'llm-'] },
  { key: 'http', prefixes: ['openapi-', 'api-', 'http-', 'fetch-', 'rest-'] },
  { key: 'async', prefixes: ['abort-', 'signal-', 'disposable-', 'using-', 'async-', 'context-', 'offload-'] },
  { key: 'perf', prefixes: ['perf-', 'mem-', 'memcheck', 'weakref', 'cache', 'portacache'] },
  { key: 'data', prefixes: ['error-', 'map-', 'set-', 'iterable-', 'stream-', 'deep-diff', 'schema-'] },
];
// Repos matching no section prefix land here, rendered as their own section.
const CATCHALL = 'recent';

const markers = (key) => ({
  start: `<!-- AUTO:${key}:start -->`,
  end: `<!-- AUTO:${key}:end -->`,
});

// Repos to never surface: the profile repo itself + intentionally-omitted stubs.
// Add a name here to keep a new repo out of every block.
const IGNORE = new Set([USER, 'common-schema', 'stitching']);

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const DRY = !!process.env.DRY;

async function fetchAllRepos() {
  const all = [];
  for (let page = 1; ; page++) {
    const res = await fetch(
      `https://api.github.com/users/${USER}/repos?type=owner&per_page=100&page=${page}&sort=created&direction=desc`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': USER,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );
    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    all.push(...batch);
    if (batch.length < 100) return all;
  }
}

const readme = await readFile(README, 'utf8');

// Locate every auto-block region; bail loudly if a marker pair is missing.
const allKeys = [...SECTIONS.map((s) => s.key), CATCHALL];
const regions = allKeys
  .map((key) => {
    const { start, end } = markers(key);
    const s = readme.indexOf(start);
    const e = readme.indexOf(end);
    if (s === -1 || e === -1) throw new Error(`Missing ${start} / ${end} in README.md`);
    return { key, s, e: e + end.length };
  })
  .sort((a, b) => a.s - b.s);

// "Filed" = repos linked anywhere OUTSIDE every auto-block (the curated lines).
// Names inside a block don't count, so a routed repo persists until you move it
// up into the curated list — at which point it drops out of the block.
let curated = '';
let cursor = 0;
for (const r of regions) {
  curated += readme.slice(cursor, r.s);
  cursor = r.e;
}
curated += readme.slice(cursor);
const filed = new Set(
  [...curated.matchAll(/github\.com\/mstuart\/([A-Za-z0-9._-]+)/g)].map((m) => m[1]),
);

const repos = await fetchAllRepos();
const originals = repos.filter((r) => !r.fork && !r.archived && !r.private);
const fresh = originals
  .filter((r) => !IGNORE.has(r.name))
  .filter((r) => !filed.has(r.name))
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

// Route each fresh repo to a section key (first prefix match) or the catch-all.
const routeOf = (name) => {
  for (const s of SECTIONS) {
    if (s.prefixes.some((p) => name.startsWith(p))) return s.key;
  }
  return CATCHALL;
};
const routed = new Map(allKeys.map((k) => [k, []]));
for (const r of fresh) routed.get(routeOf(r.name)).push(r);

const line = (r, flag) =>
  `- ${flag}**[${r.name}](${r.html_url})** — ${(r.description || 'No description yet.').trim()}`;

function renderRegion(key) {
  const { start, end } = markers(key);
  const list = routed.get(key);
  if (!list.length) return `${start}\n${end}`; // invisible when empty
  if (key === CATCHALL) {
    const items = list.map((r) => line(r, '')).join('\n');
    return `${start}\n\n<details open>\n<summary><h2>🆕 Recently Published</h2></summary>\n\n> Newest public repos that didn't match a section's naming prefix — move them into a section above.\n\n${items}\n\n</details>\n\n${end}`;
  }
  // In-section block: bare 🆕-flagged bullets appended under the curated list.
  const items = list.map((r) => line(r, '🆕 ')).join('\n');
  return `${start}\n${items}\n${end}`;
}

// Rebuild the README, swapping each region for its freshly-rendered content.
let out = '';
cursor = 0;
for (const r of regions) {
  out += readme.slice(cursor, r.s) + renderRegion(r.key);
  cursor = r.e;
}
out += readme.slice(cursor);

console.log(
  `considered: ${originals.length} public originals · filed: ${filed.size} · ignored: ${IGNORE.size} · new: ${fresh.length}`,
);
console.log('routing → ' + allKeys.map((k) => `${k}:${routed.get(k).length}`).join('  '));
if (fresh.length) {
  console.log('new:');
  for (const r of fresh) console.log(`  ${routeOf(r.name).padEnd(8)} ← ${r.name}`);
}

if (DRY) {
  console.log('\n[DRY] no changes written.');
} else if (out !== readme) {
  await writeFile(README, out);
  console.log('\nUpdated README.md.');
} else {
  console.log('\nNo changes.');
}
