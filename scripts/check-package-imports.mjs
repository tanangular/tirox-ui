import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const root = new URL('..', import.meta.url);
const presetEntrypoint = new URL('packages/preset/dist/index.js', root);
const solidEntrypoint = new URL('packages/solid/dist/index.js', root);

await import(pathToFileURL(presetEntrypoint.pathname));
console.log(`Imported ${presetEntrypoint.pathname}`);

execFileSync(process.execPath, ['--conditions=browser', '--input-type=module', '-e',
  `await import(${JSON.stringify(pathToFileURL(solidEntrypoint.pathname).href)})`,
], { stdio: 'inherit' });
console.log(`Imported ${solidEntrypoint.pathname} with browser conditions`);

console.log('Built package import checks passed.');
