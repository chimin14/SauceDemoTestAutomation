import { By, until } from "selenium-webdriver";

export default class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css(".title");
        this.cartIcon = By.css(".shopping_cart_link");
    }

    async isOnProductsPage() {
        await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
        return await this.driver.findElement(this.pageTitle).getText();
    }

    async addProductsToCart(count) {
        let addToCartButtons = await this.driver.findElements(By.css(".btn_inventory"));
        for (let i = 0; i < count; i++) {
            await addToCartButtons[i].click();
        }
    }

    async goToCart() {
        await this.driver.findElement(this.cartIcon).click();
        await this.driver.wait(until.urlContains("cart.html"), 5000);
    }
}
