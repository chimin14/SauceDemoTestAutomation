const { By, until } = require("selenium-webdriver");

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.usernameField = By.id("user-name");
        this.passwordField = By.id("password");
        this.loginButton = By.id("login-button");
        this.errorMessage = By.css(".error-message-container");
    }

    async open() {
        await this.driver.get("https://www.saucedemo.com/");
    }

    async login(username, password) {
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    async getErrorMessage() {
        return await this.driver.findElement(this.errorMessage).getText();
    }
}

module.exports = LoginPage;
