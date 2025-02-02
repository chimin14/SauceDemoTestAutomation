const { Builder, By, until } = require("selenium-webdriver");
const chai = require("chai");
const expect = chai.expect;
const LoginPage = require("../pages/loginPage");

describe("SauceDemo Login Tests (Professional Version)", function () {
    this.timeout(60000);

    let driver;
    let loginPage;

    before(async function () {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize();
        loginPage = new LoginPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    beforeEach(async function () {
        await loginPage.open();
        await driver.sleep(3000);
    });

    async function highlightElement(driver, element) {
        await driver.executeScript("arguments[0].style.border='3px solid red'", element);
        await driver.sleep(2000);
    }

    async function clickCloseButton(driver) {
        const closeButton = await driver.wait(
            until.elementLocated(By.css(".error-button")),
            5000
        );
        await driver.wait(until.elementIsVisible(closeButton), 5000);
        await driver.wait(until.elementIsEnabled(closeButton), 5000);
        await highlightElement(driver, closeButton);
        await closeButton.click();
        await driver.sleep(2000);
    }

    async function isErrorMessageEmpty(driver) {
        const errorMessageContainer = await driver.findElement(By.css(".error-message-container"));
        const innerText = await driver.executeScript("return arguments[0].innerText;", errorMessageContainer);
        return innerText.trim() === "";
    }

    it("Test 1: Prijava bez unosa kredencijala", async function () {
        await loginPage.login("", "");
        await driver.sleep(3000);

        const usernameErrorIcon = await driver.findElements(By.css("#user-name + .error_icon"));
        expect(usernameErrorIcon.length).to.be.greaterThan(0);
        await highlightElement(driver, usernameErrorIcon[0]);

        const passwordErrorIcon = await driver.findElements(By.css("#password + .error_icon"));
        expect(passwordErrorIcon.length).to.be.greaterThan(0);
        await highlightElement(driver, passwordErrorIcon[0]);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include("Epic sadface: Username is required");

        await clickCloseButton(driver);

        const errorMessageGone = await isErrorMessageEmpty(driver);
        expect(errorMessageGone).to.be.true;
    });

    it("Test 2: Prijava korištenjem pogrešne šifre", async function () {
        await loginPage.login("standard_user", "pogresnaSifra");
        await driver.sleep(3000);

        const usernameErrorIcon = await driver.findElements(By.css("#user-name + .error_icon"));
        expect(usernameErrorIcon.length).to.be.greaterThan(0);
        await highlightElement(driver, usernameErrorIcon[0]);

        const passwordErrorIcon = await driver.findElements(By.css("#password + .error_icon"));
        expect(passwordErrorIcon.length).to.be.greaterThan(0);
        await highlightElement(driver, passwordErrorIcon[0]);

        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).to.include("Epic sadface: Username and password do not match any user in this service");

        await clickCloseButton(driver);

        const errorMessageGone = await isErrorMessageEmpty(driver);
        expect(errorMessageGone).to.be.true;
    });
});
