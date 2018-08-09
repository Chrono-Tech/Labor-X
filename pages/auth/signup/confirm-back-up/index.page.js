import PageObject from "../../../../test/integration/PageObject";
import { AUTH_SIGNUP_CONFIRM_BACK_UP } from "../../../../src/constants/url";

export default class AuthSignupConfirmBackUpPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ AUTH_SIGNUP_CONFIRM_BACK_UP }`
    this.wordButtonLocatorFactory = (word) => this.by.xpath(`//button[contains(text(), '${ word }')]`)
    this.proceedButtonLocator = this.by.css('button[type="submit"]')
  }
  async confirmMnemonic (mnemonic) {
    const words = mnemonic.split(' ')
    for (const word of words) {
      const wordButton = await this.driver.findElement(this.wordButtonLocatorFactory(word))
      await wordButton.click()
    }
  }
  proceedButtonClick () {
    return this.driver.findElement(this.proceedButtonLocator).click()
  }
}
