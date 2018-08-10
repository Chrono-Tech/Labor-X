import SeleniumPage from "../../../../test/integration/SeleniumPage";

export default class SeleniumAuthSignupAccountPasswordPage extends SeleniumPage {
  constructor(driver){
    super(driver)
  }
  open() {
    return this.driver.open(`${ process.env.APP_URL }/auth/signup/account-password`)
  }
}