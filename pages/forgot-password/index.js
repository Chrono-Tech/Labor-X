import { Link } from 'components/common'
import { LoginLayout, Footer, LoginActions } from 'components/layouts'
import { LoginOptions, LearnMoreBlock, LoginForm, RecoveryAccountForm } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class ForgotPassword extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }
  
  componentWillMount () {
    ethereumService.start()
  }
  
  render () {
    return (
      <div className={css.root}>
        <LoginActions>
          <RecoveryAccountForm />
        </LoginActions>
      </div>
    )
  }
}

export default withRedux(initialStore)(ForgotPassword)
