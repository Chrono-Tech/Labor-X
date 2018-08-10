import PageObject from "../../../test/integration/PageObject";
import { INTRODUCTION_CRYPTO_EDUCATION, INTRODUCTION_OUR_NETWORK, AUTH_SIGNUP_ACCOUNT_PASSWORD } from "../../../src/constants/url";

export default class IntroductionCryptoEducationPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INTRODUCTION_CRYPTO_EDUCATION }`
    this.ourNetworkLinkLocator = this.by.css(`[href="${ INTRODUCTION_OUR_NETWORK }"]`)
    this.newAccountLinkLocator = this.by.css(`[href="${ AUTH_SIGNUP_ACCOUNT_PASSWORD }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.ourNetworkLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
  }
  ourNetworkLinkClick () {
    return this.driver.findElement(this.ourNetworkLinkLocator).click()
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
}
