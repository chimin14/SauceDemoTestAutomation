const { Builder, By, until } = require("selenium-webdriver");
const LoginPage = require("../pages/loginPage");
const ProductsPage = require("../pages/productsPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/checkoutPage");
const { expect } = require("chai");

// Function to highlight elements before clicking
async function highlightElement(driver, element) {
    await driver.executeScript("arguments[0].style.border='3px solid red'", element);
    await driver.sleep(500); 
}

describe("Purchase Flow Tests (Step-by-Step with Fixes)", function () {
    this.timeout(30000);

    let driver;
    let loginPage, productsPage, cartPage, checkoutPage;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        await driver.sleep(500); 

        loginPage = new LoginPage(driver);
        productsPage = new ProductsPage(driver);
        cartPage = new CartPage(driver);
        checkoutPage = new CheckoutPage(driver);
    });

    after(async function () {
        await driver.sleep(3000);
        await driver.quit();
    });

    it("should complete a purchase successfully", async function () {
        console.log("Step 1: Open login page");
        await loginPage.open();
        await driver.sleep(1500);

        console.log("Step 2: Log in with valid credentials");
        let loginButton = await driver.findElement(loginPage.loginButton);
        await highlightElement(driver, loginButton);
        await loginPage.login("standard_user", "secret_sauce");
        await driver.sleep(2000);

        console.log("Step 3: Verify we are on the Products page");
        let pageTitle = await productsPage.isOnProductsPage();
        expect(pageTitle).to.include("Products");
        await driver.sleep(1000);

        console.log("Step 4: Add products to cart");
        let addToCartButtons = await driver.findElements(By.css(".btn_inventory"));
        for (let i = 0; i < 2; i++) {
            await highlightElement(driver, addToCartButtons[i]);
            await addToCartButtons[i].click();
            await driver.sleep(1000);
        }

        console.log("Step 5: Verify correct products are in the cart");
        let cartIcon = await driver.wait(until.elementLocated(By.css(".shopping_cart_link")), 7000);
        await highlightElement(driver, cartIcon);
        await cartIcon.click();
        await driver.sleep(1000);

        console.log("Step 6: Verify product names in the cart");
        let cartItems = await driver.findElements(By.css(".inventory_item_name"));
        expect(cartItems.length).to.equal(2);
        await driver.sleep(1000);

        console.log("Step 7: Proceed to checkout");
        let checkoutButton = await driver.findElement(By.id("checkout"));
        await highlightElement(driver, checkoutButton);
        await checkoutButton.click();
        await driver.sleep(1000);

        console.log("Step 8: Fill in checkout information");
        await checkoutPage.fillCheckoutInfo("Dzido", "Test", "71000");
        await driver.sleep(1000);

        console.log("Step 9: Verify products in Checkout Overview");
        let checkoutItems = await driver.findElements(By.css(".inventory_item_name"));
        expect(checkoutItems.length).to.equal(2);
        await driver.sleep(1000);

        console.log("Step 10: Complete purchase");
        let finishButton = await driver.findElement(By.id("finish"));
        await highlightElement(driver, finishButton);
        await finishButton.click();
        await driver.sleep(1500);

        console.log("Step 11: Verify Checkout Complete page");
        let confirmationMessage = await driver.findElement(By.css(".complete-header")).getText();
        console.log("Checkout message displayed:", confirmationMessage);
        expect(confirmationMessage.toLowerCase()).to.include("thank you for your order!");
        await driver.sleep(1000);


        console.log("Step 12: Logout from menu");
        let menuButton = await driver.findElement(By.id("react-burger-menu-btn"));
        await highlightElement(driver, menuButton);
        await menuButton.click();
        await driver.sleep(1000);

        let logoutButton = await driver.findElement(By.id("logout_sidebar_link"));
        await highlightElement(driver, logoutButton);
        await logoutButton.click();
        await driver.sleep(1000);

        console.log("Step 13: Verify return to Login page");
        let loginPageTitle = await driver.findElement(By.id("login-button"));
        expect(await loginPageTitle.isDisplayed()).to.be.true;
    });
});
