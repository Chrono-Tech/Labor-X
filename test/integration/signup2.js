import 'babel-polyfill'
import assert from 'assert'
import { Builder, By } from 'selenium-webdriver'
import until from 'selenium-webdriver/lib/until'

describe('signup', () => {
  before(async function () {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    this.timeout(0);
  })
  it('test', async function () {
    this.timeout(0)
    await this.driver.get('http://localhost:3001')
    await this.driver.wait(until.titleIs('LaborX'))
    await this.driver.wait(until.elementLocated(By.css('[href="/introduction/crypto-education"]')))
    await this.driver.findElement(By.css('[href="/introduction/crypto-education"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/introduction/crypto-education'))
    await this.driver.findElement(By.css('[href="/introduction/our-network"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/introduction/our-network'))
    await this.driver.findElement(By.css('[href="/introduction/your-account"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/introduction/your-account'))
    await this.driver.findElement(By.css('[href="/introduction/crypto-currencies"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/introduction/crypto-currencies'))
    await this.driver.findElement(By.css('[href="/introduction/laborhour"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/introduction/laborhour'))
    await this.driver.findElement(By.css('[href="/auth/signup/account-password"]')).click()
    await this.driver.wait(until.urlIs('http://localhost:3001/auth/signup/account-password'))
    assert.strictEqual(1,1)
  })
  after(async function () {
    await this.driver.quit();
  })
})
