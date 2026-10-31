import { Page, Locator, expect } from '@playwright/test'

/**
 * Essa pagina foi aberta aqui para aprender sobre organização e reúso de código com
 *  Page Objects, tem algumas coisas como exportação, readonly e constructor que foram conhecimentos
 * novos a partir disso também por esse motivo foi aberto uma cópia do do login.spec.copy.ts, pois 
 * o reaproveitamento de algumas coisas iriam ficar muito burocrático somente numa tela, então 
 * reparti para poder aprender com mais calma essas informações, a implementação do env não veio da parte
 * do professor, veio como iniciativa somente minha mesmo 
 */
export class LoginPage {

    //Depois que essa propriedade receber um valor, não pode receber outro valor posteriormente.
    readonly page: Page
    readonly alert: Locator

    constructor(page: Page) {
        this.page = page
        this.alert = page.getByRole('alert') 
    }

    async goto() {
        await this.page.goto('http://localhost:3000/mission-control/login')
        const title = this.page.getByRole('heading', { name: 'Mission Control' })
        await expect(title).toBeVisible()
    }

    async login(email: string, password: string) {
        await this.page.getByLabel('E-mail').fill(email)
        await this.page.getByLabel('Senha').fill(password)

        await this.page.getByRole('button', { name: 'Entrar' }).click()

    }

    async isLoggedUser(){
        const logoutButton = this.page.getByRole('button', { name: 'Sair' })
        await expect(logoutButton).toBeVisible()

    }
}

