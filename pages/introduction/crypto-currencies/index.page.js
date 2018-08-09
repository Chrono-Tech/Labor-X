import PageObject from "../../../test/integration/PageObject";
import { AUTH_SIGNUP_ACCOUNT_PASSWORD, INTRODUCTION_LABORHOUR, INTRODUCTION_CRYPTO_CURRENCIES } from "../../../src/constants/url";

export default class IntroductionCryptoCurrenciesPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INTRODUCTION_CRYPTO_CURRENCIES }`
    this.laborhourLinkLocator = this.by.css(`[href="${ INTRODUCTION_LABORHOUR }"]`)
    this.newAccountLinkLocator = this.by.css(`[href="${ AUTH_SIGNUP_ACCOUNT_PASSWORD }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.laborhourLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
  }
  laborhourLinkClick () {
    return this.driver.findElement(this.laborhourLinkLocator).click()
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
}
