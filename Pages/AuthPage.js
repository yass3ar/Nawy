const { BasePage } = require('./BasePage');
const { expect, page } = require('@playwright/test')
const basePage = new BasePage(page)

exports.AuthPage = class AuthPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.getByLabel('Username:');
        this.passwordField = page.getByLabel('Password:');
        this.signUpSubmit = page.getByRole('link', { name: 'Sign up' });
        this.loginUsernameField = page.locator('#loginusername');
        this.loginPasswordField = page.locator('#loginpassword');
        this.loginSubmit = page.getByRole('link', { name: 'Log in' });
    }

    async register(username, password) {
        await basePage.fill(this.usernameField, username);
        await basePage.fill(this.passwordField, password);
        await basePage.click(this.signUpSubmit);
    }

    async login(username, password) {
        await basePage.fill(this.loginUsernameField, username);
        await basePage.fill(this.loginPasswordField, password);
        await basePage.click(this.loginSubmit);
    }
}