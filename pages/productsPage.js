import { By, until } from "selenium-webdriver";

export default class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css(".title");
        this.cartIcon = By.css(".shopping_cart_link");
        this.cartBadge = By.css(".shopping_cart_badge");
        this.addToCartButtons = By.css(".btn_inventory");
        this.productNames = By.css(".inventory_item_name");
    }

    async isOnProductsPage() {
        try {
            let titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            let titleText = await titleElement.getText();
            return titleText.includes("Products");
        } catch (error) {
            return false;
        }
    }

    async addProductsToCart(count) {
        let addToCartButtons = await this.driver.wait(until.elementsLocated(this.addToCartButtons), 5000);
        if (count > addToCartButtons.length) {
            throw new Error(`Only ${addToCartButtons.length} products available, but ${count} requested.`);
        }
        for (let i = 0; i < count; i++) {
            await addToCartButtons[i].click();
        }
    }

    async getCartItemCount() {
        try {
            let badge = await this.driver.wait(until.elementLocated(this.cartBadge), 5000);
            return parseInt(await badge.getText(), 10);
        } catch (error) {
            return 0; // Return 0 if the badge is not found
        }
    }

    async getProductNames() {
        try {
            await this.driver.wait(until.elementsLocated(this.productNames), 5000);
            let products = await this.driver.findElements(this.productNames);
            return Promise.all(products.map(async (product) => await product.getText()));
        } catch (error) {
            return [];
        }
    }

    async goToCart() {
        let cartButton = await this.driver.wait(until.elementLocated(this.cartIcon), 5000);
        await cartButton.click();
        await this.driver.wait(until.urlContains("cart.html"), 5000);
    }
}
