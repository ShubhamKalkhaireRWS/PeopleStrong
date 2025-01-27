const puppeteer = require('puppeteer');
const fs = require('fs');

// Sleep function to pause for a specified time
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto('https://kp.peoplestrong.com/altIDPLogin.jsf', { waitUntil: 'domcontentloaded' });

    const desiredUrl = 'https://fam.kp.org/idp/0VACVi3jSu/resumeSAML20/idp/SSO.ping'; // Replace with your desired URL
    
    await page.waitForFunction(
        () => /https:\/\/fam\.kp\.org\/idp\/[a-zA-Z0-9]+\/resumeSAML20\/idp\/SSO\.ping/.test(window.location.href),
        { timeout: 60000 } // Adjust timeout as needed
    );
    await sleep(5000)


    // Type the username in the focused text box
    await page.keyboard.type('A901180');

    await sleep(1000)
    // Press TAB to move to the password field
    await page.keyboard.press('Tab');
    await sleep(1000)
    // Type the password in the password text box
    await page.keyboard.type('Shubham@1234');
    await sleep(1000)
    // Press TAB again to move to the sign-in button
    await page.keyboard.press('Tab');

    // Press Enter to submit the form (login)
    await page.keyboard.press('Enter');

    // Optionally wait for a navigation to complete (if necessary)
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });

    console.log('Login attempted');

    await page.waitForFunction(
        () => window.location.href === 'https://kp.peoplestrong.com/oneweb/#/home',
        { timeout: 60000 } // Adjust timeout as needed
    );
    console.log("Logged in successfully");
    
    await sleep(10000)
    await page.mouse.click(678, 261, { button: 'left' });
    await sleep(5000)
    // Close the browser
    await browser.close();
 

})();
