import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const manifest = JSON.parse(readFileSync(join(root, 'packages/solid/package.json'), 'utf8'));
const presetManifest = JSON.parse(readFileSync(join(root, 'packages/preset/package.json'), 'utf8'));
const expected = ['./button', './input', './checkbox', './select', './dialog', './tooltip'];
const missing = expected.filter((entry) => !manifest.exports[entry]);
if (missing.length) throw new Error(`Missing explicit public exports: ${missing.join(', ')}`);
if (!presetManifest.exports['./theme']) throw new Error('Preset theme export is missing.');

for (const [packagePath, packageManifest] of [
  ['packages/solid', manifest],
  ['packages/preset', presetManifest],
]) {
  for (const [subpath, target] of Object.entries(packageManifest.exports)) {
    for (const field of ['import', 'types']) {
      const relativeTarget = target[field];
      if (!relativeTarget || !existsSync(join(root, packagePath, relativeTarget))) {
        throw new Error(`${packageManifest.name}${subpath} is missing its ${field} target.`);
      }
    }
  }
}
for (const packageManifest of [manifest, presetManifest]) {
  if (
    Object.keys(packageManifest.exports).some(
      (entry) => entry.includes('src') || entry.includes('internal'),
    )
  ) {
    throw new Error('Internal paths must not be public exports.');
  }
  if (packageManifest.sideEffects !== false) {
    throw new Error(`${packageManifest.name} must declare sideEffects: false for tree-shaking.`);
  }
  if (packageManifest.publishConfig?.access !== 'public') {
    throw new Error(`${packageManifest.name} must declare public publish access.`);
  }
}
const matrix = readFileSync(join(root, 'docs/compatibility.md'), 'utf8');
for (const required of ['Solid runtime', 'TypeScript', 'Chromium / Firefox / WebKit']) {
  if (!matrix.includes(required)) throw new Error(`Compatibility matrix is missing: ${required}`);
}
console.warn(`Public contract OK (${expected.length} component exports and compatibility matrix).`);
