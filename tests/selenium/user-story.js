var fs = require('fs');

const url = "url";

// On charge le webdriver
const webdriver = require('selenium-webdriver');
const {By, Key} = require('selenium-webdriver');

describe('Le site fonctionne', () => {
    beforeEach(() => { // Avant chaque test...
        require('geckodriver'); // On charge le driver
        browser =  new webdriver.Builder().forBrowser('firefox').build() // On ouvre le navigateur web
    })

    test('premier test', async () => {
        // Contenu du test
    });

    test('second test', async () => {
        // Contenu du test
    });

    afterEach(async () => { // Après chaque test...
        await browser.quit() // On ferme le navigateur
    })
});