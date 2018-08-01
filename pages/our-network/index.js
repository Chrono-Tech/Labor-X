import React from 'react'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import Link from 'react-router-dom/Link'

import styles from './index.pcss'
import WhiteRoundedButton from "../../src/components/common/buttons/WhiteRoundedButton/WhiteRoundedButton";

export class OurNetworkPage extends React.Component {
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
            Our Network
            <br/>
            <span className={styles.h1green}>is Your Network</span>
          </h1>
          <h2>LaborX network is not controlled by a small group of people, but controlled by all the participants, including You!</h2>
          <p>This network is transparent for all participants, uses chronological data storing and verifies any change by all the network participants, by having a synchronized copy of database. De-centralized in nature, this technology called block-chain.</p>
          <WhiteRoundedButton component={Link} to='/your-account'>​NEXT: Your Account</WhiteRoundedButton>
          <Button component={Link} to='/account-password' className={styles.newAccountButton}>New Account</Button>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={1}
            classes={{ root: styles.stepper, dotActive: styles.activeStep, dot: styles.step }}
          />
        </div>
      </div>
    )
  }
}

export default OurNetworkPage
