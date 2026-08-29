import { expect, test } from '@playwright/test';

test('documentation consumes the real package surface', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Tirox UI' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Get started' })).toBeVisible();
});

test('foundation behavior guidance is published as a docs route', async ({ page }) => {
  await page.goto('/components');
  await expect(page.getByRole('heading', { name: 'Foundation component guidance' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Adapter boundary');
});

test('custom preset source is published from the workspace example', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Custom preset example' })).toBeVisible();
  await expect(page.locator('#custom-preset-source')).toContainText('validatePresetConformance');
});
