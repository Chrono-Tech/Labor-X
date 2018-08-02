import React  from 'react'
import PropTypes from "prop-types"
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import WelcomeContent from "src/content/lib/signup/WelcomeContent/WelcomeContent"
import { isConfirmBackUpFormExistsSelector } from "src/store/signup/selectors"

export class WelcomePage extends React.Component {

  static propTypes = {
    isConfirmBackUpFormExists: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isConfirmBackUpFormExists ? <WelcomeContent /> : <Redirect to='/account-password' />
  }

}

const mapStateToProps = (state) => ({
  isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state),
})

WelcomePage = connect(mapStateToProps)(WelcomePage)

export default WelcomePage
