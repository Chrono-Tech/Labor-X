import PageObject from "../../../../test/integration/PageObject";
import { AUTH_SIGNUP_COPY_YOUR_ACCOUNT_PASSWORD } from "../../../../src/constants/url";

export default class AuthSignupCopyYourAccountPasswordPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ AUTH_SIGNUP_COPY_YOUR_ACCOUNT_PASSWORD }`
    this.mnemonicLocator = this.by.id('mnemonic')
    this.confirmCheckboxLocator = this.by.name('confirm')
    this.proceedButtonLocator = this.by.css('button[type="submit"]')
  }
  getMnemonic () {
    return this.driver.findElement(this.mnemonicLocator).getText()
  }
  checkConfirmCheckbox () {
    return this.driver.findElement(this.confirmCheckboxLocator).click()
  }
  proceedButtonClick () {
    return this.driver.findElement(this.proceedButtonLocator).click()
  }
}
