const { By } = require("selenium-webdriver");

class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.id("first-name");
        this.lastNameField = By.id("last-name");
        this.zipCodeField = By.id("postal-code");
        this.continueButton = By.id("continue");
        this.finishButton = By.id("finish");
    }

    async fillCheckoutInfo(firstName, lastName, zipCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.zipCodeField).sendKeys(zipCode);
        await this.driver.findElement(this.continueButton).click();
    }

    async completePurchase() {
        await this.driver.findElement(this.finishButton).click();
    }
}

module.exports = CheckoutPage;
