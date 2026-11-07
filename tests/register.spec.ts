import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { Navbar} from '../pages/navbar'

import { faker } from '@faker-js/faker'

test('deve cadastrar uma nova missão', async ({ page }) => {

  const loginPage = new LoginPage(page)
  const navbar = new Navbar(page)

  loginPage.goto()
  loginPage.login('buzz@lunarpass.dev', 'pwd123')
//  await page.waitForTimeout(10_000) //nao use como estratégia 
  await expect(navbar.logout).toBeVisible({timeout: 10_000})

  await page.getByRole('link', { name: 'Nova missão' }).click();
  await expect(page.getByRole('heading', { name: 'Programar missão'})).toBeVisible()

  const sessionId = 'LP-' + faker.string.alphanumeric({length: { min: 5, max: 5}, casing:'upper'})

  await page.getByRole('textbox', { name: 'ID da missão' }).fill(sessionId);
  await page.getByRole('textbox', { name: 'Foguete' }).fill('Nave2');
  await page.getByLabel('Base lunar').selectOption('aurora');
  await page.getByRole('textbox', { name: 'Data de partida' }).fill('2027-01-07');
  await expect(page.getByTestId('mission-form-return-date')).toContainText('14 de jan. de 2027');

  await page.getByRole('spinbutton', { name: 'Preço por passagem (USD)' }).fill('32000');
  await page.getByRole('button', { name: 'Salvar missão' }).click();
  await expect(page.getByRole('listitem')).toContainText('A nova missão foi adicionada ao catálogo e já está disponível para reservas.')
});