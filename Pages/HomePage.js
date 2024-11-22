const {test, expect,page} = require('@playwright/test')
const { BasePage } = require('./BasePage');
const basePage = new BasePage(page);

exports.HomePage = class HomePage {
    constructor(page) {
        console.log(page)
        if (!page) {
            throw new Error('Page object is not defined');
        }
        this.page = page;
        this.signUpButton = page.getByRole('link', { name: 'Sign up' });
        this.loginButton = page.getByRole('link', { name: 'Log in' });
        this.logoutButton = page.getByRole('link', { name: 'Log out' });
        this.cartButton = page.getByRole('link', { name: 'Cart' });
    }
    async openSignUpModal() {
        await basePage.click(this.signUpButton);
    }
    
    async openLoginModal() {
        await basePage.click(this.loginButton);
    }

    async logOut() {
        await basePage.click(this.logoutButton);
    }

    async openCart() {
        await basePage.click(this.cartButton);
    }
}