const { expect, page } = require('@playwright/test')

exports.BasePage = class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigateTo(url) {
        await this.page.goto(url);
    }

    async click(selector) {
        await this.page.click(selector);
    }

    async fill(selector, value) {
        await this.page.fill(selector, value);
    }

    async waitForSelector(selector) {
        await this.page.waitForSelector(selector);
    }
}