import { By, until } from "selenium-webdriver";

export default class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.url = "https://www.saucedemo.com/";
        this.usernameField = By.id("user-name");
        this.passwordField = By.id("password");
        this.loginButton = By.id("login-button");
        this.errorMessage = By.css(".error-message-container");
        this.errorIconUsername = By.css("#user-name + .error_icon");
        this.errorIconPassword = By.css("#password + .error_icon");
        this.closeButton = By.css(".error-button");
        this.menuButton = By.id("react-burger-menu-btn");
        this.logoutButton = By.id("logout_sidebar_link");
        this.menuPanel = By.css(".bm-menu-wrap");
    }

    async open() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.usernameField), 5000);
    }

    async login(username, password) {
        let usernameInput = await this.driver.findElement(this.usernameField);
        let passwordInput = await this.driver.findElement(this.passwordField);

        await usernameInput.clear();
        await usernameInput.sendKeys(username);
        await passwordInput.clear();
        await passwordInput.sendKeys(password);

        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
        return await this.driver.findElement(this.errorMessage).getText();
    }

    async getUsernameErrorIcon() {
        return await this.isElementVisible(this.errorIconUsername);
    }

    async getPasswordErrorIcon() {
        return await this.isElementVisible(this.errorIconPassword);
    }

    async clickCloseButton() {
        try {
            let closeButton = await this.driver.wait(until.elementLocated(this.closeButton), 5000);
            await closeButton.click();
            await this.driver.wait(until.stalenessOf(closeButton), 5000);
        } catch (error) {
            console.log("No error message to close.");
        }
    }

    async openMenu() {
        let menuButton = await this.driver.wait(until.elementLocated(this.menuButton), 5000);
        await menuButton.click();
        await this.driver.wait(until.elementLocated(this.menuPanel), 5000);
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.menuPanel)), 5000);
    }

    async logout() {
        await this.openMenu();
        let logoutButton = await this.driver.wait(until.elementLocated(this.logoutButton), 5000);
        await this.driver.wait(until.elementIsVisible(logoutButton), 5000);
        await logoutButton.click();
        await this.driver.wait(until.elementLocated(this.loginButton), 5000);
    }

    async isLoginPageDisplayed() {
        return await this.isElementVisible(this.loginButton);
    }

    async isErrorMessageDisplayed() {
        return await this.isElementVisible(this.errorMessage);
    }

    async isElementVisible(locator) {
        try {
            let element = await this.driver.findElement(locator);
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }
}
