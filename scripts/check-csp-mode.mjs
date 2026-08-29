import { createSecurityHeaders } from '../apps/docs/security-headers.mjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const reportOnly = createSecurityHeaders(false);
if (!reportOnly['Content-Security-Policy-Report-Only'])
  throw new Error('CSP Report-Only mode is missing its header.');
if (reportOnly['Content-Security-Policy'])
  throw new Error('Report-Only mode must not enforce CSP.');

const enforced = createSecurityHeaders(true);
if (!enforced['Content-Security-Policy'])
  throw new Error('CSP enforce mode is missing its header.');
if (enforced['Content-Security-Policy-Report-Only'])
  throw new Error('Enforce mode must not emit only Report-Only CSP.');

for (const policy of [
  reportOnly['Content-Security-Policy-Report-Only'],
  enforced['Content-Security-Policy'],
]) {
  if (!policy.includes("script-src 'self'"))
    throw new Error('CSP must restrict scripts to same-origin sources.');
  if (policy.includes('script-src *') || policy.includes("script-src 'unsafe-eval'")) {
    throw new Error('CSP script policy must not allow wildcard or eval sources.');
  }
}

const root = new URL('..', import.meta.url).pathname;
const homepage = readFileSync(join(root, 'apps/docs/dist/index.html'), 'utf8');
if (/<script(?![^>]*\ssrc=)[^>]*>/i.test(homepage)) {
  throw new Error('Generated docs must not contain executable inline script tags.');
}

const staticHeaders = readFileSync(join(root, 'apps/docs/public/_headers'), 'utf8');
for (const header of [
  'Referrer-Policy:',
  'Permissions-Policy:',
  'Strict-Transport-Security:',
  'Content-Security-Policy-Report-Only:',
]) {
  if (!staticHeaders.includes(header)) throw new Error(`Static docs headers are missing ${header}`);
}
if (!staticHeaders.includes(reportOnly['Content-Security-Policy-Report-Only'])) {
  throw new Error('Static docs CSP differs from the test-server CSP contract.');
}

console.log('CSP mode contract OK (Report-Only and Enforce).');
