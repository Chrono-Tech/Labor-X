import React from 'react'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import Link from 'react-router-dom/Link'

import styles from './index.pcss'
import WhiteRoundedButton from "../../src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";

export class YourAccountPage extends React.Component {
  render () {
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div className={styles.headerInner}>
            <img src="/static/images/labor-x-logo.svg" className={styles.logo} />
          </div>
        </div>
        <div className={styles.content}>
          <h1><span className={styles.h1green}>Your Account</span></h1>
          <h2>To join LaborX network we'll generate an account and 12 words back-up phrase.</h2>
          <p>You can decide whether you'd like to be anonymous or reveal your information to public. Your account will be also your digital wallet to receive funds, as well as contracts and communication history holder. LaborX site is a gate to block-chain network and do not store your account details including your back-up phrase (mnemonic key).</p>
          <p>If you're not new to block-chain and already has your wallet set up, LaborX has a plenty of options for you too, including Ledger Nano and Trezor hardware solutions.</p>
          <WhiteRoundedButton component={Link} to='/crypto-currencies'>​NEXT: Crypto-currencies</WhiteRoundedButton>
          <Button component={Link} to='/account-password' className={styles.newAccountButton}>New Account</Button>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={2}
            classes={{ root: styles.stepper, dotActive: styles.activeStep, dot: styles.step }}
          />
        </div>
      </div>
    )
  }
}

export default YourAccountPage
