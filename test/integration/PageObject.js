import { By } from 'selenium-webdriver/lib/by'
import until from 'selenium-webdriver/lib/until'

export default class PageObject {
  constructor(driver) {
    this.driver = driver
    this.by = By
    this.until = until
    this.appUrl = process.env.APP_URL
  }
}