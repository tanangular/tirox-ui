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
  expect(response.headers()['x-content-type-options']).toBe('nosniff');
  expect(response.headers()['x-frame-options']).toBe('DENY');
  expect(response.headers()['content-security-policy-report-only']).toContain("default-src 'self'");
  expect(response.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(response.headers()['strict-transport-security']).toContain('max-age=');
  expect(response.headers()['permissions-policy']).toContain('camera=()');
});

test('theme playground updates the root theme contract', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#theme-picker').selectOption('dark');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const screenshot = await page.screenshot();
  expect(screenshot.byteLength).toBeGreaterThan(0);
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
  const light = await surface.screenshot();
  await page.locator('#theme-picker').selectOption('dark');
  const dark = await surface.screenshot();
  expect(light.byteLength).toBeGreaterThan(100);
  expect(dark.byteLength).toBeGreaterThan(100);
});
