import { By, until } from "selenium-webdriver";

export default class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css(".title");
        this.cartIcon = By.css(".shopping_cart_link");
        this.addToCartButtons = By.css(".btn_inventory");
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

   
    async goToCart() {
        let cartButton = await this.driver.wait(until.elementLocated(this.cartIcon), 5000);
        await cartButton.click();
        await this.driver.wait(until.urlContains("cart.html"), 5000);
    }
}
