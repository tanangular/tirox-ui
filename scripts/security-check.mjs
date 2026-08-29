import { readFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { collectSourceFiles } from './collect-source-files.mjs';

const forbidden = /(?:password|secret|api[_-]?key|access[_-]?token|private[_-]?key)\s*[:=]/i;
const files = ['apps/docs/src', 'packages/solid/src'];
const violations = [];
for (const directory of files) {
  for (const file of await collectSourceFiles(directory)) {
    const lines = (await readFile(file, 'utf8')).split('\n');
    lines.forEach((line, index) => {
      if (forbidden.test(line))
        violations.push(`${relative(process.cwd(), file)}:${index + 1}:${line}`);
    });
  }
}

if (violations.length)
  throw new Error(`Potential secret-shaped source data found:\n${violations.join('\n')}`);
console.warn('Security source scan passed: no secret-shaped assignments found in runtime source.');
