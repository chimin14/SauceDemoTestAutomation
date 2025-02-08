import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import LoginPage from "../pages/loginPage.js";
import ProductsPage from "../pages/productsPage.js";
import CartPage from "../pages/cartPage.js";
import CheckoutPage from "../pages/checkoutPage.js";

describe("Purchase Flow Tests", function () {
    this.timeout(40000);
    let driver, loginPage, productsPage, cartPage, checkoutPage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("should complete a purchase successfully", async function () {
        await loginPage.login("standard_user", "secret_sauce");
        let pageTitle = await productsPage.isOnProductsPage();
        expect(pageTitle).to.include("Products");

        await productsPage.addProductsToCart(2);
        await productsPage.goToCart();

        let cartItems = await cartPage.getCartItems();
        expect(cartItems.length).to.equal(2);

        await cartPage.proceedToCheckout();
        await checkoutPage.fillCheckoutInfo("Dzido", "Test", "71000");

        let checkoutItems = await checkoutPage.getCheckoutItems();
        expect(checkoutItems.length).to.equal(2);

        await checkoutPage.completePurchase();
        let confirmationMessage = await checkoutPage.getConfirmationMessage();
        expect(confirmationMessage.toLowerCase()).to.include("thank you for your order!");

        console.log("Step 12: Logout from menu");
        await loginPage.logout();

        console.log("Step 13: Verify return to Login page");
        expect(await loginPage.isLoginPageDisplayed()).to.be.true;
    });
});
