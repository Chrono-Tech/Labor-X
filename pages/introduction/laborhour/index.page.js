import PageObject from "../../../test/integration/PageObject";
import { AUTH_SIGNUP_ACCOUNT_PASSWORD, INTRODUCTION_LABORHOUR, WHITEPAPER } from "../../../src/constants/url";

export default class IntroductionLaborhourPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INTRODUCTION_LABORHOUR }`
    this.newAccountLinkLocator = this.by.css(`[href="${ AUTH_SIGNUP_ACCOUNT_PASSWORD }"]`)
    this.downloadWhitepaperLinkLocator = this.by.css(`[href="${ WHITEPAPER }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.downloadWhitepaperLinkLocator))
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
  downloadWhitepaperLinkClick () {
    return this.driver.findElement(this.downloadWhitepaperLinkLocator).click()
  }
}
