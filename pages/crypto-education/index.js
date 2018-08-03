import React from 'react'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import Link from 'react-router-dom/Link'

import styles from './index.pcss'
import WhiteRoundedButton from "../../src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";

export class CryptoEducationPage extends React.Component {
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
            Thank you
            <br/>
            <span className={styles.h1green}>for your interest</span>
            <br/>in LaborX!
          </h1>
          <h2>We're excited to have you on board of the great platform for Workers, Clients and Recruiters.</h2>
          <p>Our platform is using an innovative technology, allowing us to make sure all our users can benefit from the most secure way of making contracts and payments in a short-term employment sector.</p>
          <p>We understand that you might never heard of the technology, and prepared this presentation for You.</p>
          <WhiteRoundedButton component={Link} to='/our-network'>​NEXT: Our Network is Yours</WhiteRoundedButton>
          <Button component={Link} to='/account-password' className={styles.newAccountButton}>New Account</Button>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={0}
            classes={{ root: styles.stepper, dotActive: styles.activeStep, dot: styles.step }}
          />
        </div>
      </div>
    )
  }
}

export default CryptoEducationPage
