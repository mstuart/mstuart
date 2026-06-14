// Keeps the "🆕 Recently Published" block in README.md in sync with GitHub.
//
// It lists every public, non-fork, non-archived repo that is NOT already linked
// in one of the hand-curated sections above the marker. Curated sections are
// never touched. Run `DRY=1 node scripts/update-readme.mjs` to preview.

import { readFile, writeFile } from 'node:fs/promises';

const USER = 'mstuart';
const README = new URL('../README.md', import.meta.url);
const START = '<!-- AUTO:recent:start -->';
const END = '<!-- AUTO:recent:end -->';

// Repos to never surface: the profile repo itself + intentionally-omitted stubs.
// Add a name here to keep a new repo out of the auto block.
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
const startIdx = readme.indexOf(START);
const endIdx = readme.indexOf(END);
if (startIdx === -1 || endIdx === -1) {
  throw new Error(`Missing ${START} / ${END} markers in README.md`);
}

// Names already linked OUTSIDE the auto block (i.e. in the curated sections).
const curated = readme.slice(0, startIdx) + readme.slice(endIdx + END.length);
const listed = new Set(
  [...curated.matchAll(/github\.com\/mstuart\/([A-Za-z0-9._-]+)/g)].map((m) => m[1]),
);

const repos = await fetchAllRepos();
const fresh = repos
  .filter((r) => !r.fork && !r.archived && !r.private)
  .filter((r) => !IGNORE.has(r.name))
  .filter((r) => !listed.has(r.name))
  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

const items = fresh
  .map((r) => `- **[${r.name}](${r.html_url})** — ${(r.description || 'No description yet.').trim()}`)
  .join('\n');

const block = fresh.length
  ? `${START}\n\n<details open>\n<summary><h2>🆕 Recently Published</h2></summary>\n\n> Newest public repos, not yet filed into a section above.\n\n${items}\n\n</details>\n\n${END}`
  : `${START}\n${END}`;

const updated = readme.slice(0, startIdx) + block + readme.slice(endIdx + END.length);

console.log(
  `considered: ${repos.filter((r) => !r.fork && !r.archived && !r.private).length} public originals · ` +
    `filed: ${listed.size} · ignored: ${IGNORE.size} · new: ${fresh.length}`,
);
if (fresh.length) console.log('new:\n' + items);

if (DRY) {
  console.log('\n[DRY] no changes written.');
} else if (updated !== readme) {
  await writeFile(README, updated);
  console.log(`\nUpdated README.md (${fresh.length} repo(s) in the recently-published block).`);
} else {
  console.log('\nNo changes.');
}
