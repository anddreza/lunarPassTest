import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/mission-control/login');
    // const email = 'buzz@lunarpass.dev';
    // const senha = 'pwd123';

    const slogan = page.getByRole('heading', { name: 'Mission Control' })
    await expect(slogan).toBeVisible()

});

test('slogan da homepage', async ({ page }) => {

    //  await page.goto('/mission-control/login');


    const slogan = page.getByRole('heading', { name: 'Mission Control' })
    await expect(slogan).toBeVisible()


    //existem duas formas de fazer isso 
    //FORMA 1:
    // await page.locator('input[autocomplete="username"]').fill(email);
    // await page.locator('input[autocomplete="current-password"]').fill(senha);

    //FORMA 2:
    await page.getByLabel('E-mail').fill(process.env.TEST_USER_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.TEST_USER_PASSWORD!)

    //FORMA 3: 
    // await page.getByRole('textbox', {name: 'E-mail'}).fill(email)
    // await page.getByRole('textbox', {name: 'Senha'}).fill(senha)

    // await page.locator('button[type="submit"]').click();
    await page.getByRole('button', { name: 'Entrar' }).click()

    const logoutButton = page.getByRole('button', { name: 'Sair' })
    await expect(logoutButton).toBeVisible()

});

//tentativa sozinha fazendo os testes
const senhasInvalidas = [
    { senha: '123456', descricao: 'E-mail ou senha inválidos.' },
    { senha: '', descricao: 'Informe a senha' },
];

senhasInvalidas.forEach(({ senha, descricao }) => {
    test(`Mensagens de erro login: ${descricao}`, async ({ page }) => {

        const slogan = page.getByRole('heading', { name: 'Mission Control' })
        await expect(slogan).toBeVisible()

        await page.getByLabel('E-mail').fill(process.env.TEST_USER_EMAIL!)
        await page.getByLabel('Senha').fill(senha)


        await page.getByRole('button', { name: 'Entrar' }).click()
    });
})


test('não deve autenticar com senha incorreta', async ({ page }) => {

    //  await page.goto('/mission-control/login');

    await page.getByLabel('E-mail').fill(process.env.TEST_USER_EMAIL!)
    await page.getByLabel('Senha').fill(process.env.TEST_USER_PASSWORD1!)

    await page.getByRole('button', { name: 'Entrar' }).click()

    //a forma como o curso ensina
    const alert = page.locator('p[role=alert]')
    await expect(alert).toHaveText('E-mail ou senha inválidos.')

});

test('não deve autenticar com email não cadastrado', async ({ page }) => {

    //  await page.goto('/mission-control/login');

    await page.getByLabel('E-mail').fill(process.env.TEST_USER_EMAIL1!)
    await page.getByLabel('Senha').fill(process.env.TEST_USER_PASSWORD!)

    await page.getByRole('button', { name: 'Entrar' }).click()

    //a forma como o curso ensina a testar o email não cadastrado
    const alert = page.locator('p[role=alert]')
    await expect(alert).toHaveText('E-mail ou senha inválidos.')

});

