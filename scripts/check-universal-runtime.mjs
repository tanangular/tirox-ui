import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = join(process.cwd(), 'packages/solid/src');
const sourceExtensions = new Set(['.ts', '.tsx']);
const forbidden = [
  { pattern: /\b(?:window|document)\b/, reason: 'browser global' },
  { pattern: /(?:solid-start|@solidjs\/start|server-only)/, reason: 'server-only module' },
];

async function collect(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (sourceExtensions.has(path.slice(path.lastIndexOf('.')))) files.push(path);
  }
  return files;
}

const violations = [];
for (const file of await collect(root)) {
  const source = await readFile(file, 'utf8');
  for (const { pattern, reason } of forbidden) {
    if (pattern.test(source)) violations.push(`${relative(process.cwd(), file)} (${reason})`);
  }
}

if (violations.length) {
  throw new Error(`Universal Solid core boundary violated:\n${violations.join('\n')}`);
}

console.log('Universal Solid core boundary passed.');
