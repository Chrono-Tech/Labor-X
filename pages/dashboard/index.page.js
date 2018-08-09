import PageObject from "../../test/integration/PageObject";
import { DASHBOARD } from "../../src/constants/url";

export default class DashboardPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ DASHBOARD }`
  }
}
