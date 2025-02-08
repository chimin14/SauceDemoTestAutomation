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
    }

 
    async open() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.usernameField), 5000);
    }

  
    async login(username, password) {
        await this.driver.findElement(this.usernameField).clear();
        await this.driver.findElement(this.usernameField).sendKeys(username);
        await this.driver.findElement(this.passwordField).clear();
        await this.driver.findElement(this.passwordField).sendKeys(password);
        await this.driver.findElement(this.loginButton).click();
    }

    
    async getErrorMessage() {
        await this.driver.wait(until.elementLocated(this.errorMessage), 5000);
        return await this.driver.findElement(this.errorMessage).getText();
    }

  
    async getUsernameErrorIcon() {
        try {
            await this.driver.wait(until.elementLocated(this.errorIconUsername), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }


    async getPasswordErrorIcon() {
        try {
            await this.driver.wait(until.elementLocated(this.errorIconPassword), 5000);
            return true;
        } catch (error) {
            return false;
        }
    }

 
    async clickCloseButton() {
        try {
            let closeButton = await this.driver.findElement(this.closeButton);
            await closeButton.click();
            await this.driver.wait(until.stalenessOf(closeButton), 5000);
        } catch (error) {
            console.log("No error message to close.");
        }
    }

   
    async logout() {
        let menuButton = await this.driver.wait(until.elementLocated(this.menuButton), 5000);
        await menuButton.click();

        let logoutButton = await this.driver.wait(until.elementLocated(this.logoutButton), 5000);
        await this.driver.wait(until.elementIsVisible(logoutButton), 5000);
        await logoutButton.click();

        await this.driver.wait(until.elementLocated(this.loginButton), 5000);
    }

    
    async isLoginPageDisplayed() {
        try {
            return await this.driver.findElement(this.loginButton).isDisplayed();
        } catch (error) {
            return false;
        }
    }
}
