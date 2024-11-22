const { BasePage } = require('./BasePage');
const { page } = require('@playwright/test')
const basePage = new BasePage(page)

exports.PurchasePage = class PurchasePage {
    constructor(page) {
        this.page = page;
        this.goToMonitors = page.getByRole('link', { name: 'Monitors' });
        this.product = page.getByRole('link', { name: 'Apple monitor' });
        this.addToCart = page.getByRole('link', { name: 'Add to cart' });
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.nameField = page.locator('xpath=//*[@id="name"]');
        this.countryField = page.getByLabel('Country:');
        this.cityField = page.getByLabel('City:');
        this.cardField = page.getByLabel('Credit card:');
        this.monthField =  page.getByLabel('Month:');
        this.yearField = page.getByLabel('Year:');
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
    }
    async chooseProduct() {
        await basePage.click(this.goToMonitors);
        await basePage.click(this.product);
        await basePage.click(this.addToCart)
        // Handle alert
        const alertMessage = await page.waitForEvent('dialog');
        expect(alertMessage.message()).toBe('Product added.');
        await alertMessage.dismiss();
    
    }
    async placeOrder(customerDetails) {
        await basePage.click(this.placeOrderButton);
        await basePage.fill(this.nameField, customerDetails.name);
        await basePage.fill(this.countryField, customerDetails.country);
        await basePage.fill(this.cityField, customerDetails.city);
        await basePage.fill(this.cardField, customerDetails.card);
        await basePage.fill(this.monthField, customerDetails.month);
        await basePage.fill(this.yearField, customerDetails.year);
        await basePage.click(this.purchaseButton);
    }
}
