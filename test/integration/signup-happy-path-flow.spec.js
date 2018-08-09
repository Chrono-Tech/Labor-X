import 'babel-polyfill'
import faker from 'faker'
import fs from 'fs'
import path from 'path'
import { Builder, until } from 'selenium-webdriver'
import { Options as ChromeOptions } from 'selenium-webdriver/chrome'

import IndexPageObject from '../../pages/landing-page/index.page'
import IntroductionCryptoEducationPageObject from '../../pages/introduction/crypto-education/index.page'
import IntroductionOurNetworkPageObject from '../../pages/introduction/our-network/index.page'
import IntroductionYourAccountPageObject from '../../pages/introduction/your-account/index.page'
import IntroductionCryptoCurrenciesPageObject from '../../pages/introduction/crypto-currencies/index.page'
import IntroductionLaborhourPageObject from '../../pages/introduction/laborhour/index.page'
import AuthSignupAccountPasswordPageObject from '../../pages/auth/signup/account-password/index.page'
import AuthSignupCopyYourAccountPasswordPageObject from '../../pages/auth/signup/copy-your-account-password/index.page'
import AuthSignupConfirmBackUpPageObject from '../../pages/auth/signup/confirm-back-up/index.page'
import AuthSignupYourWalletFilePageObject from '../../pages/auth/signup/your-wallet-file/index.page'
import AuthSignupWelcomePageObject from '../../pages/auth/signup/welcome/index.page'
import DashboardPageObject from '../../pages/dashboard/index.page'

before(async function () {
  const chromeOptions = new ChromeOptions()
  chromeOptions.setUserPreferences({ "download.default_directory": __dirname })
  this.driver = await new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).usingServer('http://localhost:4444/wd/hub').build()
  this.indexPageObject = new IndexPageObject(this.driver)
  this.introductionCryptoEducationPageObject = new IntroductionCryptoEducationPageObject(this.driver)
  this.introductionOurNetworkPageObject = new IntroductionOurNetworkPageObject(this.driver)
  this.introductionYourAccountPageObject = new IntroductionYourAccountPageObject(this.driver)
  this.introductionCryptoCurrenciesPageObject = new IntroductionCryptoCurrenciesPageObject(this.driver)
  this.introductionLaborhourPageObject = new IntroductionLaborhourPageObject(this.driver)
  this.authSignupAccountPasswordPageObject = new AuthSignupAccountPasswordPageObject(this.driver)
  this.authSignupCopyYourAccountPasswordPageObject = new AuthSignupCopyYourAccountPasswordPageObject(this.driver)
  this.authSignupConfirmBackUpPageObject = new AuthSignupConfirmBackUpPageObject(this.driver)
  this.authSignupYourWalletFilePageObject = new AuthSignupYourWalletFilePageObject(this.driver)
  this.authSignupWelcomePageObject = new AuthSignupWelcomePageObject(this.driver)
  this.dashboardPageObject = new DashboardPageObject(this.driver)
})

it('signup happy path flow', async function () {
  this.timeout(0)
  await this.indexPageObject.open()
  await this.indexPageObject.newAccountLinkClick()
  await this.introductionCryptoEducationPageObject.ourNetworkLinkClick()
  await this.introductionOurNetworkPageObject.yourAccountLinkClick()
  await this.introductionYourAccountPageObject.cryptoCurrenciesLinkClick()
  await this.introductionCryptoCurrenciesPageObject.laborhourLinkClick()
  await this.introductionLaborhourPageObject.newAccountLinkClick()
  await this.authSignupAccountPasswordPageObject.checkIsRecruiterField()
  await this.authSignupAccountPasswordPageObject.checkIsClientField()
  await this.authSignupAccountPasswordPageObject.checkIsWorkerField()
  const name = faker.internet.userName()
  const password = faker.internet.password()
  await this.authSignupAccountPasswordPageObject.typeIntoNameField(name)
  await this.authSignupAccountPasswordPageObject.typeIntoPasswordField(password)
  await this.authSignupAccountPasswordPageObject.typeIntoPasswordConfirmField(password)
  await this.authSignupAccountPasswordPageObject.createAccountButtonClick()
  const mnemonic = await this.authSignupCopyYourAccountPasswordPageObject.getMnemonic()
  await this.authSignupCopyYourAccountPasswordPageObject.checkConfirmCheckbox()
  await this.authSignupCopyYourAccountPasswordPageObject.proceedButtonClick()
  await this.authSignupConfirmBackUpPageObject.confirmMnemonic(mnemonic)
  await this.authSignupConfirmBackUpPageObject.proceedButtonClick()
  const walletFilePath = path.join(__dirname, 'Wallet.wlt')
  fs.existsSync(walletFilePath) && fs.unlinkSync(walletFilePath)
  await this.authSignupYourWalletFilePageObject.downloadWalletFileButtonClick()
  await this.driver.sleep(5000)
  const walletFile = fs.readFileSync(walletFilePath, 'utf8')
  const encryptedWallet = JSON.parse(walletFile) // todo check file format + matching to mnemonic
  await this.authSignupYourWalletFilePageObject.finishButtonClick()
  await this.authSignupWelcomePageObject.doneButtonClick()
  await this.driver.wait(until.urlIs(this.dashboardPageObject.url))
  await this.dashboardPageObject.isRecruiterMenuVisible()
  await this.dashboardPageObject.isClientMenuVisible()
  await this.dashboardPageObject.isWorkerMenuVisible()
})

after(async function () {
  await this.driver.quit();
})
