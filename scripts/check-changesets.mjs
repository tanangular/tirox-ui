import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const changesetDir = join(root, '.changeset');
const validPackages = new Set(['@tirox-ui/solid', '@tirox-ui/preset']);
const files = (await readdir(changesetDir)).filter(
  (file) => file.endsWith('.md') && file !== 'README.md',
);

if (!files.length) throw new Error('At least one Changeset is required before a package release.');

for (const file of files) {
  const source = await readFile(join(changesetDir, file), 'utf8');
  const match = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file} is missing Changeset frontmatter.`);
  const entries = [
    ...match[1].matchAll(/^['"]?(@tirox-ui\/[\w-]+)['"]?:\s*(major|minor|patch)\s*$/gm),
  ];
  if (!entries.length) throw new Error(`${file} has no valid package bump.`);
  for (const [, packageName] of entries) {
    if (!validPackages.has(packageName))
      throw new Error(`${file} names an unknown package: ${packageName}`);
  }
}

console.log(`Changeset integrity OK (${files.length} changesets).`);
