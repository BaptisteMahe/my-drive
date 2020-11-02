var fs = require('fs');

const url = 'https://francoisbrucker.github.io/cours_informatique/3A/dfs_methode_de_developpement.html';

// On charge le webdriver
const webdriver = require('selenium-webdriver');
const {By, Key} = require('selenium-webdriver');

describe('Le site fonctionne', () => {
    beforeEach(() => { // Avant chaque test...
        require('geckodriver'); // On charge le driver
        browser =  new webdriver.Builder().forBrowser('firefox').build() // On ouvre le navigateur web
    })

//    test('titre', async () => {
//        await browser.get(url)
//        const title = await browser.getTitle()
//        expect(title).toBe("Ovh Share")
//    });

    test('second test', async () => {
        await browser.get(url)
        await browser.findElement(By.linkText("Tests Unitaires")).click()
        const title = await browser.getTitle()
        expect(title).toBe("Tests Unitaires")
    });

    afterEach(async () => { // Après chaque test...
        await browser.quit() // On ferme le navigateur
    })
});