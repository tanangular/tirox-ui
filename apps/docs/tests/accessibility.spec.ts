import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('home page has no automated WCAG violations', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('docs server applies the security headers baseline', async ({ request }) => {
  const response = await request.get('/');
  const cspHeader =
    process.env.CSP_ENFORCE === 'true'
      ? 'content-security-policy'
      : 'content-security-policy-report-only';
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()[cspHeader]).toContain("default-src 'self'");
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(response.headers()['strict-transport-security']).toContain('max-age=');
  expect(response.headers()['permissions-policy']).toContain('camera=()');
});

test('theme behavior is served as a same-origin asset for CSP enforcement', async ({ request }) => {
  const response = await request.get('/theme-playground.js');
  expect(response.ok()).toBe(true);
  expect(response.headers()['content-type']).toContain('javascript');
  expect(await response.text()).toContain("matchMedia('(prefers-color-scheme: dark)')");
});

test('theme playground updates the root theme contract', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate((element) =>
          getComputedStyle(element).getPropertyValue('--tx-color-surface-default').trim(),
        ),
    )
    .toBe('#fcfcfd');
  await page.locator('#theme-picker').selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect
    .poll(() =>
      page
        .locator('html')
        .evaluate((element) =>
          getComputedStyle(element).getPropertyValue('--tx-color-surface-default').trim(),
        ),
    )
    .toBe('#1f2024');
});

test('theme playground resolves system preference', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await page.locator('#theme-picker').selectOption('system');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('representative visual surface remains stable across themes', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const surface = page.locator('main');
  await expect(surface).toBeVisible();
  await expect(surface).toHaveScreenshot('home-light.png', { animations: 'disabled' });
  await page.locator('#theme-picker').selectOption('dark');
  await expect(surface).toHaveScreenshot('home-dark.png', { animations: 'disabled' });
});
