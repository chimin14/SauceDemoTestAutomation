import { By, until } from "selenium-webdriver";

export default class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.firstNameField = By.id("first-name");
        this.lastNameField = By.id("last-name");
        this.postalCodeField = By.id("postal-code");
        this.continueButton = By.id("continue");
        this.finishButton = By.id("finish");
        this.confirmationMessage = By.css(".complete-header");
        this.checkoutItems = By.css(".inventory_item_name");
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
        await this.driver.findElement(this.continueButton).click();
        await this.driver.wait(until.urlContains("checkout-step-two.html"), 5000);
    }

    async getCheckoutItems() {
        await this.driver.wait(until.elementsLocated(this.checkoutItems), 5000);
        return await this.driver.findElements(this.checkoutItems);
    }

    async completePurchase() {
        let finishButton = await this.driver.wait(until.elementLocated(this.finishButton), 5000);
        await finishButton.click();
        await this.driver.wait(until.elementLocated(this.confirmationMessage), 5000);
    }

    async getConfirmationMessage() {
        return await this.driver.findElement(this.confirmationMessage).getText();
    }
}
