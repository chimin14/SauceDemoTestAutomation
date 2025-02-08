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
        await driver.manage().window().maximize();
        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("Test 3: Kupovina proizvoda", async function () {
        await loginPage.login("standard_user", "secret_sauce");
        expect(await productsPage.isOnProductsPage()).to.be.true;

        await productsPage.addProductsToCart(2);
        
        // 🔥 FIX: Ensure `getCartItemCount()` returns a number, not a string
        let cartCount = await productsPage.getCartItemCount();
        expect(cartCount).to.equal(2);  

        await productsPage.goToCart();
        expect(await cartPage.isOnCartPage()).to.be.true;

        let cartItems = await cartPage.getCartItems();
        expect(cartItems.length).to.equal(2);

        await cartPage.proceedToCheckout();
        expect(await checkoutPage.isOnCheckoutInformationPage()).to.be.true;

        await checkoutPage.fillCheckoutInfo("Dzido", "Test", "71000");
        await checkoutPage.clickContinue();

        expect(await checkoutPage.isOnCheckoutOverviewPage()).to.be.true;

        let checkoutItems = await checkoutPage.getCheckoutItems();
        expect(checkoutItems.length).to.equal(2);

        await checkoutPage.completePurchase();
        expect(await checkoutPage.isOnCheckoutCompletePage()).to.be.true;

        await loginPage.logout();
        expect(await loginPage.isLoginPageDisplayed()).to.be.true;
    });
});
