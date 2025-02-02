const { By } = require("selenium-webdriver");

class ProductsPage {
    constructor(driver) {
        this.driver = driver;
        this.productTitle = By.css(".title");
        this.addToCartButtons = By.css(".btn_inventory");
        this.cartIcon = By.css(".shopping_cart_badge");
    }

    async isOnProductsPage() {
        return await this.driver.findElement(this.productTitle).getText();
    }

    async addProductsToCart(numberOfProducts) {
        let buttons = await this.driver.findElements(this.addToCartButtons);
        for (let i = 0; i < numberOfProducts; i++) {
            await buttons[i].click();
        }
    }

    async getCartItemCount() {
        return await this.driver.findElement(this.cartIcon).getText();
    }
}

module.exports = ProductsPage;
