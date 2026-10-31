import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page'

//deixa de ser uma const e pode acessar em todos os blocos 
let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)

    await loginPage.goto()
})
test('deve autenticar no controle de missões', async ({ page }) => {

    await loginPage.login('buzz@lunarpass.dev', 'pwd123')

    await loginPage.isLoggedUser()
});


test('não deve autenticar com senha incorreta', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('buzz@lunarpass.dev', 'pwd1231')

    //a forma como o curso ensina
    const alert = page.locator('p[role=alert]')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')

});

test('não deve autenticar com email não cadastrado', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('buz1z@lunarpass.dev', 'pwd123')


    //a forma como o curso ensina a testar o email não cadastrado
    const alert = page.locator('p[role=alert]')
    await expect(loginPage.alert).toHaveText('E-mail ou senha inválidos.')

});


test('não deve autenticar quando a senha não é informada', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('buz1z@lunarpass.dev', '')


    //a forma como o curso ensina a testar o email não cadastrado
    const alert = page.locator('p[role=alert]')
    await expect(loginPage.alert).toHaveText('Informe a senha')

});

test('não deve autenticar quando o email não é informado', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('', 'pwd123')


    //a forma como o curso ensina a testar o email não cadastrado
    const alert = page.locator('p[role=alert]')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')

});

test('não deve autenticar quando não preencho os campos', async ({ page }) => {

    const loginPage = new LoginPage(page)

    await loginPage.goto()
    await loginPage.login('', '')


    //a forma como o curso ensina a testar o email não cadastrado
    const alert = page.locator('p[role=alert]')
    await expect(loginPage.alert).toHaveText('Informe um e-mail válido')

});


