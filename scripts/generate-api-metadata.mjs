import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const source = join(root, 'packages/solid/src');
const presetIndex = join(root, 'packages/preset/src/index.ts');
const files = readdirSync(source).filter((file) =>
  /^(button|input|checkbox|select|dialog|tooltip)\.tsx$/.test(file),
);
const components = files.map((file) => {
  const text = readFileSync(join(source, file), 'utf8');
  const name = file.slice(0, -4);
  const contractPath = join(source, 'contracts', file.replace('.tsx', '.ts'));
  const contractText = existsSync(contractPath) ? readFileSync(contractPath, 'utf8') : text;
  const interfaces = [
    ...contractText.matchAll(/export interface (\w+)(?:[ \t]+extends[^{}]+)?[ \t]*{([\s\S]*?)\n}/g),
  ].map((match) => ({
    name: match[1],
    props: [...match[2].matchAll(/^\s+(\w+)\??:/gm)].map((prop) => prop[1]),
  }));
  return { name, source: `packages/solid/src/${file}`, interfaces };
});
const presetSource = readFileSync(presetIndex, 'utf8');
const presetExports = [
  ...presetSource.matchAll(
    /export (?:type )?(?:\{([\s\S]*?)\}|(?:const|function|interface|type) (\w+))/g,
  ),
].flatMap((match) =>
  match[1]
    ? match[1]
        .split(',')
        .map((name) => name.trim().split(' as ')[0])
        .filter(Boolean)
    : [match[2]],
);
const outputPath = join(root, 'docs/api-metadata.json');
const metadata = {
  packages: [
    { name: '@tirox-ui/solid', source: 'packages/solid/src/index.ts', components },
    {
      name: '@tirox-ui/preset',
      source: 'packages/preset/src/index.ts',
      exports: presetExports,
    },
  ],
  package: '@tirox-ui/solid',
  components,
};
writeFileSync(outputPath, `${JSON.stringify(metadata, null, 2)}\n`);
execFileSync('oxfmt', ['--write', outputPath], { cwd: root, stdio: 'ignore' });
