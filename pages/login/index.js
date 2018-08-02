import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import { addressSelector } from "src/store/login/selectors";
import LoginContent from "src/content/lib/LoginContent/LoginContent";

export class LoginPage extends React.Component {

  render () {
    return this.props.address ? <LoginContent /> : <Redirect to='/my-accounts' />
  }

}

const mapStateToProps = (state) => ({
  address: addressSelector(state),
})

export default connect(mapStateToProps)(LoginPage)

