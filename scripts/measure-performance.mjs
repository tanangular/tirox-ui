import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'packages/solid/dist');
const files = existsSync(dist) ? readdirSync(dist).filter((file) => file.endsWith('.js')) : [];
const bundleBytes = Object.fromEntries(
  files.map((file) => [file, statSync(join(dist, file)).size]),
);
const baselinePath = join(root, 'performance/baseline.json');
const baseline = existsSync(baselinePath)
  ? JSON.parse(readFileSync(baselinePath, 'utf8'))
  : { bundleBytes: {} };
const regressionLimit = 0.1;
const absoluteBundleLimit = 8_000;
const violations = Object.entries(bundleBytes).filter(([file, size]) => {
  const previous = baseline.bundleBytes[file];
  return typeof previous === 'number' && size > previous * (1 + regressionLimit);
});
const absoluteViolations = Object.entries(bundleBytes).filter(
  ([, size]) => size > absoluteBundleLimit,
);
const result = {
  measuredAt: new Date().toISOString(),
  bundleBytes,
  regressionLimit,
  absoluteBundleLimit,
  violations,
  absoluteViolations,
};
writeFileSync(join(root, 'performance/latest.json'), `${JSON.stringify(result, null, 2)}\n`);
const issues = [...violations, ...absoluteViolations];
const message = issues.length
  ? `Performance budget issues: ${issues.map(([file]) => file).join(', ')}`
  : `Performance budgets OK (${files.length} bundles; absolute limit ${absoluteBundleLimit} bytes)`;
if (issues.length && (process.env.CI === 'true' || process.env.PERFORMANCE_BLOCKING === 'true'))
  throw new Error(message);
console.warn(message);
