const candidates = ['@zag-js/checkbox', '@zag-js/dialog', '@zag-js/solid', '@kobalte/core'];
const results = [];

for (const packageName of candidates) {
  try {
    await import(packageName);
    results.push({ package: packageName, status: 'loadable' });
  } catch (error) {
    results.push({
      package: packageName,
      status: 'blocked',
      reason: error instanceof Error ? error.message : String(error),
    });
  }
}

console.log(
  JSON.stringify(
    {
      runtime: 'solid-js@2.0.0-rc.3',
      candidateVersion: '1.43.3',
      results,
    },
    null,
    2,
  ),
);

const zagAdapter = results.find(({ package: packageName }) => packageName === '@zag-js/solid');
const kobalte = results.find(({ package: packageName }) => packageName === '@kobalte/core');
if (zagAdapter?.status !== 'loadable' && kobalte?.status !== 'loadable') process.exitCode = 2;
