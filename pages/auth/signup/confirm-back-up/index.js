import React  from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import ConfirmBackUpContent from "src/content/lib/auth/signup/ConfirmBackUpContent/ConfirmBackUpContent"
import { isCopyYourAccountPasswordFormExistsSelector } from "src/store/auth/signup/selectors"

export class ConfirmBackUpPage extends React.Component {

  static propTypes = {
    isCopyYourAccountPasswordFormExists: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isCopyYourAccountPasswordFormExists ? <ConfirmBackUpContent /> : <Redirect to='/account-password' />
  }

}

const mapStateToProps = (state) => ({
  isCopyYourAccountPasswordFormExists: isCopyYourAccountPasswordFormExistsSelector(state),
})

ConfirmBackUpPage = connect(mapStateToProps)(ConfirmBackUpPage)

export default ConfirmBackUpPage
