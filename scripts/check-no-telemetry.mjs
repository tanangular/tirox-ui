import { execFileSync } from 'node:child_process';

const forbidden = /(?:analytics|telemetry|tracking|gtag|posthog|segment)/i;
try {
  const output = execFileSync(
    'rg',
    [
      '-n',
      '--hidden',
      '--glob',
      '!node_modules/**',
      '--glob',
      '!dist/**',
      forbidden.source,
      'packages/solid/src',
      'packages/preset/src',
    ],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] },
  );
  if (output.trim()) throw new Error(`Package telemetry reference found:\n${output}`);
} catch (error) {
  if (error.status !== 1) throw error;
}

console.log('No-telemetry package boundary passed.');
