import { test, expect } from '@playwright/test';

test('slogan da homepage', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Lunar Pass/);

  await page.getByText('Buscar Missões').click();

});
