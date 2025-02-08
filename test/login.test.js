import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import LoginPage from "../pages/loginPage.js";

describe("SauceDemo Login Tests (Optimized)", function () {
    this.timeout(60000);
    let driver, loginPage;

    beforeEach(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        loginPage = new LoginPage(driver);
        await loginPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it("Test 1: Prijava bez unosa kredencijala", async function () {
        await loginPage.login("", "");

        let usernameErrorIcon = await loginPage.getUsernameErrorIcon();
        expect(usernameErrorIcon).to.not.be.null;

        let passwordErrorIcon = await loginPage.getPasswordErrorIcon();
        expect(passwordErrorIcon).to.not.be.null;

        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include("Epic sadface: Username is required");

        await loginPage.clickCloseButton();
    });

    it("Test 2: Prijava korištenjem pogrešne šifre", async function () {
        await loginPage.login("standard_user", "wrongpassword");

        let usernameErrorIcon = await loginPage.getUsernameErrorIcon();
        expect(usernameErrorIcon).to.not.be.null;

        let passwordErrorIcon = await loginPage.getPasswordErrorIcon();
        expect(passwordErrorIcon).to.not.be.null;

        let errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include("Epic sadface: Username and password do not match");

        await loginPage.clickCloseButton();
    });
});
