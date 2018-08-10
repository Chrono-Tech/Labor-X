import React  from 'react'
import PropTypes from "prop-types"
import connect from "react-redux/lib/connect/connect"
import Redirect from 'react-router-dom/Redirect'

import WelcomeContent from "src/content/lib/auth/signup/WelcomeContent/WelcomeContent"
import {
  isConfirmBackUpFormExistsSelector,
  isConfirmBackUpFormValidSelector
} from "src/store/auth/signup/selectors"

export class WelcomePage extends React.Component {

  static propTypes = {
    isConfirmBackUpFormExists: PropTypes.bool.isRequired,
    isConfirmBackUpFormValid: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isConfirmBackUpFormExists && this.props.isConfirmBackUpFormValid
      ? <WelcomeContent />
      : <Redirect to='/auth/signup/confirm-back-up' />
  }

}

const mapStateToProps = (state) => ({
  isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state),
  isConfirmBackUpFormValid: isConfirmBackUpFormValidSelector(state),
})

WelcomePage = connect(mapStateToProps)(WelcomePage)

export default WelcomePage
