import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import HomeMnemonicLoginContent from "src/content/lib/HomeMnemonicLoginContent/HomeMnemonicLoginContent";
import { currentAddressSelector } from "src/store/wallet/selectors";

export class HomeMnemonicLoginPage extends React.Component {

  render () {
    return this.props.user ? <Redirect to='/dashboard' /> : <HomeMnemonicLoginContent />
  }

}

const mapStateToProps = (state) => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(HomeMnemonicLoginPage)

