var fs = require('fs');

const url = 'http://localhost:8080/';

// On charge le webdriver
const webdriver = require('selenium-webdriver');
const {WebElement} = require("selenium-webdriver");
const {By, Key} = require('selenium-webdriver');



describe('OVHshare fonctionne', () => {
    beforeEach(() => { // Avant chaque test...
        require('geckodriver'); // On charge le driver
        browser =  new webdriver.Builder().forBrowser('firefox').build() // On ouvre le navigateur we

    })


    test('logo is displayed',async () => {
        await browser.get(url)
        const logo = await browser.findElement(By.css('.logo'));
        expect(logo).toBeTruthy();
    });

    test('Upload',async () => {
        await browser.get(url)
        const uploadElement = await browser.findElement(By.id('file'))
        await uploadElement.sendKeys("/home/rherbelleau/ovh_share/my-drive/tests/selenium/user_story_test.txt")
        await browser.findElement(By.css('.submit-button')).click()
        const files= await browser.findElements(By.css(".title"))
        var files_name = [];
        for (var i of files) {
            files_name.push(await i.getAttribute("innerText"))
        }
        expect(files_name).toContain("user_story_test.txt")
    })

    test('Delete',async () => {
        await browser.get(url)
        const box= await browser.findElements(By.css(".box"))
        for (var i of box) {
            if (await i.findElement(By.css(".title")).getAttribute("innerText") =="user_story_test.txt") {
                await i.findElement(By.css(".delete")).click()
            }
        }
        const files= await browser.findElements(By.css(".title"))
        var files_name = [];
        for (var i of files) {
            files_name.push(await i.getAttribute("innerText"))
        }
        expect(files_name).not.toContain("user_story_test.txt")
    })

    afterEach(async () => { // Après chaque test...
        await browser.quit() // On ferme le navigateur
    })
});