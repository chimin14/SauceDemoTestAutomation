import { By, until } from "selenium-webdriver";

export default class CartPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css(".title");
        this.checkoutButton = By.id("checkout");
        this.cartItems = By.css(".inventory_item_name");
    }

    async isOnCartPage() {
        try {
            let titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            let titleText = await titleElement.getText();
            return titleText.includes("Your Cart");
        } catch (error) {
            return false;
        }
    }

    async getCartItems() {
        await this.driver.wait(until.elementsLocated(this.cartItems), 5000);
        return await this.driver.findElements(this.cartItems);
    }

    async proceedToCheckout() {
        let checkoutButton = await this.driver.wait(until.elementLocated(this.checkoutButton), 5000);
        await checkoutButton.click();
        await this.driver.wait(until.urlContains("checkout-step-one.html"), 5000);
    }
}
