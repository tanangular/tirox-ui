import { readFileSync } from 'node:fs';

const file = readFileSync(new URL('../docs/security/pre-v1-review.md', import.meta.url), 'utf8');
for (const required of [
  'Safe text/children/attribute defaults',
  'URL protocol validation',
  'Hydration/SSR output',
  'CSP Report-Only',
  'Lockfile, audit',
]) {
  if (!file.includes(required))
    throw new Error(`Security review is missing required control: ${required}`);
}
const pending = file.includes('Status: `pending-maintainer-signoff`');
if (pending && process.env.RELEASE_CRITICAL === 'true')
  throw new Error('Pre-v1 security review is not approved.');
console.warn(
  pending
    ? 'Security review checklist present; maintainer signoff still pending.'
    : 'Security review approved.',
);
