import PageObject from "../../test/integration/PageObject";
import { INDEX, INTRODUCTION_CRYPTO_EDUCATION, AUTH_SIGNIN_MY_ACCOUNTS } from "../../src/constants/url";

export default class IndexPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ INDEX }`
    this.newAccountLinkLocator = this.by.css(`[href="${ INTRODUCTION_CRYPTO_EDUCATION }"]`)
    this.loginLinkLocator = this.by.css(`[href="${ AUTH_SIGNIN_MY_ACCOUNTS }"]`)
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.loginLinkLocator))
  }
  newAccountLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
  loginLinkClick () {
    return this.driver.findElement(this.newAccountLinkLocator).click()
  }
}
