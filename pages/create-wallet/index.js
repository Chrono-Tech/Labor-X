import React from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom/Redirect'

import CreateWalletContent from "src/content/lib/CreateWalletContent/CreateWalletContent";
import { currentAddressSelector } from "src/store/wallet/selectors";

export class CreateWalletPage extends React.Component {

  render () {
    return this.props.user ? <Redirect to='/dashboard' /> : <CreateWalletContent />
  }

}

const mapStateToProps = (state) => ({
  user: currentAddressSelector()(state),
})

export default connect(mapStateToProps)(CreateWalletPage)

