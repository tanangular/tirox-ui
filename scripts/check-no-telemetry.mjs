import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { collectSourceFiles } from './collect-source-files.mjs';

const forbidden = /(?:analytics|telemetry|tracking|gtag|posthog|segment)/i;
const violations = [];
for (const directory of ['packages/solid/src', 'packages/preset/src']) {
  for (const file of await collectSourceFiles(directory)) {
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, index) => {
      if (forbidden.test(line))
        violations.push(`${relative(process.cwd(), file)}:${index + 1}:${line}`);
    });
  }
}

if (violations.length)
  throw new Error(`Package telemetry reference found:\n${violations.join('\n')}`);

console.log('No-telemetry package boundary passed.');
