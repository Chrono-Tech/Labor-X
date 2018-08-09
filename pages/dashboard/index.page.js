import PageObject from "../../test/integration/PageObject";
import { DASHBOARD } from "../../src/constants/url";

export default class DashboardPageObject extends PageObject {
  constructor(driver){
    super(driver)
    this.url = `${ this.appUrl }${ DASHBOARD }`
    this.recruiterMenuLocator = this.by.id('recruiter-menu')
    this.clientMenuLocator = this.by.id('client-menu')
    this.workerMenuLocator = this.by.id('worker-menu')
  }
  isRecruiterMenuVisible () {
    return this.driver.findElement(this.recruiterMenuLocator)
  }
  isClientMenuVisible () {
    return this.driver.findElement(this.clientMenuLocator)
  }
  isWorkerMenuVisible () {
    return this.driver.findElement(this.workerMenuLocator)
  }
}

