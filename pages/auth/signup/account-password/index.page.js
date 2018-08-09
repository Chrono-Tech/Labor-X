import PageObject from "../../../../test/integration/PageObject";
import { AUTH_SIGNUP_ACCOUNT_PASSWORD } from "../../../../src/constants/url";

export default class AuthSignupAccountPasswordPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ AUTH_SIGNUP_ACCOUNT_PASSWORD }`
    this.isRecruiterFieldLocator = this.by.name('isRecruiter')
    this.isClientFieldLocator = this.by.name('isClient')
    this.isWorkerFieldLocator = this.by.name('isWorker')
    this.nameFieldLocator = this.by.name('name')
    this.passwordFieldLocator = this.by.name('password')
    this.passwordConfirmFieldLocator = this.by.name('password-confirm')
    this.createAccountButtonLocator = this.by.css('button[type="submit"]')
  }
  async open () {
    await this.driver.get(this.url)
    await this.driver.wait(this.until.elementLocated(this.laborhourLinkLocator))
    await this.driver.wait(this.until.elementLocated(this.newAccountLinkLocator))
  }
  checkIsRecruiterField () {
    return this.driver.findElement(this.isRecruiterFieldLocator).click()
  }
  checkIsClientField () {
    return this.driver.findElement(this.isClientFieldLocator).click()
  }
  checkIsWorkerField () {
    return this.driver.findElement(this.isWorkerFieldLocator).click()
  }
  typeIntoNameField (value) {
    return this.driver.findElement(this.nameFieldLocator).sendKeys(value)
  }
  typeIntoPasswordField (value) {
    return this.driver.findElement(this.passwordFieldLocator).sendKeys(value)
  }
  typeIntoPasswordConfirmField (value) {
    return this.driver.findElement(this.passwordConfirmFieldLocator).sendKeys(value)
  }
  createAccountButtonClick () {
    return this.driver.findElement(this.createAccountButtonLocator).click()
  }
}
