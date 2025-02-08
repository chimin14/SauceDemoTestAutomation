import { By, until } from "selenium-webdriver";

export default class CheckoutPage {
    constructor(driver) {
        this.driver = driver;
        this.pageTitle = By.css(".title");
        this.firstNameField = By.id("first-name");
        this.lastNameField = By.id("last-name");
        this.postalCodeField = By.id("postal-code");
        this.continueButton = By.id("continue");
        this.finishButton = By.id("finish");
        this.confirmationMessage = By.css(".complete-header");
        this.checkoutItems = By.css(".inventory_item_name");
    }

    async isOnCheckoutInformationPage() {
        try {
            let titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            let titleText = await titleElement.getText();
            return titleText.includes("Checkout: Your Information");
        } catch (error) {
            return false;
        }
    }

    async isOnCheckoutOverviewPage() {
        try {
            let titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            let titleText = await titleElement.getText();
            return titleText.includes("Checkout: Overview");
        } catch (error) {
            return false;
        }
    }

    async isOnCheckoutCompletePage() {
        try {
            let titleElement = await this.driver.wait(until.elementLocated(this.pageTitle), 5000);
            let titleText = await titleElement.getText();
            return titleText.includes("Checkout: Complete!");
        } catch (error) {
            return false;
        }
    }

    async fillCheckoutInfo(firstName, lastName, postalCode) {
        await this.driver.findElement(this.firstNameField).sendKeys(firstName);
        await this.driver.findElement(this.lastNameField).sendKeys(lastName);
        await this.driver.findElement(this.postalCodeField).sendKeys(postalCode);
    }

    async clickContinue() {
        let continueButton = await this.driver.wait(until.elementLocated(this.continueButton), 5000);
        await continueButton.click();
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
