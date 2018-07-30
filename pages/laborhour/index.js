import React from 'react'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'
import Link from 'react-router-dom/Link'

import styles from './index.pcss'

export class LaborhourPage extends React.Component {
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
            LaborHour
            <br/>
            <span className={styles.h1green}>Inflation Resistant</span>
          </h1>
          <p>LaborHour (LH) is a crypto-currency connected to an approximate hour of work in your country, based on official bureau reports, hence when the influence occur, 1 LaborHour will reflect the change, and You will not afraid of loosing money.</p>
          <p>By joining LaborX you become an active contributor to the project and, as we aim, to your better future.</p>
          <p>You will be able to exchange the LH into your local currency any time!</p>
          <Button component={Link} to='/account-password' variant='contained' className={styles.nextButton}>Create an Account</Button>
          <Button component='a' href='/static/assets/whitepaper.pdf' className={styles.newAccountButton}>Download Whitepaper</Button>
          <MobileStepper
            variant="dots"
            steps={5}
            position="static"
            activeStep={4}
            classes={{ root: styles.stepper, dotActive: styles.activeStep, dot: styles.step }}
          />
        </div>
      </div>
    )
  }
}

export default LaborhourPage
