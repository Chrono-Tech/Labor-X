import React  from 'react'
import connect from 'react-redux/lib/connect/connect'
import Redirect from 'react-router-dom/Redirect'

import CopyYourAccountPasswordContent from "../../../src/content/lib/signup/CopyYourAccountPasswordContent/CopyYourAccountPasswordContent";
import {isAccountPasswordFormExistsSelector} from "../../../src/store/signup/selectors";

export class CopyYourAccountPasswordPage extends React.Component {

  render () {
    return this.props.isAccountPasswordFormExists ? <CopyYourAccountPasswordContent /> : <Redirect to='/account-password'/>
  }

}

const mapStateToProps = (state) => ({
  isAccountPasswordFormExists: isAccountPasswordFormExistsSelector(state)
})

CopyYourAccountPasswordPage = connect(mapStateToProps)(CopyYourAccountPasswordPage)

export default CopyYourAccountPasswordPage