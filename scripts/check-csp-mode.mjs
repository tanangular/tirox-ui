import { createSecurityHeaders } from '../apps/docs/security-headers.mjs';

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

console.log('CSP mode contract OK (Report-Only and Enforce).');
