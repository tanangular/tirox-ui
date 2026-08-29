import { rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const target = resolve(process.cwd(), process.argv[2] ?? '');
const allowedTargets = [join(root, 'packages/preset/dist'), join(root, 'packages/solid/dist')];
if (!allowedTargets.includes(target)) {
  throw new Error(`Refusing to clean unexpected build target: ${target}`);
}

await rm(target, { recursive: true, force: true });
