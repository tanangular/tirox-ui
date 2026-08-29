import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const components = ['button', 'input', 'checkbox', 'select', 'dialog', 'tooltip'];
const sourceRoot = join(root, 'packages/solid/src');
const metadata = JSON.parse(readFileSync(join(root, 'docs/api-metadata.json'), 'utf8'));
const docs = readFileSync(join(root, 'apps/docs/src/pages/index.astro'), 'utf8');
const guidance = readFileSync(join(root, 'docs/components.md'), 'utf8');
const contractTests = readFileSync(join(root, 'packages/solid/tests/contract.test.tsx'), 'utf8');
const ssrTests = readFileSync(join(root, 'packages/solid/tests/ssr.test.tsx'), 'utf8');
const manifest = JSON.parse(readFileSync(join(root, 'packages/solid/package.json'), 'utf8'));
const customPreset = readFileSync(join(root, 'docs/preset/custom-preset.ts'), 'utf8');

for (const component of components) {
  const name = component[0].toUpperCase() + component.slice(1);
  const contractPath = join(sourceRoot, 'contracts', `${component}.ts`);
  const sourcePath = join(sourceRoot, `${component}.tsx`);
  const adapterPath = join(sourceRoot, 'adapters', 'native', `${component}.tsx`);
  const sourceText = readFileSync(sourcePath, 'utf8');
  const hasContract = existsSync(contractPath) || sourceText.includes('export interface');
  if (!existsSync(sourcePath) || !hasContract || !existsSync(adapterPath)) {
    throw new Error(`Incomplete ${name} source/contract/native behavior slice.`);
  }
  if (
    !metadata.components.some((entry) => entry.name === component && entry.interfaces.length > 0)
  ) {
    throw new Error(`API metadata is missing ${name} contract.`);
  }
  if (!docs.includes(`<h2>${name}</h2>`) || !contractTests.includes(`${name} contract`)) {
    throw new Error(`${name} docs or contract test coverage is missing.`);
  }
  if (!guidance.includes(`## ${name}`)) throw new Error(`${name} behavior guidance is missing.`);
  if (!ssrTests.includes(`<${name}`)) throw new Error(`${name} SSR coverage is missing.`);
  if (!Object.hasOwn(manifest.exports, `./${component}`))
    throw new Error(`${name} public export is missing.`);
}

if (
  !metadata.packages
    ?.find((entry) => entry.name === '@tirox-ui/preset')
    ?.exports?.includes('validatePresetConformance')
) {
  throw new Error('Preset API metadata is missing custom conformance exports.');
}
if (
  !customPreset.includes('validatePresetConformance') ||
  !customPreset.includes('validateSemanticContrast') ||
  !customPreset.includes('createThemeCssVariables')
) {
  throw new Error('Custom preset example is missing conformance, contrast, or theme validation.');
}

console.log(`Foundation acceptance metadata OK (${components.length} components).`);
