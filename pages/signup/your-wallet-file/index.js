import React  from 'react'
import PropTypes from "prop-types"
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import YourWalletFileContent from "src/content/lib/signup/YourWalletFileContent/YourWalletFileContent"
import { isConfirmBackUpFormExistsSelector } from "src/store/signup/selectors"

export class YourWalletFilePage extends React.Component {

  static propTypes = {
    isConfirmBackUpFormExists: PropTypes.bool.isRequired,
  }

  render () {
    return this.props.isConfirmBackUpFormExists ? <YourWalletFileContent /> : <Redirect to='/account-password' />
  }

}

const mapStateToProps = (state) => ({
  isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state),
})

YourWalletFilePage = connect(mapStateToProps)(YourWalletFilePage)

export default YourWalletFilePage
