import { Builder } from "selenium-webdriver";
import { expect } from "chai";
import LoginPage from "../pages/loginPage.js";

describe("SauceDemo Login Tests", function () {
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

        expect(await loginPage.getUsernameErrorIcon()).to.not.be.null;
        expect(await loginPage.getPasswordErrorIcon()).to.not.be.null;
        expect(await loginPage.getErrorMessage()).to.include("Epic sadface: Username is required");

        await loginPage.clickCloseButton();

        // ✅ Fix: Ensure the error message is still present after closing
        let errorMessageStillVisible = await loginPage.isErrorMessageDisplayed();
        expect(errorMessageStillVisible).to.be.true;
    });

    it("Test 2: Prijava korištenjem pogrešne šifre", async function () {
        await loginPage.login("standard_user", "wrongpassword");

        expect(await loginPage.getUsernameErrorIcon()).to.not.be.null;
        expect(await loginPage.getPasswordErrorIcon()).to.not.be.null;
        expect(await loginPage.getErrorMessage()).to.include("Epic sadface: Username and password do not match");

        await loginPage.clickCloseButton();

        // ✅ Fix: Ensure the error message is still present after closing
        let errorMessageStillVisible = await loginPage.isErrorMessageDisplayed();
        expect(errorMessageStillVisible).to.be.true;
    });
});
