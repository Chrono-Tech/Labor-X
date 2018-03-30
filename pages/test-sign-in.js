import { Button, Link } from 'components/common'
import { LoginLayout } from 'components/layouts'
import withRedux from 'next-redux-wrapper'
import React from 'react'
import { bootstrap } from 'store/bootstrap'
import 'styles/globals/globals.scss'
import initialStore from '../src/store'
import { signOut } from '../src/store/login/actions'

function mapStateToProps (state) {
  return state.login
}

function mapDispatchToProps (dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

class TestSignIn extends React.Component {
  static getInitialProps ({ store }) {
    store.dispatch(bootstrap())
  }

  handleSingOut = () => this.props.signOut()

  render () {
    return (
      <LoginLayout>
        <div>
          <div>isSigned: {`${this.props.isSignIn}`}</div>
          <div>isHD: {`${this.props.signIn.isHD}`}</div>
          <div>isHardware: {`${this.props.signIn.isHardware}`}</div>
          <div>address: {this.props.signIn.address}</div>

          {this.props.isSignIn
            ? <Button label='Sign Out' onClick={this.handleSingOut} />
            : <Link href='/login-options'>Go to Login Options</Link>
          }
        </div>
      </LoginLayout>
    )
  }
}

export default withRedux(initialStore, mapStateToProps, mapDispatchToProps)(TestSignIn)
