import { Link } from 'components/common'
import { LoginLayout, Footer } from 'components/layouts'
import { LoginOptions } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class Index extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  componentWillMount () {
    ethereumService.start()
  }

  render () {
    return (
      <div className={css.root}>
        <div className={css.contentWrapper}>
          <Link href='/' className={css.logo}>
            <img src='/static/images/laborx-login-head.jpg' alt='' />
          </Link>
          <div className={css.loginWrapper}>
            <LoginOptions />
          </div>
          <img src='/static/images/laborx-login-hour.jpg' className={css.backgroundImage} alt=''/>
          <div className={css.forNewUsersBlock}>
            <div className={css.gradientBlock}/>
            <div className={css.forNewUsersContent}>
              <h1>New to LaborX?</h1>
              <p className={css.text}>Learn more about our innovative solution for Recruiters, Workers and Clients</p>
              <Link className={css.learnMoreLink} href='/landing-page#learn-more'>
                Learn More
              </Link>
              <p className={css.createAccountBlock}>
                or <Link className={css.createAccountLink} href='/'>Create New Account</Link>
              </p>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default withRedux(initialStore)(Index)
