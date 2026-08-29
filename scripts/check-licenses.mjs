import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
if (!existsSync(join(root, 'LICENSE'))) throw new Error('Repository MIT LICENSE file is missing.');

const packagePaths = ['packages/solid/package.json', 'packages/preset/package.json'];
for (const packagePath of packagePaths) {
  const manifest = JSON.parse(readFileSync(join(root, packagePath), 'utf8'));
  if (manifest.private) throw new Error(`${manifest.name} must be publishable, not private.`);
  if (manifest.license !== 'MIT') throw new Error(`${manifest.name} must declare license MIT.`);
  if (!manifest.files?.includes('dist'))
    throw new Error(`${manifest.name} must publish its dist directory.`);
}

console.log(`License metadata OK (${packagePaths.length} publishable packages).`);
