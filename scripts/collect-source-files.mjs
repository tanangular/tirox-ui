import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectSourceFiles(path)));
    else if (entry.isFile()) files.push(path);
  }

  return files;
}
