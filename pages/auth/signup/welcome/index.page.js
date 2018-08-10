import PageObject from "../../../../test/integration/PageObject";
import { AUTH_SIGNUP_WELCOME } from "../../../../src/constants/url";

export default class AuthSignupWelcomePageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ AUTH_SIGNUP_WELCOME }`
    this.doneButtonLocator = this.by.css(`button`)
  }
  doneButtonClick () {
    return this.driver.findElement(this.doneButtonLocator).click()
  }
}
