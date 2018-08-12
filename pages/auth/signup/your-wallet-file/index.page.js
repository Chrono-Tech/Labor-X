import PageObject from "../../../../test/integration/PageObject";
import { AUTH_SIGNUP_YOUR_WALLET_FILE } from "../../../../src/constants/url";

export default class AuthSignupYourWalletFilePageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ AUTH_SIGNUP_YOUR_WALLET_FILE }`
    this.downloadWalletFileButtonLocator = this.by.xpath(`//button[contains(text(), 'Download Wallet File')]`)
    this.finishButtonLocator = this.by.xpath(`//button[contains(text(), 'FINISH')]`)
  }
  downloadWalletFileButtonClick () {
    return this.driver.findElement(this.downloadWalletFileButtonLocator).click()
  }
  finishButtonClick () {
    return this.driver.findElement(this.finishButtonLocator).click()
  }
}
