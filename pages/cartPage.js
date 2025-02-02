const { By, until } = require("selenium-webdriver");

class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.cartItems = By.css(".cart_item");
        this.checkoutButton = By.id("checkout");
    }

    async isOnCartPage() {
        return await this.driver.findElement(By.css(".title")).getText();
    }

    async getCartItemsCount() {
        let items = await this.driver.findElements(this.cartItems);
        return items.length;
    }

    async proceedToCheckout() {
        await this.driver.wait(until.elementLocated(this.checkoutButton), 5000); // Sačekaj da dugme bude vidljivo
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;
