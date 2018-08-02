import React  from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import YourWalletFileContent from "../../../src/content/lib/signup/YourWalletFileContent/YourWalletFileContent";
import {isConfirmBackUpFormExistsSelector} from "../../../src/store/signup/selectors";

export class YourWalletFilePage extends React.Component {

  render () {
    return this.props.isConfirmBackUpFormExists ? <YourWalletFileContent /> : <Redirect to='/account-password'/>
  }

}

const mapStateToProps = (state) => ({
  isConfirmBackUpFormExists: isConfirmBackUpFormExistsSelector(state)
})

YourWalletFilePage = connect(mapStateToProps)(YourWalletFilePage)

export default YourWalletFilePage