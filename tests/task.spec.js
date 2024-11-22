const { test, expect, page } = require('@playwright/test');
const { HomePage } = require('../Pages/HomePage');
const { AuthPage } = require('../Pages/AuthPage');
const { PurchasePage } = require('../Pages/PurchasePage');
const { userData } = require('../Data/userData.json');
const homePage = new HomePage(page);
const authPage = new AuthPage(page);
const purchasePage = new PurchasePage(page);
const url = userData.url

test.describe('User can shop on DemoBlaze', () => {
    test('Scenario 1: The user can register with valid data', async ({ page }) => {

        await homePage.navigateTo(url);
        await homePage.openSignUpModal();

        const { username, password } = userData.credentials;
        await authPage.register(username, password);

        // Expect a successful registration alert
        const alertMessage = await page.waitForEvent('dialog');
        expect(alertMessage.message()).toBe('Sign up successful.');
        await alertMessage.dismiss();
    });

    test('Scenario 2: The user can log in with a valid email and password', async ({ page }) => {

        await homePage.navigateTo(url);
        await homePage.openLoginModal();

        const { username, password } = userData.credentials;
        await authPage.login(username, password);

        // Verify login by checking for the logout button
        await homePage.waitForSelector(homePage.logoutButton);
        const isVisible = await page.isVisible(homePage.logoutButton);
        expect(isVisible).toBeTruthy();
    });

    test('Scenario 3: The user can log out', async ({ page }) => {

        await homePage.navigateTo(url);
        await homePage.openLoginModal();

        const { username, password } = userData.credentials;
        await authPage.login(username, password);
        await homePage.logOut();

        // Verify logging out by checking for the login button
        await homePage.waitForSelector(homePage.loginButton);
        const isVisible = await page.isVisible(homePage.loginButton);
        expect(isVisible).toBeTruthy();
    });

    test('Scenario 4: Successfully create an order for an Apple monitor 24', async ({ page }) => {

        await homePage.navigateTo(url);
        await purchasePage.chooseProduct();
        await homePage.openCart();
        await purchasePage.placeOrder(userData.customerDetails)

        // Verify order success
        const successMessage = await page.locator('.sweet-alert h2').textContent();
        expect(successMessage).toBe('Thank you for your purchase!');
    });
});
