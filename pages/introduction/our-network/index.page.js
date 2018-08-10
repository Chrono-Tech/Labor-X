import PageObject from "../../../test/integration/PageObject";
import { INTRODUCTION_OUR_NETWORK, AUTH_SIGNUP_ACCOUNT_PASSWORD, INTRODUCTION_YOUR_ACCOUNT } from "../../../src/constants/url";

export default class IntroductionOurNetworkPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INTRODUCTION_OUR_NETWORK }`
    this.yourAccountLinkLocator = this.by.css(`[href="${ INTRODUCTION_YOUR_ACCOUNT }"]`)
    this.newAccountLinkLocator = this.by.css(`[href="${ AUTH_SIGNUP_ACCOUNT_PASSWORD }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.yourAccountLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
  }
  yourAccountLinkClick () {
    return this.driver.findElement(this.yourAccountLinkLocator).click()
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
}
