import PageObject from "../../../test/integration/PageObject";
import { INTRODUCTION_CRYPTO_CURRENCIES, INTRODUCTION_YOUR_ACCOUNT, AUTH_SIGNUP_ACCOUNT_PASSWORD } from "../../../src/constants/url";

export default class IntroductionYourAccountPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INTRODUCTION_YOUR_ACCOUNT }`
    this.cryptoCurrenciesLinkLocator = this.by.css(`[href="${ INTRODUCTION_CRYPTO_CURRENCIES }"]`)
    this.newAccountLinkLocator = this.by.css(`[href="${ AUTH_SIGNUP_ACCOUNT_PASSWORD }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.cryptoCurrenciesLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
  }
  cryptoCurrenciesLinkClick () {
    return this.driver.findElement(this.cryptoCurrenciesLinkLocator).click()
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
}
