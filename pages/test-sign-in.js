import React from 'react'
import { connect } from 'react-redux'
import { Button, Link } from 'src/components/common'
import { LoginLayout } from 'src/components/layouts'
import { signOut } from 'src/store'

function mapStateToProps (state) {
  return state.login
}

function mapDispatchToProps (dispatch) {
  return {
    signOut: () => dispatch(signOut()),
  }
}

class TestSignInPage extends React.Component {
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

export default connect(mapStateToProps, mapDispatchToProps)(TestSignInPage)
