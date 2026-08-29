import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
for (const packageName of ['@tirox-ui/solid', '@tirox-ui/preset']) {
  const packagePath = packageName.endsWith('preset') ? 'packages/preset' : 'packages/solid';
  if (existsSync(join(root, packagePath, 'dist/src'))) {
    throw new Error(`${packageName} contains stale internal dist/src artifacts.`);
  }
  execFileSync('pnpm', ['--filter', packageName, 'pack', '--dry-run'], {
    cwd: root,
    stdio: 'inherit',
  });
}

console.log('Publish artifact checks passed (dry-run only).');
