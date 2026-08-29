const forbidden = /(?:password|secret|api[_-]?key|access[_-]?token|private[_-]?key)\s*[:=]/i;
const files = ['apps/docs/src', 'packages/solid/src'];
const { execFileSync } = await import('node:child_process');
let output = '';
try {
  output = execFileSync(
    'rg',
    [
      '-n',
      '--hidden',
      '--glob',
      '!node_modules/**',
      '--glob',
      '!dist/**',
      forbidden.source,
      ...files,
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
  );
} catch (error) {
  if (error.status !== 1) throw error;
}
if (output.trim()) throw new Error(`Potential secret-shaped source data found:\n${output}`);
console.warn('Security source scan passed: no secret-shaped assignments found in runtime source.');
