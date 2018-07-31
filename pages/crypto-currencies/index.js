import React from 'react'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import Link from 'react-router-dom/Link'

import styles from './index.pcss'
import WhiteRoundButton from "../../src/components/common/buttons/WhiteRoundButton/WhiteRoundButton";

export class CryptoCurrenciesPage extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <img src="/static/images/labor-x-logo.svg" className={styles.logo} />
          </div>
        </div>
        <div className={styles.content}>
          <h1>
            Crypto-currency
            <br/>
            <span className={styles.h1green}>is a problem solver</span>
          </h1>
          <p>Bitcoin made online payments secure and removed intermediates, e.g. banks, by making the transaction cheaper, faster and de-centralized.</p>
          <p>Ethereum made digital contracts automated and trustworthy by all sides.</p>
          <p>LaborX is using all these technologies and introducing LaborHour a crypto-currency to solve the problem of inflation which, we believe, will make Workers, Clients and Recruiters to experience a better future.</p>
          <WhiteRoundButton component={Link} to='/laborhour'>​NEXT: LaborHour</WhiteRoundButton>
          <Button component={Link} to='/account-password' className={styles.newAccountButton}>New Account</Button>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={3}
            classes={{ root: styles.stepper, dotActive: styles.activeStep, dot: styles.step }}
          />
        </div>
      </div>
    )
  }
}

export default CryptoCurrenciesPage
