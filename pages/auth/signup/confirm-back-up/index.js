import React  from 'react'
import PropTypes from 'prop-types'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import ConfirmBackUpContent from "src/content/lib/auth/signup/ConfirmBackUpContent/ConfirmBackUpContent"
import {
  isCopyYourAccountPasswordFormExistsSelector,
  isCopyYourAccountPasswordConfirmedSelector,
} from "src/store/auth/signup/selectors"

export class ConfirmBackUpPage extends React.Component {

  static propTypes = {
    isCopyYourAccountPasswordFormExists: PropTypes.bool.isRequired,
    isCopyYourAccountPasswordConfirmed: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isCopyYourAccountPasswordFormExists && this.props.isCopyYourAccountPasswordConfirmed
      ? <ConfirmBackUpContent />
      : <Redirect to='/auth/signup/copy-your-account-password' />
  }

}

const mapStateToProps = (state) => ({
  isCopyYourAccountPasswordFormExists: isCopyYourAccountPasswordFormExistsSelector(state),
  isCopyYourAccountPasswordConfirmed: isCopyYourAccountPasswordConfirmedSelector(state),
})

ConfirmBackUpPage = connect(mapStateToProps)(ConfirmBackUpPage)

export default ConfirmBackUpPage
