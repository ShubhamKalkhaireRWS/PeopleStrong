const { Builder, By, Key, until } = require('selenium-webdriver');

// Sleep function to pause for a specified time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    // Initialize the WebDriver
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().window().maximize();

    try {
        // Navigate to the login page
        await driver.get('https://kp.peoplestrong.com/altIDPLogin.jsf');

        // Wait for the desired URL to match
        await driver.wait(until.urlMatches(/https:\/\/fam\.kp\.org\/idp\/[a-zA-Z0-9]+\/resumeSAML20\/idp\/SSO\.ping/), 60000);
        console.log('Navigated to desired URL');

        // Wait for the username field to be present and type the username
        const usernameField = await driver.findElement(By.tagName('input')); // Assuming the first input is for the username
        await usernameField.sendKeys('A901180');

        await sleep(1000);

        // Press TAB and wait for the password field, then type the password
        await usernameField.sendKeys(Key.TAB);
        await sleep(1000);
        const passwordField = await driver.switchTo().activeElement();
        await passwordField.sendKeys('Shubham@1234');

        await sleep(1000);

        // Press TAB again to move to the sign-in button and press ENTER
        await passwordField.sendKeys(Key.TAB);
        await sleep(1000);
        const signInButton = await driver.switchTo().activeElement();
        await signInButton.sendKeys(Key.ENTER);

        // Optionally wait for navigation to complete
        await driver.wait(until.urlIs('https://kp.peoplestrong.com/oneweb/#/home'), 120000);
        console.log('Logged in successfully');

        // Wait for the page to load and perform actions (click on specific coordinates if needed)
        await sleep(10000);
        await driver.actions().move({ x: 1000, y: 188 }).click().perform();
        await sleep(1000);
        await driver.actions().move({ x: 799, y: 188 }).click().perform();
        await sleep(5000);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
