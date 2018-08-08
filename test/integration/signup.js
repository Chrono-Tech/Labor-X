const { Builder, By, Key, until } = require('selenium-webdriver');

const main = async () => {
  try {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .usingServer('http://localhost:4444/wd/hub')
      .build();
    await this.driver.get('http://www.google.com/ncr');
    await this.driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await this.driver.wait(until.titleIs('webdriver - Google Search'), 1000);
  } catch (err) {
    console.error(err)
  } finally {
    await this.driver.quit();
  }
}

main()