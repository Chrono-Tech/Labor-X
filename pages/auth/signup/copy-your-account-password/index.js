import React  from 'react'
import PropTypes from "prop-types"
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import CopyYourAccountPasswordContent from "src/content/lib/auth/signup/CopyYourAccountPasswordContent/CopyYourAccountPasswordContent"
import { isAccountPasswordFormExistsSelector } from "src/store/auth/signup/selectors"

export class CopyYourAccountPasswordPage extends React.Component {

  static propTypes = {
    isAccountPasswordFormExists: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isAccountPasswordFormExists ? <CopyYourAccountPasswordContent /> : <Redirect to='/account-password' />
  }

}

const mapStateToProps = (state) => ({
  isAccountPasswordFormExists: isAccountPasswordFormExistsSelector(state),
})

CopyYourAccountPasswordPage = connect(mapStateToProps)(CopyYourAccountPasswordPage)

export default CopyYourAccountPasswordPage
