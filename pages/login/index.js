import { Link } from 'components/common'
import { LoginLayout, Footer, LoginActions } from 'components/layouts'
import { LoginOptions, LearnMoreBlock, LoginForm } from 'components/Login'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import initialStore from 'store'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import ethereumService from '../../src/services/EthereumService'
import css from './index.scss'

class Login extends React.Component {
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
          <LoginForm
            avatar='/static/images/profile-photo.jpg'
            name='Emile'
            address='1Q1pE5vPGEEMqRcVRMbtBK842Y6Pzo6nK9'
          />
        </LoginActions>
      </div>
    )
  }
}

export default withRedux(initialStore)(Login)
