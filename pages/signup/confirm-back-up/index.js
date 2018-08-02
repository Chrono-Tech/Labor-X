import React  from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import ConfirmBackUpContent from "src/content/lib/signup/ConfirmBackUpContent/ConfirmBackUpContent"
import { isCopyYourAccountPasswordFormExistsSelector } from "src/store/signup/selectors"

export class ConfirmBackUpPage extends React.Component {

  render () {
    return this.props.isCopyYourAccountPasswordFormExists ? <ConfirmBackUpContent /> : <Redirect to='/account-password' />
  }

}

const mapStateToProps = (state) => ({
  isCopyYourAccountPasswordFormExists: isCopyYourAccountPasswordFormExistsSelector(state)
})

ConfirmBackUpPage = connect(mapStateToProps)(ConfirmBackUpPage)

export default ConfirmBackUpPage
