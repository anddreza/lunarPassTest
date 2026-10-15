import { test, expect } from '@playwright/test';

test('slogan da homepage', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/Lunar Pass/);

  await page.getByText('Buscar Missões').click();

});

test('deve ter o título da página principal', async ({ page }) => {

  await page.goto('http://localhost:3000/');
  const slogan = page.getByRole('heading', {name: 'Sua viagem para a Lua começa aqui.'})
  await expect(slogan).toBeVisible()

});
